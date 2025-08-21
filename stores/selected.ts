import { defineStore } from 'pinia'
import type { Selected } from '~/iface/Selected'


export const useSelectedStore = defineStore('selected', {
  state: (): { selected: Selected | null } => ({
    selected: null
  }),
  actions: {
    setSelected(newSelected: Selected) {
      this.selected = newSelected
    }
  }
})