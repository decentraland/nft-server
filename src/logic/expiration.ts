export function isOrderExpired(expiresAt: string) {
  return BigInt(expiresAt) * 1000n < Date.now()
}
