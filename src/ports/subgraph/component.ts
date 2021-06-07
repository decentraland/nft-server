import 'isomorphic-fetch'
import { ApolloClient, DocumentNode } from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ISubgraphComponent } from './types'
import { sleep } from './utils'

export function createSubgraphComponent(url: string): ISubgraphComponent {
  const link = new HttpLink({
    uri: url,
  })

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
      },
    },
  })

  async function query<T>(
    graphqlQuery: DocumentNode,
    variables: Record<string, string | number | boolean> = {},
    remainingAttempts = 3
  ): Promise<T> {
    try {
      const result = await client.query<T>({ query: graphqlQuery, variables })
      if (!result || !result.data || Object.keys(result.data).length === 0) {
        throw new Error('Invalid response')
      }
      return result.data
    } catch (error) {
      if (remainingAttempts > 0) {
        // retry
        await sleep(500)
        return query<T>(graphqlQuery, variables, remainingAttempts - 1)
      } else {
        throw error // bubble up
      }
    }
  }

  return {
    query,
  }
}
