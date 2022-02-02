export function isAddress(value?: string | null) {
  return !!value && /^0x[a-fA-F0-9]{40}$/.test(value)
}

export const isAddressZero = (addr: string) => {
  return /^0x(0)+$/.test(addr)
}
