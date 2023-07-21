export function isOrderExpired(expiresAt: string) {
  let expiresAtNum =
    expiresAt.length === 13 ? Number(expiresAt) : Number(expiresAt) * 1000

  return expiresAtNum < Date.now()
}
