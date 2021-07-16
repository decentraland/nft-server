export function isAddress(value?: string | null) {
  return !!value && /^0x[a-fA-F0-9]{40}$/.test(value)
}
