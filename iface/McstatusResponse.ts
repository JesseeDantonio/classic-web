import type { McstatusMod } from "./McstatusMod"
import type { McstatusMotd } from "./McstatusMotd"
import type { McstatusPlayers } from "./McstatusPlayers"
import type { McstatusPlugin } from "./McstatusPlugin"
import type { McstatusSrvRecord } from "./McstatusSrvRecord"
import type { McstatusVersion } from "./McstatusVersion"

// Typage de la réponse attendue
export interface McstatusResponse {
    online: boolean
    host: string
    port: number
    ip_address: string | null
    eula_blocked: boolean
    retrieved_at: number
    expires_at: number
    version?: McstatusVersion
    players?: McstatusPlayers
    motd?: McstatusMotd
    icon?: string | null
    mods?: McstatusMod[]
    software?: string | null
    plugins?: McstatusPlugin[]
    srv_record: McstatusSrvRecord | null
}