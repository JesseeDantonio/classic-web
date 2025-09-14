import { McstatusResponse } from "~/iface/McstatusResponse";

const config = useRuntimeConfig();
const host = "classicstudiohub.fr"

export default defineEventHandler(async (event) => {
  try {
    const res = await $fetch<McstatusResponse>(`https://api.mcstatus.io/v2/status/java/${host}`)
    return res
  } catch (e) {
    // Toujours retourner un objet JSON !
    return {
      online: false,
      host: '',
      port: 0,
      ip_address: null,
      eula_blocked: false,
      retrieved_at: Date.now(),
      expires_at: Date.now(),
      srv_record: null,
      error: (e as Error).message ?? 'Erreur API'
    }
  }
})