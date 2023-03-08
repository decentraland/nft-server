import { config as configDotEnvFile } from 'dotenv'
import { createConfigComponent } from '@well-known-components/env-config-provider'
import {
  createServerComponent,
  IFetchComponent,
} from '@well-known-components/http-server'
import { createMetricsComponent } from '@well-known-components/metrics'
import {
  createSubgraphComponent,
  metricDeclarations,
} from '@well-known-components/thegraph-component'
import nodeFetch from 'node-fetch'
import { getItemsQuery } from '../ports/items/utils'
import { createLogComponent } from '../ports/logger/component'
import { createRequestSessionComponent } from '../ports/requestSession/component'
import { AppConfig, GlobalContext } from '../types'
import { getOrdersQuery } from '../ports/orders/utils'
import { getBidsQuery } from '../ports/bids/utils'
import { getMintsQuery } from '../ports/mints/utils'
import { getSalesQuery } from '../ports/sales/utils'
import { getAnalyticsDayDataQuery } from '../ports/analyticsDayData/utils'
import { Network } from '@dcl/schemas'
import { getFetchQuery } from '../ports/nfts/utils'
import { getCollectionsFragment } from '../logic/nfts/collections'

async function testGraphIntegrity() {
  configDotEnvFile()
  // Default config
  const defaultValues: Partial<AppConfig> = {
    HTTP_SERVER_PORT: process.env.HTTP_SERVER_PORT || '5000',
    HTTP_SERVER_HOST: process.env.HTTP_SERVER_HOST || '0.0.0.0',
    API_VERSION: process.env.API_VERSION || 'v1',
  }
  const fetch: IFetchComponent = {
    fetch: nodeFetch,
  }
  const config = createConfigComponent(process.env, defaultValues)
  const cors = {
    origin: await config.getString('CORS_ORIGIN'),
    method: await config.getString('CORS_METHOD'),
  }
  const requestSession = createRequestSessionComponent()
  const logs = createLogComponent({ requestSession })
  const server = await createServerComponent<GlobalContext>(
    { config, logs },
    { cors, compression: {} }
  )
  const metrics = await createMetricsComponent(metricDeclarations, {
    server,
    config,
  })
  const collectionsSubgraph = await createSubgraphComponent(
    { logs, config, fetch, metrics },
    await config.requireString('COLLECTIONS_SUBGRAPH_URL')
  )
  const upgradedCollectionsSubgraph = await createSubgraphComponent(
    { logs, config, fetch, metrics },
    await config.requireString('UPGRADED_COLLECTIONS_SUBGRAPH_URL')
  )

  const queries = [
    // orders
    {
      name: 'orders',
      query: () => getOrdersQuery({}),
    },
    // bids
    {
      name: 'bids',
      query: () => getBidsQuery({}),
    },
    // nfts
    {
      name: 'nfts',
      query: () =>
        getFetchQuery({}, 'collectionsFragment', getCollectionsFragment),
    },
    // items
    {
      name: 'items',
      query: () => getItemsQuery({}),
    },
    // mints
    {
      name: 'mints',
      query: () => getMintsQuery({}),
    },
    // sales
    {
      name: 'sales',
      query: () => getSalesQuery({}, false, Network.MATIC),
    },
    // analytics
    {
      name: 'analytics',
      query: () => getAnalyticsDayDataQuery({}),
    },
  ]

  const integrityCheckPromises = queries.map(
    ({ query, name }) =>
      new Promise(async (res) => {
        try {
          let hasEqualResults = true
          const oldResults: Record<
            string,
            []
          > = await collectionsSubgraph.query(query())
          const newResults: Record<
            string,
            []
          > = await upgradedCollectionsSubgraph.query(query())
          if (oldResults[name].length !== newResults[name].length) {
            console.log(`${name} newResults length: `, newResults[name].length)
            console.log(`${name} oldResults length: `, oldResults[name].length)
            console.log('RESULTS LENGHT NOT MATCHING')
            hasEqualResults = false
          }
          oldResults[name].forEach((fragment, index) => {
            if (newResults[name][index] === fragment) {
              console.log('RESULTS NOT MATCHING')
              hasEqualResults = false
            }
          })
          console.log(`---------${name} match result is:`, hasEqualResults)
          res(hasEqualResults)
        } catch (error) {
          console.log(`error in ${name}: `, error)
          res(false)
        }
      })
  )
  //   queries.forEach(async ({ query, name }) => {
  //     try {
  //       let hasEqualResults = true
  //       const oldResults: Record<string, []> = await collectionsSubgraph.query(
  //         query()
  //       )
  //       const newResults: Record<
  //         string,
  //         []
  //       > = await upgradedCollectionsSubgraph.query(query())
  //       if (oldResults[name].length !== newResults[name].length) {
  //         console.log(`${name} newResults length: `, newResults[name].length)
  //         console.log(`${name} oldResults length: `, oldResults[name].length)
  //         console.log('RESULTS LENGHT NOT MATCHING')
  //         hasEqualResults = false
  //       }
  //       oldResults[name].forEach((fragment, index) => {
  //         if (newResults[name][index] === fragment) {
  //           console.log('RESULTS NOT MATCHING')
  //           hasEqualResults = false
  //         }
  //       })
  //       console.log(`---------${name} match result is:`, hasEqualResults)
  //     } catch (error) {
  //       console.log(`error in ${name}: `, error)
  //     }
  //   })

  const result = await Promise.all(integrityCheckPromises)
  console.log(
    'ARE GRAPHS EQUALS:',
    result.every((res) => !!res)
  )
}

testGraphIntegrity()
