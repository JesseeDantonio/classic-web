import { Plan } from "~/iface/Plan"
import { Selected } from "~/iface/Selected"

export class PriceCalculator {
  private fmt: Intl.NumberFormat

  constructor(
    private selected: Selected,
    private locale = 'fr-FR',
    private currency = 'EUR'
  ) {
    this.fmt = new Intl.NumberFormat(locale, { style: 'currency', currency })
  }

  clampCents(c: number): number {
    return Math.max(0, Math.round(c))
  }

  formatCents(c: number): string {
    return this.fmt.format((c || 0) / 100)
  }

  total(plan : Plan, selected : Selected): number {
    const months = Number(this.selected.months)
    const discount = Number(this.selected.discount)
    const price = Number(plan.priceCents)
    if (!Number.isFinite(months) || months <= 0) return 0
    if (!Number.isFinite(discount) || discount <= 0) return 0
    if (!Number.isFinite(price) || price < 0) return 0
    return this.clampCents(price * months * discount)
  }

  baseTotal(plan : Plan, selected : Selected): number {
    const months = Number(this.selected.months)
    const price = Number(plan.priceCents)
    if (!Number.isFinite(months) || months <= 0) return 0
    if (!Number.isFinite(price) || price < 0) return 0
    return this.clampCents(price * months)
  }

//   perMonth(): number {
//     const months = Math.max(1, Number(this.selected.months))
//     return this.clampCents(this.total() / months)
//   }

//   saved(): number {
//     return this.clampCents(this.baseTotal() - this.total())
//   }
}