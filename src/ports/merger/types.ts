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

export type Source<
  Result,
  Options extends {} = {},
  SortBy extends string = ''
> = {
  fetch(
    options: FetchOptions<Options, SortBy>
  ): Promise<Sortable<Result, SortBy>[]>
  count(options: FetchOptions<Options, SortBy>): Promise<number>
}

export interface IMergerComponent<
  Result,
  Options extends {} = {},
  SortBy extends string = ''
> {
  fetch(options: FetchOptions<Options, SortBy>): Promise<Result[]>
  count(options: FetchOptions<Options, SortBy>): Promise<number>
  fetchAndCount(
    options: FetchOptions<Options, SortBy>
  ): Promise<{ results: Result[]; total: number }>
}

export type MergerOptions<
  Result,
  Options extends {} = {},
  SortBy extends string = ''
> = {
  sources: Source<Result, Options, SortBy>[]
  directions: Record<SortBy, SortDirection>
  defaultSortBy: SortBy
  maxCount?: number
}
