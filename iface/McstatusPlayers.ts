import type { McstatusPlayer } from "./McstatusPlayer"

export interface McstatusPlayers {
    online: number
    max: number
    list: McstatusPlayer[]
}