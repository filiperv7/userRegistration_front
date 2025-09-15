export function formatCPF(value: string) {
  const unformattedValue = value.replace(/\D/g, '')

  const match = unformattedValue.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/)
  if (!match) return unformattedValue

  const [, p1, p2, p3, p4] = match
  let formattedValue = ''

  if (p1) formattedValue += p1
  if (p2) formattedValue += `.${p2}`
  if (p3) formattedValue += `.${p3}`
  if (p4) formattedValue += `-${p4}`

  return formattedValue.replace(/\.$/, '')
}
