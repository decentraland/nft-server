export interface IBuilderComponent {
  getItemUtility(
    collectionAddress: string,
    itemId: string
  ): Promise<string | undefined>
}
