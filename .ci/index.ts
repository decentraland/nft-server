import * as cloudflare from '@pulumi/cloudflare'
import { getZoneId } from 'dcl-ops-lib/cloudflare'
import { prometheusStack } from 'dcl-ops-lib/prometheus'
import { createFargateTask } from 'dcl-ops-lib/createFargateTask'
import { env, envTLD } from 'dcl-ops-lib/domain'

const API_VERSION = 'v1'

const getCloudflareDomain = (env: string) => {
  switch (env) {
    case 'stg':
      return '.today'
    case 'prod':
      return '.org'
    default:
      return '.zone'
  }
}

export = async function main() {
  const revision = process.env['CI_COMMIT_SHA']
  const image = `decentraland/nft-server:${revision}`

  const baseHostname = 'nft-api.decentraland.'
  const hostname = baseHostname + envTLD
  const prometheus = await prometheusStack()
  const nftAPI = await createFargateTask(
    `nft-api`,
    image,
    5000,
    [
      { name: 'hostname', value: `nft-server-${env}` },
      { name: 'name', value: `nft-server-${env}` },
      { name: 'NODE_ENV', value: 'production' },
      { name: 'API_VERSION', value: API_VERSION },
      { name: 'SERVER_PORT', value: '5000' },
      { name: 'CORS_ORIGIN', value: '*' },
      { name: 'CORS_METHOD', value: '*' },
      {
        name: 'MARKETPLACE_CHAIN_ID',
        value: env === 'prd' || env === 'stg' ? '1' : '3',
      },
      {
        name: 'COLLECTIONS_CHAIN_ID',
        value: env === 'prd' || env === 'stg' ? '137' : '80001',
      },
      {
        name: 'MARKETPLACE_SUBGRAPH_URL',
        value:
          env === 'prd' || env === 'stg'
            ? 'https://api.thegraph.com/subgraphs/name/decentraland/marketplace'
            : 'https://api.thegraph.com/subgraphs/name/decentraland/marketplace-ropsten',
      },
      {
        name: 'COLLECTIONS_SUBGRAPH_URL',
        value:
          env === 'prd' || env === 'stg'
            ? 'https://api.thegraph.com/subgraphs/name/decentraland/collections-matic-mainnet'
            : 'https://api.thegraph.com/subgraphs/name/decentraland/collections-matic-mumbai',
      },
      {
        name: 'MIN_SALE_VALUE_IN_WEI',
        value: '',
      },
      {
        name: 'WKC_METRICS_BEARER_TOKEN',
        value: prometheus.getOutput('serviceMetricsBearerToken'),
      },
    ],
    hostname,
    {
      team: 'dapps',
      healthCheck: {
        path: '/health/ready',
        interval: 60,
        timeout: 10,
        unhealthyThreshold: 10,
        healthyThreshold: 3,
      },
      metrics: {
        path: '/metrics',
      },
      version: '1',
      memoryReservation: 1024,
      cpuReservation: 256,
      desiredCount: env === 'prd' ? 3 : 1,
      extraExposedServiceOptions: {
        createCloudflareProxiedSubdomain: true,
      },
    }
  )

  const publicUrl = nftAPI.endpoint
  const pageRuleConfig = {
    target: `${baseHostname}${getCloudflareDomain(
      env
    )}/${API_VERSION}/trendings`,
    zoneId: getZoneId(),
    actions: {
      alwaysOnline: 'on',
      cacheLevel: 'cache_everything',
      cacheTtlByStatuses: [{ codes: '200', ttl: 31536000 /* a year */ }],
      edgeCacheTtl: 31536000 /* a year */,
      browserCacheTtl: '31536000' /* a year */,
    },
  }

  new cloudflare.PageRule('trendings-cache', pageRuleConfig)

  return {
    publicUrl,
    pageRuleConfig,
  }
}
