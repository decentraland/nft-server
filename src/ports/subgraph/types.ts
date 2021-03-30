import { DocumentNode } from 'graphql'
import { OperationVariables } from 'apollo-boost'

export interface ISubgraphComponent {
  query: <T>(
    query: DocumentNode,
    variables?: OperationVariables,
    attempts?: number
  ) => Promise<T>
}
