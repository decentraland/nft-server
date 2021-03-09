# NFT Server

Server for browsing NFTs.

# Run the project

```bash
npm install
```

After that you'll need to up check the `.env.example` file and create your own `.env` file. Some properties have defaults. Once you're done, you can run the project!

```bash
npm start # runs npm run build behind the scenes

npm run start:watch # will watch for changes
```

# Endpoints

Check [`./src/adapters/routes.ts`](https://github.com/decentraland/nft-server/blob/master/src/adapters/routes.ts) for an up to date list of all the endpoints. The most important ones are:
