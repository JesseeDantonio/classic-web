// server/api/checkout-session.post.ts
import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const secretKey = config.stripeSecretKey;
  const baseUrl = config.public?.baseUrl;

  if (!secretKey) {
    throw createError({ statusCode: 500, statusMessage: 'Missing STRIPE_SECRET_KEY' });
  }
  if (!baseUrl) {
    throw createError({ statusCode: 500, statusMessage: 'Missing PUBLIC_BASE_URL' });
  }

  const stripe = new Stripe(secretKey);

  const body = await readBody<{
    name?: string;
    months?: number | string;
    pseudo?: string;
    email?: string;
  }>(event);

  // Sécurité: whitelists
  const allowedPlans = ['premium', 'premiumPlus'] as const;
  type PlanKey = (typeof allowedPlans)[number];
  const allowedMonths = [1, 3, 6, 12, 24] as const;
  type Months = (typeof allowedMonths)[number];

  const BASE_PRICES: Record<PlanKey, number> = { premium: 390, premiumPlus: 990 }; // en centimes
  const DISCOUNTS_PCT: Record<Months, number> = { 1: 100, 3: 90, 6: 80, 12: 60, 24: 50 };
  const PSEUDO_RE = /^[A-Za-z0-9_]{3,16}$/;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const planKeyRaw = body?.name as string;
  const monthsRaw = Number(body?.months);
  const pseudoRaw = String(body?.pseudo ?? '').trim();
  const emailRaw = String(body?.email ?? '').trim();

  if (!allowedPlans.includes(planKeyRaw as any)) {
    throw createError({ statusCode: 400, statusMessage: 'Plan invalide' });
  }
  if (!allowedMonths.includes(monthsRaw as any)) {
    throw createError({ statusCode: 400, statusMessage: 'Durée non valide' });
  }
  if (!PSEUDO_RE.test(pseudoRaw)) {
    throw createError({ statusCode: 400, statusMessage: 'Pseudo non valide' });
  }
  if (emailRaw && !EMAIL_RE.test(emailRaw)) {
    throw createError({ statusCode: 400, statusMessage: 'Email non valide' });
  }

  const planKey = planKeyRaw as PlanKey;
  const months = monthsRaw as Months;

  const base = BASE_PRICES[planKey];
  const total = Math.round((base * months * DISCOUNTS_PCT[months]) / 100);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: emailRaw || undefined,
      metadata: { pseudo: pseudoRaw, planKey, months: String(months) },
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `${planKey === 'premiumPlus' ? 'Premium Plus' : 'Premium'} (${months} mois)`,
            },
            unit_amount: total,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
    });

    return { id: session.id };
  } catch (err) {
    console.error('Stripe error creating session', err);
    throw createError({ statusCode: 502, statusMessage: 'Erreur paiement, réessayez plus tard' });
  }
});