import RequestError from 'decentraland-crypto-middleware/lib/errors'

export function validateAuthMetadataSigner(
  metadata: Record<string, any> | undefined
) {
  if (metadata && metadata.signer === 'decentraland-kernel-scene') {
    throw new RequestError('Invalid signer', 400)
  }
  return true
}
