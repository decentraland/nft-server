import { IHttpServerComponent } from '@well-known-components/interfaces'

export async function withSignerValidation(
  ctx: IHttpServerComponent.DefaultContext<any>,
  next: () => Promise<IHttpServerComponent.IResponse>
): Promise<IHttpServerComponent.IResponse> {
  if (
    ctx.verification &&
    ctx.verification.authMetadata &&
    typeof ctx.verification.authMetadata === 'object' &&
    ctx.verification.authMetadata.signer === 'decentraland-kernel-scene'
  ) {
    return {
      status: 400,
      body: 'Invalid signer',
    }
  }

  return await next()
}
