// stores/plan.ts
import { defineStore } from 'pinia'

interface Plan {
  key: string
  name: string
  tagline: string
  priceCents: number
  popular: boolean
  features: string[]
}

export const usePlanStore = defineStore('plan', {
  state: (): { plan: Plan | null } => ({
    plan: null
  }),
  actions: {
    setPlan(newPlan: Plan) {
      this.plan = newPlan
    }
  }
})