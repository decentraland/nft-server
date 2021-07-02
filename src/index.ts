import { config as configDotEnvFile } from 'dotenv'
import { Network } from '@dcl/schemas'
import { createConfigComponent } from '@well-known-components/env-config-provider'
import {
  createServerComponent,
  createStatusCheckComponent,
} from '@well-known-components/http-server'
import { createLogComponent } from '@well-known-components/logger'
import { Lifecycle } from '@well-known-components/interfaces'
import { createMetricsComponent } from '@well-known-components/metrics'
import { setupRoutes } from './adapters/routes'
import { AppComponents, AppConfig, GlobalContext } from './types'
import { createSubgraphComponent } from './ports/subgraph/component'
import { createBrowseComponent } from './ports/browse/component'
import { createBidsComponent } from './ports/bids/component'
import { createOrdersComponent } from './ports/orders/component'
import { getMarketplaceChainId } from './ports/browse/sources/marketplace'
import { getCollectionsChainId } from './ports/browse/sources/collections'

async function main(components: AppComponents) {
  const globalContext: GlobalContext = {
    components,
  }

  await setupRoutes(globalContext)
}

async function initComponents(): Promise<AppComponents> {
  configDotEnvFile()

  // default config
  const defaultValues: Partial<AppConfig> = {
    HTTP_SERVER_PORT: '5000',
    HTTP_SERVER_HOST: '0.0.0.0',
    API_VERSION: 'v1',
  }

  const config = createConfigComponent(process.env, defaultValues)

  const cors = {
    origin: await config.getString('CORS_ORIGIN'),
    method: await config.getString('CORS_METHOD'),
  }

  const logs = createLogComponent()
  const server = await createServerComponent<GlobalContext>(
    { config, logs },
    { cors, compression: {} }
  )

  const statusChecks = await createStatusCheckComponent({ server })

  const metrics = await createMetricsComponent(
    {},
    {
      server,
      config,
    }
  )

  const marketplaceSubgraph = createSubgraphComponent(
    await config.requireString('MARKETPLACE_SUBGRAPH_URL')
  )

  const collectionsSubgraph = createSubgraphComponent(
    await config.requireString('COLLECTIONS_SUBGRAPH_URL')
  )

  const marketplaceOrders = createOrdersComponent({
    subgraph: marketplaceSubgraph,
    network: Network.ETHEREUM,
    chainId: getMarketplaceChainId(),
  })

  const collectionsOrders = createOrdersComponent({
    subgraph: collectionsSubgraph,
    network: Network.ETHEREUM,
    chainId: getCollectionsChainId(),
  })

  const browse = createBrowseComponent({
    marketplaceSubgraph,
    collectionsSubgraph,
  })

  const marketplaceBids = createBidsComponent({ subgraph: marketplaceSubgraph })

  return {
    config,
    logs,
    server,
    statusChecks,
    metrics,
    marketplaceSubgraph,
    collectionsSubgraph,
    marketplaceOrders,
    collectionsOrders,
    browse,
    marketplaceBids,
  }
}

Lifecycle.programEntryPoint({
  main,
  initComponents,
}).catch((error) => console.error('Error staring app lifecycle', error))
