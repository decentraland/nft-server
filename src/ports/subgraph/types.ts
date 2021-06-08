export interface ISubgraphComponent {
  query: <T>(
    query: string,
    variables?: Record<
      string,
      string[] | string | number | boolean | undefined
    >,
    attempts?: number
  ) => Promise<T>
}
