export function isExpired(expiresAt: string) {
  return +expiresAt < Date.now()
}
