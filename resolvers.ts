// module.exports = {
//   Query: {
//     nfts: (next) => async (root, args, context, info) => {
//       console.log('info: ', info)
//       // console.log('context: ', context)
//       console.log('args: ', args)
//       console.log('root: ', root)
//       // Here, you can run anything you wish.
//       // For example, use `web3` lib, connect a wallet and so on.

//       return next(root, args, context, info)
//     },
//   },
// }
export const resolvers = {
  Query: {
    async nfts(root: any, args: any, context: any, info: any) {
      console.log('context: ', context)
      const tokensNonFlat = await Promise.all([
        context.marketplace.Query.nfts({ root, args, context, info }),
        context['collections-matic-mainnet'].Query.nfts({
          root,
          args,
          context,
          info,
        }),
      ])
      return tokensNonFlat.flat()
    },
  },
}
