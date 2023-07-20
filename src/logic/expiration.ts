export function isExpired(expiresAt: string) {
  return +expiresAt < Date.now()
}

export function isOrderExpired(expiresAt: string) {
  return BigInt(expiresAt) * 1000n < Date.now()
}
