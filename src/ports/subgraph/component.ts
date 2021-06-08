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
      const result: { data: T } = await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          variables,
        }),
      }).then((resp) => resp.json())

      if (!result || !result.data || Object.keys(result.data).length === 0) {
        throw new Error('Invalid response')
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
