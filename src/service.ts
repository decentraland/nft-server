import { Lifecycle } from '@well-known-components/interfaces'
import { setupRoutes } from './adapters/routes'
import { AppComponents, GlobalContext } from './types'

export async function main(
  program: Lifecycle.EntryPointParameters<AppComponents>
) {
  const { components, startComponents } = program
  const globalContext: GlobalContext = {
    components,
  }
  await setupRoutes(globalContext)
  components.server.setContext(globalContext)
  await startComponents()
}
