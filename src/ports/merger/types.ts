export type FetchOptions<
  Options extends {},
  SortBy extends string
> = Options & {
  first?: number
  skip?: number
  sortBy?: SortBy
}

export type Sortable<Result, SortBy extends string> = {
  result: Result
  sort: Record<SortBy, string | number | null>
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export interface IMergerComponent<
  Result,
  Options extends {} = {},
  SortBy extends string = ''
> {
  fetch(filters: FetchOptions<Options, SortBy>): Promise<Result[]>
  count(filters: FetchOptions<Options, SortBy>): Promise<number>
  fetchAndCount(
    filters: FetchOptions<Options, SortBy>
  ): Promise<{ data: Result[]; total: number }>
}

export type MergerOptions<
  Result,
  Options extends {} = {},
  SortBy extends string = ''
> = {
  sources: IMergerComponent.Source<Result, Options, SortBy>[]
  directions: Record<SortBy, SortDirection>
  defaultSortBy: SortBy
  maxCount?: number
  mergerStrategy?: (a: Result, b: Result) => Result
  mergerEqualFn?: (a: Result, b: Result) => boolean
}

export namespace IMergerComponent {
  export type Source<
    Result,
    Options extends {} = {},
    SortBy extends string = ''
  > = {
    fetch(
      filters: FetchOptions<Options, SortBy>
    ): Promise<Sortable<Result, SortBy>[]>
    count(filters: FetchOptions<Options, SortBy>): Promise<number>
    fetchAndCount?(
      filters: FetchOptions<Options, SortBy>
    ): Promise<{ data: Sortable<Result, SortBy>[]; count: number }>
  }
}
