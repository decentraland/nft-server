import 'isomorphic-fetch'
import { ApolloClient, DocumentNode } from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { future } from 'fp-future'
import { ISubgraphComponent } from './types'

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
  ) {
    try {
      const result = await client.query<T>({ query: graphqlQuery, variables })
      if (!result || !result.data || Object.keys(result.data).length === 0) {
        throw new Error('Invalid response')
      }
      return result.data
    } catch (error) {
      // retry
      const retry = future<T>()
      setTimeout(
        () =>
          remainingAttempts > 0
            ? query<T>(graphqlQuery, variables, remainingAttempts - 1)
                .then((result) => retry.resolve(result))
                .catch((error) => retry.reject(error))
            : retry.reject(error),
        500
      )
      return retry
    }
  }

  return {
    query,
  }
}
