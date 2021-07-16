# NFT Server

This server is meant to aggregate data from different subgraphs under a single API.

# Run the project

```bash
npm install
```

After that you'll need to up check the `.env.example` file and create your own `.env` file. Some properties have defaults. Once you're done, you can run the project!

```bash
npm start # start the server

npm run start:watch # will watch for changes
```

# Modules

## NFTs

**Endpoint**: `/v1/nfts`

**Type**:

```ts
type NFT = {
  id: string
  contractAddress: string
  tokenId: string
  activeOrderId: string | null
  owner: string
  name: string
  category: NFTCategory
  image: string
  url: string
  issuedId: string | null
  itemId: string | null
  data: Data
  network: Network
  chainId: ChainId
  createdAt: number
  updatedAt: number
}
```

**Query Params**:

- `first`: Limit the number of results. Type: `number`.
- `skip`: Skip results. Type: `number`.
- `sortBy`: Sort results. Possible values: `newest`, `name`, `recently_listed`, `cheapest`.
- `category`: Filter by `NFTCategory`. Possible values: `parcel`, `estate`, `wearable`, `ens`.
- `owner`: Filter by owner. Type: `address`.
- `isOnSale`: Only return results that have an open, non-expired listing. Type: `boolean`.
- `search`: Free text search. Type: `string`.
- `isLand`: Only return results that their `category` is either `parcel` or `estate`.
- `isWearableHead`: Only return results that their category is `wearable` and are part of the avatar's head. Type `boolean`.
- `isWearableAccessory`: Only return results that their category is `wearable` and accessories (not a part of the body).
- `wearableCategory`: Filter results by `WearableCategory`. Possible values: `eyebrows`,`eyes`,`facial_hair`,`hair`,`mouth`,`upper_body`,`lower_body`,`feet`,`earring`,`eyewear`,`hat`,`helmet`,`mask`,`tiara`,`top_head`.
- `rarity`: Filter results by `Rarity`. It supports multiple values by adding the query param multiple times. Possible values: `unique`, `mythic`, `legendary`, `epic`, `rare`, `uncommon`, `common`.
- `wearableGender`: Filter results by `WearableGender`. It supports multiple values by adding the query param multiple times. Possible values: `male`, `female`.
- `contractAddress`: Filter results by contract address. It supports multiple values by adding the query param multiple times. Type: `address`.
- `tokenId`: Filter results by `tokenId`. Type: `string`.
- `itemId`: Filter results by `itemId`. Type `string`.
- `network`: Filter results by `Network`. Possible values: `ETHEREUM`, `MATIC`.

## Items

**Endpoint**: `/v1/items`

**Type**:

```ts
type Item = {
  id: string
  name: string
  thumbnail: string
  url: string
  category: NFTCategory
  contractAddress: string
  itemId: string
  rarity: Rarity
  price: string
  available: number
  creator: string
  data: Data
  network: Network
  chainId: ChainId
  createdAt: number
  updatedAt: number
}
```

**Query Params**:

- `first`: Limit the number of results. Type: `number`.
- `skip`: Skip results. Type: `number`.
- `sortBy`: Sort results. Possible values: `newest`, `name`, `cheapest`.
- `creator`: Filter by creator. Type: `address`.
- `isSoldOut`: Only return results that are sold out (all NFTs have been minted). Type: `boolean`.
- `isOnSale`: Only return results that can be bought (`CollectionStore` has been added as minter, and there's still available supply to mint). Type: `boolean`.
- `search`: Free text search. Type: `string`.
- `isWearableHead`: Only return results that their category is `wearable` and are part of the avatar's head. Type `boolean`.
- `isWearableAccessory`: Only return results that their category is `wearable` and accessories (not a part of the body).
- `wearableCategory`: Filter results by `WearableCategory`. Possible values: `eyebrows`,`eyes`,`facial_hair`,`hair`,`mouth`,`upper_body`,`lower_body`,`feet`,`earring`,`eyewear`,`hat`,`helmet`,`mask`,`tiara`,`top_head`.
- `rarity`: Filter results by `Rarity`. It supports multiple values by adding the query param multiple times. Possible values: `unique`, `mythic`, `legendary`, `epic`, `rare`, `uncommon`, `common`.
- `wearableGender`: Filter results by `WearableGender`. It supports multiple values by adding the query param multiple times. Possible values: `male`, `female`.
- `contractAddress`: Filter results by contract address. Type: `address`.
- `itemId`: Filter results by `itemId`. Type: `string`.
- `network`: Filter results by `Network`. Possible values: `ETHEREUM`, `MATIC`.

## Orders

**Endpoint**: `/v1/orders`

**Type**:

```ts
type Order = {
  id: string
  nftId: string
  contractAddress: string
  tokenId: string
  owner: string
  buyer: string | null
  price: string
  status: OrderStatus
  expiresAt: number
  network: Network
  chainId: ChainId
  createdAt: number
  updatedAt: number
}
```

**Query Params**:

- `first`: Limit the number of results. Type: `number`.
- `skip`: Skip results. Type: `number`.
- `sortBy`: Sort results. Possible values: `recently_listed`, `recently_updated`, `cheapest`.
- `owner`: Filter by owner. Type: `address`.
- `buyer`: Filter by buyer. Type: `address`.
- `contractAddress`: Filter results by contract address. It supports multiple values by adding the query param multiple times. Type: `address`.
- `tokenId`: Filter results by `tokenId`. Type: `string`.
- `status`: Filter results by `OrderStatus`. Possible values: `open`, `sold`, `cancelled`.
- `network`: Filter results by `Network`. Possible values: `ETHEREUM`, `MATIC`.

## Bids

**Endpoint**: `/v1/bids`

**Type**:

```ts
type Bid = {
  id: string
  bidder: string
  seller: string
  price: string
  fingerprint: string
  status: BidStatus
  blockchainId: string
  blockNumber: string
  expiresAt: number
  contractAddress: string
  tokenId: string
  network: Network
  chainId: ChainId
  createdAt: number
  updatedAt: number
}
```

**Query Params**:

- `first`: Limit the number of results. Type: `number`.
- `skip`: Skip results. Type: `number`.
- `sortBy`: Sort results. Possible values: `recently_offered`, `recently_updated`, `most_expensive`.
- `bidder`: Filter by bidder. Type: `address`.
- `seller`: Filter by seller. Type: `address`.
- `contractAddress`: Filter results by contract address. It supports multiple values by adding the query param multiple times. Type: `address`.
- `tokenId`: Filter results by `tokenId`. Type: `string`.
- `status`: Filter results by `BidStatus`. Possible values: `open`, `sold`, `cancelled`.
- `network`: Filter results by `Network`. Possible values: `ETHEREUM`, `MATIC`.

## Contracts

**Endpoint**: `/v1/contracts`

**Type**:

```ts
type Contract = {
  name: string
  address: string
  category: NFTCategory
  network: Network
  chainId: ChainId
}
```

**Query Params**:

- `first`: Limit the number of results. Type: `number`.
- `skip`: Skip results. Type: `number`.
- `sortBy`: Sort results. Possible values: `name`.
- `category`: Filter by `NFTCategory`. Possible values: `parcel`, `estate`, `wearable`, `ens`.
- `network`: Filter results by `Network`. Possible values: `ETHEREUM`, `MATIC`.
