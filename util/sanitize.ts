// utils/sanitizeHtml.ts
export async function sanitizeHtml(html: string) {
  if (import.meta.client) {
    const { default: DOMPurify } = await import('dompurify')
    return DOMPurify.sanitize(html)
  }
  // En SSR : retourne du texte brut (ou enlève les balises)
  return html.replace(/<[^>]*>?/gm, '')
}