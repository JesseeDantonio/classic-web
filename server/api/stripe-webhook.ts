import Stripe from 'stripe';
import { Rcon } from 'rcon-client';
// import { createHash } from 'crypto';

const runtimeConfig = useRuntimeConfig();
const secretKey = runtimeConfig.stripeSecretKey;
const webhookSecret = runtimeConfig.stripeWebhookSecret;

export const stripeApiConfig = {
  api: { bodyParser: false },
};

if (!secretKey) {
  throw new Error('Missing Stripe secret key');
}
if (!webhookSecret) {
  throw new Error('Missing Stripe webhook secret');
}

const stripe = new Stripe(secretKey);

// Stockage idempotence: remplace par une vraie DB/kv
const processed = new Set<string>();

function isSafe(str: string, re = /^[A-Za-z0-9_:-]{1,32}$/) {
  return re.test(str);
}

export default defineEventHandler(async (event) => {
  const sig = getHeader(event, 'stripe-signature');
  const rawBody = await readRawBody(event);

  let stripeEvent: Stripe.Event;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      Buffer.from(rawBody as string),
      sig!,
      webhookSecret!
    );
  } catch (err) {
    console.error('Error verifying Stripe webhook', err);
    setResponseStatus(event, 400);
    return 'Webhook signature verification failed';
  }

  // Idempotence simple (remplacer par DB en prod)
  if (processed.has(stripeEvent.id)) {
    setResponseStatus(event, 200);
    return { received: true, duplicate: true };
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object as Stripe.Checkout.Session;

    if (session.payment_status === 'paid') {
      const pseudo = session.metadata?.pseudo?.trim();
      const planKey = session.metadata?.planKey?.trim();
      const monthsRaw = session.metadata?.months?.trim();

      if (!pseudo || !isSafe(pseudo)) {
        setResponseStatus(event, 400);
        return { error: 'Invalid pseudo' };
      }
      if (!planKey || !isSafe(planKey)) {
        setResponseStatus(event, 400);
        return { error: 'Invalid planKey' };
      }
      if (!monthsRaw || !/^\d{1,3}$/.test(monthsRaw)) {
        setResponseStatus(event, 400);
        return { error: 'Invalid months' };
      }

      const months = parseInt(monthsRaw, 10);
      const duration = `${months}mo`; // LuckPerms: mo = months

      try {
        const rcon = await Rcon.connect({
          host: process.env.RCON_HOST || '127.0.0.1',
          port: Number(process.env.RCON_PORT) || 25575,
          password: process.env.RCON_PASSWORD || '',
          timeout: 8000,
        });

        const cmd = `lp user ${pseudo} parent addtemp ${planKey.toLowerCase()} ${duration}`;
        const response = await rcon.send(cmd);
        await rcon.end();

        processed.add(stripeEvent.id);

        setResponseStatus(event, 200);
        return { ok: true, cmd, response };
      } catch (err) {
        console.error('RCON error', err);
        // Ne marque pas comme processed pour laisser Stripe retenter,
        // mais attention aux doublons -> idéalement mettre une file.
        setResponseStatus(event, 500);
        return { error: (err as Error).message };
      }
    }
  }

  setResponseStatus(event, 200);
  return { received: true };
});