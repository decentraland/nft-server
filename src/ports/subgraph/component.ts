import fetch from 'node-fetch'
import { ISubgraphComponent } from './types'
import { sleep } from './utils'

export function createSubgraphComponent(url: string): ISubgraphComponent {
  async function executeQuery<T>(
    query: string,
    variables: Record<
      string,
      string[] | string | number | boolean | undefined
    > = {},
    remainingAttempts = 3
  ): Promise<T> {
    try {
      const result: { data: T; errors?: { message: string }[] } = await fetch(
        url,
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query,
            variables,
          }),
        }
      ).then((resp) => resp.json())

      if (!result || !result.data || Object.keys(result.data).length === 0) {
        if (result && result.errors && result.errors.length) {
          throw new Error(
            `${
              result.errors.length > 1
                ? `There was a total of ${result.errors.length} GraphQL errors, the first one was:`
                : `GraphQL Error:`
            } ${result.errors[0].message}`
          )
        } else {
          throw new Error('GraphQL Error: Invalid response')
        }
      }

      return result.data
    } catch (error) {
      if (remainingAttempts > 0) {
        // retry
        await sleep(500)
        return executeQuery<T>(query, variables, remainingAttempts - 1)
      } else {
        throw error // bubble up
      }
    }
  }

  return {
    query: executeQuery,
  }
}
