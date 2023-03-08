// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import RenameTransform from "@graphql-mesh/transform-rename";
import StitchingMerger from "@graphql-mesh/merger-stitching";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { CollectionsEthereumTypes } from './sources/collections-ethereum/types';
import type { MarketplaceTypes } from './sources/marketplace/types';
import type { CollectionsMaticTypes } from './sources/collections-matic/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Query = {
  count?: Maybe<Count>;
  counts: Array<Count>;
  order?: Maybe<Order>;
  orders: Array<Order>;
  bid?: Maybe<Bid>;
  bids: Array<Bid>;
  parcel?: Maybe<Parcel>;
  parcels: Array<Parcel>;
  estate?: Maybe<Estate>;
  estates: Array<Estate>;
  data?: Maybe<Data>;
  datas: Array<Data>;
  wearable?: Maybe<Wearable>;
  wearables: Array<Wearable>;
  ens?: Maybe<ENS>;
  enss: Array<ENS>;
  nft?: Maybe<NFT>;
  legacyNFTs: Array<NFT>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  sale?: Maybe<Sale>;
  sales: Array<Sale>;
  analyticsDayData?: Maybe<AnalyticsDayData>;
  analyticsDayDatas: Array<AnalyticsDayData>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  collection?: Maybe<Collection>;
  collections: Array<Collection>;
  item?: Maybe<Item>;
  items: Array<Item>;
  nfts: Array<NFT>;
  metadata: Array<Metadata>;
  emote?: Maybe<Emote>;
  emotes: Array<Emote>;
  rarity?: Maybe<Rarity>;
  rarities: Array<Rarity>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  curation?: Maybe<Curation>;
  curations: Array<Curation>;
  itemsDayData?: Maybe<ItemsDayData>;
  itemsDayDatas: Array<ItemsDayData>;
  accountsDayData?: Maybe<AccountsDayData>;
  accountsDayDatas: Array<AccountsDayData>;
};


export type QuerycountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Count_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Count_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryorderArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryordersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Order_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybidArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybidsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bid_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryparcelArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryparcelsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Parcel_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Parcel_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryestateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryestatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Estate_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Estate_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Data_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Data_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerywearableArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerywearablesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wearable_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Wearable_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryensArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryenssArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ENS_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ENS_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynftArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerylegacyNFTsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NFT_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NFT_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryaccountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryaccountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Account_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysaleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysalesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Sale_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Sale_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryanalyticsDayDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryanalyticsDayDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AnalyticsDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AnalyticsDayData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};


export type QuerycollectionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycollectionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Collection_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Collection_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryitemArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryitemsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Item_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Item_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynftsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NFT_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NFT_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymetadataArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Metadata_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Metadata_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryemoteArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryemotesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Emote_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Emote_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrarityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryraritiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Rarity_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Rarity_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymintArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymintsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Mint_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Mint_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycurationArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycurationsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Curation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Curation_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryitemsDayDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryitemsDayDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ItemsDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ItemsDayData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryaccountsDayDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryaccountsDayDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AccountsDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AccountsDayData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type Subscription = {
  count?: Maybe<Count>;
  counts: Array<Count>;
  order?: Maybe<Order>;
  orders: Array<Order>;
  bid?: Maybe<Bid>;
  bids: Array<Bid>;
  parcel?: Maybe<Parcel>;
  parcels: Array<Parcel>;
  estate?: Maybe<Estate>;
  estates: Array<Estate>;
  data?: Maybe<Data>;
  datas: Array<Data>;
  wearable?: Maybe<Wearable>;
  wearables: Array<Wearable>;
  ens?: Maybe<ENS>;
  enss: Array<ENS>;
  nft?: Maybe<NFT>;
  nfts: Array<NFT>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  sale?: Maybe<Sale>;
  sales: Array<Sale>;
  analyticsDayData?: Maybe<AnalyticsDayData>;
  analyticsDayDatas: Array<AnalyticsDayData>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  collection?: Maybe<Collection>;
  collections: Array<Collection>;
  item?: Maybe<Item>;
  items: Array<Item>;
  metadata: Array<Metadata>;
  emote?: Maybe<Emote>;
  emotes: Array<Emote>;
  rarity?: Maybe<Rarity>;
  rarities: Array<Rarity>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  curation?: Maybe<Curation>;
  curations: Array<Curation>;
  itemsDayData?: Maybe<ItemsDayData>;
  itemsDayDatas: Array<ItemsDayData>;
  accountsDayData?: Maybe<AccountsDayData>;
  accountsDayDatas: Array<AccountsDayData>;
};


export type SubscriptioncountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Count_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Count_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionorderArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionordersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Order_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbidArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbidsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bid_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionparcelArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionparcelsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Parcel_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Parcel_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionestateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionestatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Estate_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Estate_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Data_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Data_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionwearableArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionwearablesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wearable_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Wearable_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionensArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionenssArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ENS_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ENS_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnftArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnftsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NFT_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NFT_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionaccountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionaccountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Account_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsaleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsalesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Sale_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Sale_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionanalyticsDayDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionanalyticsDayDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AnalyticsDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AnalyticsDayData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};


export type SubscriptioncollectionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncollectionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Collection_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Collection_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionitemArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionitemsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Item_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Item_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmetadataArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Metadata_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Metadata_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionemoteArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionemotesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Emote_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Emote_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrarityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionraritiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Rarity_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Rarity_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmintArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmintsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Mint_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Mint_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncurationArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncurationsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Curation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Curation_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionitemsDayDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionitemsDayDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ItemsDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ItemsDayData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionaccountsDayDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionaccountsDayDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AccountsDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AccountsDayData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type Account = {
  id: Scalars['ID'];
  address: Scalars['Bytes'];
  nfts?: Maybe<Array<NFT>>;
  sales: Scalars['Int'];
  purchases: Scalars['Int'];
  spent: Scalars['BigInt'];
  earned: Scalars['BigInt'];
  isCommitteeMember?: Maybe<Scalars['Boolean']>;
  totalCurations?: Maybe<Scalars['Int']>;
  primarySales: Scalars['Int'];
  primarySalesEarned: Scalars['BigInt'];
  royalties: Scalars['BigInt'];
  uniqueAndMythicItems: Array<Scalars['ID']>;
  uniqueAndMythicItemsTotal: Scalars['Int'];
  collections: Scalars['Int'];
  creatorsSupported: Array<Scalars['String']>;
  creatorsSupportedTotal: Scalars['Int'];
  uniqueCollectors: Array<Scalars['String']>;
  uniqueCollectorsTotal: Scalars['Int'];
};


export type AccountnftsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NFT_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NFT_filter>;
};

export type Account_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_gt?: InputMaybe<Scalars['Bytes']>;
  address_lt?: InputMaybe<Scalars['Bytes']>;
  address_gte?: InputMaybe<Scalars['Bytes']>;
  address_lte?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  nfts_?: InputMaybe<NFT_filter>;
  sales?: InputMaybe<Scalars['Int']>;
  sales_not?: InputMaybe<Scalars['Int']>;
  sales_gt?: InputMaybe<Scalars['Int']>;
  sales_lt?: InputMaybe<Scalars['Int']>;
  sales_gte?: InputMaybe<Scalars['Int']>;
  sales_lte?: InputMaybe<Scalars['Int']>;
  sales_in?: InputMaybe<Array<Scalars['Int']>>;
  sales_not_in?: InputMaybe<Array<Scalars['Int']>>;
  purchases?: InputMaybe<Scalars['Int']>;
  purchases_not?: InputMaybe<Scalars['Int']>;
  purchases_gt?: InputMaybe<Scalars['Int']>;
  purchases_lt?: InputMaybe<Scalars['Int']>;
  purchases_gte?: InputMaybe<Scalars['Int']>;
  purchases_lte?: InputMaybe<Scalars['Int']>;
  purchases_in?: InputMaybe<Array<Scalars['Int']>>;
  purchases_not_in?: InputMaybe<Array<Scalars['Int']>>;
  spent?: InputMaybe<Scalars['BigInt']>;
  spent_not?: InputMaybe<Scalars['BigInt']>;
  spent_gt?: InputMaybe<Scalars['BigInt']>;
  spent_lt?: InputMaybe<Scalars['BigInt']>;
  spent_gte?: InputMaybe<Scalars['BigInt']>;
  spent_lte?: InputMaybe<Scalars['BigInt']>;
  spent_in?: InputMaybe<Array<Scalars['BigInt']>>;
  spent_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  earned?: InputMaybe<Scalars['BigInt']>;
  earned_not?: InputMaybe<Scalars['BigInt']>;
  earned_gt?: InputMaybe<Scalars['BigInt']>;
  earned_lt?: InputMaybe<Scalars['BigInt']>;
  earned_gte?: InputMaybe<Scalars['BigInt']>;
  earned_lte?: InputMaybe<Scalars['BigInt']>;
  earned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  earned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Account_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Account_filter>>>;
  isCommitteeMember?: InputMaybe<Scalars['Boolean']>;
  isCommitteeMember_not?: InputMaybe<Scalars['Boolean']>;
  isCommitteeMember_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isCommitteeMember_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  totalCurations?: InputMaybe<Scalars['Int']>;
  totalCurations_not?: InputMaybe<Scalars['Int']>;
  totalCurations_gt?: InputMaybe<Scalars['Int']>;
  totalCurations_lt?: InputMaybe<Scalars['Int']>;
  totalCurations_gte?: InputMaybe<Scalars['Int']>;
  totalCurations_lte?: InputMaybe<Scalars['Int']>;
  totalCurations_in?: InputMaybe<Array<Scalars['Int']>>;
  totalCurations_not_in?: InputMaybe<Array<Scalars['Int']>>;
  primarySales?: InputMaybe<Scalars['Int']>;
  primarySales_not?: InputMaybe<Scalars['Int']>;
  primarySales_gt?: InputMaybe<Scalars['Int']>;
  primarySales_lt?: InputMaybe<Scalars['Int']>;
  primarySales_gte?: InputMaybe<Scalars['Int']>;
  primarySales_lte?: InputMaybe<Scalars['Int']>;
  primarySales_in?: InputMaybe<Array<Scalars['Int']>>;
  primarySales_not_in?: InputMaybe<Array<Scalars['Int']>>;
  primarySalesEarned?: InputMaybe<Scalars['BigInt']>;
  primarySalesEarned_not?: InputMaybe<Scalars['BigInt']>;
  primarySalesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  primarySalesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  primarySalesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  primarySalesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  primarySalesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  primarySalesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  royalties?: InputMaybe<Scalars['BigInt']>;
  royalties_not?: InputMaybe<Scalars['BigInt']>;
  royalties_gt?: InputMaybe<Scalars['BigInt']>;
  royalties_lt?: InputMaybe<Scalars['BigInt']>;
  royalties_gte?: InputMaybe<Scalars['BigInt']>;
  royalties_lte?: InputMaybe<Scalars['BigInt']>;
  royalties_in?: InputMaybe<Array<Scalars['BigInt']>>;
  royalties_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  uniqueAndMythicItems?: InputMaybe<Array<Scalars['ID']>>;
  uniqueAndMythicItems_not?: InputMaybe<Array<Scalars['ID']>>;
  uniqueAndMythicItems_contains?: InputMaybe<Array<Scalars['ID']>>;
  uniqueAndMythicItems_contains_nocase?: InputMaybe<Array<Scalars['ID']>>;
  uniqueAndMythicItems_not_contains?: InputMaybe<Array<Scalars['ID']>>;
  uniqueAndMythicItems_not_contains_nocase?: InputMaybe<Array<Scalars['ID']>>;
  uniqueAndMythicItemsTotal?: InputMaybe<Scalars['Int']>;
  uniqueAndMythicItemsTotal_not?: InputMaybe<Scalars['Int']>;
  uniqueAndMythicItemsTotal_gt?: InputMaybe<Scalars['Int']>;
  uniqueAndMythicItemsTotal_lt?: InputMaybe<Scalars['Int']>;
  uniqueAndMythicItemsTotal_gte?: InputMaybe<Scalars['Int']>;
  uniqueAndMythicItemsTotal_lte?: InputMaybe<Scalars['Int']>;
  uniqueAndMythicItemsTotal_in?: InputMaybe<Array<Scalars['Int']>>;
  uniqueAndMythicItemsTotal_not_in?: InputMaybe<Array<Scalars['Int']>>;
  collections?: InputMaybe<Scalars['Int']>;
  collections_not?: InputMaybe<Scalars['Int']>;
  collections_gt?: InputMaybe<Scalars['Int']>;
  collections_lt?: InputMaybe<Scalars['Int']>;
  collections_gte?: InputMaybe<Scalars['Int']>;
  collections_lte?: InputMaybe<Scalars['Int']>;
  collections_in?: InputMaybe<Array<Scalars['Int']>>;
  collections_not_in?: InputMaybe<Array<Scalars['Int']>>;
  creatorsSupported?: InputMaybe<Array<Scalars['String']>>;
  creatorsSupported_not?: InputMaybe<Array<Scalars['String']>>;
  creatorsSupported_contains?: InputMaybe<Array<Scalars['String']>>;
  creatorsSupported_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  creatorsSupported_not_contains?: InputMaybe<Array<Scalars['String']>>;
  creatorsSupported_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  creatorsSupportedTotal?: InputMaybe<Scalars['Int']>;
  creatorsSupportedTotal_not?: InputMaybe<Scalars['Int']>;
  creatorsSupportedTotal_gt?: InputMaybe<Scalars['Int']>;
  creatorsSupportedTotal_lt?: InputMaybe<Scalars['Int']>;
  creatorsSupportedTotal_gte?: InputMaybe<Scalars['Int']>;
  creatorsSupportedTotal_lte?: InputMaybe<Scalars['Int']>;
  creatorsSupportedTotal_in?: InputMaybe<Array<Scalars['Int']>>;
  creatorsSupportedTotal_not_in?: InputMaybe<Array<Scalars['Int']>>;
  uniqueCollectors?: InputMaybe<Array<Scalars['String']>>;
  uniqueCollectors_not?: InputMaybe<Array<Scalars['String']>>;
  uniqueCollectors_contains?: InputMaybe<Array<Scalars['String']>>;
  uniqueCollectors_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  uniqueCollectors_not_contains?: InputMaybe<Array<Scalars['String']>>;
  uniqueCollectors_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  uniqueCollectorsTotal?: InputMaybe<Scalars['Int']>;
  uniqueCollectorsTotal_not?: InputMaybe<Scalars['Int']>;
  uniqueCollectorsTotal_gt?: InputMaybe<Scalars['Int']>;
  uniqueCollectorsTotal_lt?: InputMaybe<Scalars['Int']>;
  uniqueCollectorsTotal_gte?: InputMaybe<Scalars['Int']>;
  uniqueCollectorsTotal_lte?: InputMaybe<Scalars['Int']>;
  uniqueCollectorsTotal_in?: InputMaybe<Array<Scalars['Int']>>;
  uniqueCollectorsTotal_not_in?: InputMaybe<Array<Scalars['Int']>>;
};

export type Account_orderBy =
  | 'id'
  | 'address'
  | 'nfts'
  | 'sales'
  | 'purchases'
  | 'spent'
  | 'earned'
  | 'isCommitteeMember'
  | 'totalCurations'
  | 'primarySales'
  | 'primarySalesEarned'
  | 'royalties'
  | 'uniqueAndMythicItems'
  | 'uniqueAndMythicItemsTotal'
  | 'collections'
  | 'creatorsSupported'
  | 'creatorsSupportedTotal'
  | 'uniqueCollectors'
  | 'uniqueCollectorsTotal';

export type AnalyticsDayData = {
  id: Scalars['ID'];
  date: Scalars['Int'];
  sales: Scalars['Int'];
  volume: Scalars['BigInt'];
  creatorsEarnings: Scalars['BigInt'];
  daoEarnings: Scalars['BigInt'];
};

export type AnalyticsDayData_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  date?: InputMaybe<Scalars['Int']>;
  date_not?: InputMaybe<Scalars['Int']>;
  date_gt?: InputMaybe<Scalars['Int']>;
  date_lt?: InputMaybe<Scalars['Int']>;
  date_gte?: InputMaybe<Scalars['Int']>;
  date_lte?: InputMaybe<Scalars['Int']>;
  date_in?: InputMaybe<Array<Scalars['Int']>>;
  date_not_in?: InputMaybe<Array<Scalars['Int']>>;
  sales?: InputMaybe<Scalars['Int']>;
  sales_not?: InputMaybe<Scalars['Int']>;
  sales_gt?: InputMaybe<Scalars['Int']>;
  sales_lt?: InputMaybe<Scalars['Int']>;
  sales_gte?: InputMaybe<Scalars['Int']>;
  sales_lte?: InputMaybe<Scalars['Int']>;
  sales_in?: InputMaybe<Array<Scalars['Int']>>;
  sales_not_in?: InputMaybe<Array<Scalars['Int']>>;
  volume?: InputMaybe<Scalars['BigInt']>;
  volume_not?: InputMaybe<Scalars['BigInt']>;
  volume_gt?: InputMaybe<Scalars['BigInt']>;
  volume_lt?: InputMaybe<Scalars['BigInt']>;
  volume_gte?: InputMaybe<Scalars['BigInt']>;
  volume_lte?: InputMaybe<Scalars['BigInt']>;
  volume_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creatorsEarnings?: InputMaybe<Scalars['BigInt']>;
  creatorsEarnings_not?: InputMaybe<Scalars['BigInt']>;
  creatorsEarnings_gt?: InputMaybe<Scalars['BigInt']>;
  creatorsEarnings_lt?: InputMaybe<Scalars['BigInt']>;
  creatorsEarnings_gte?: InputMaybe<Scalars['BigInt']>;
  creatorsEarnings_lte?: InputMaybe<Scalars['BigInt']>;
  creatorsEarnings_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creatorsEarnings_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  daoEarnings?: InputMaybe<Scalars['BigInt']>;
  daoEarnings_not?: InputMaybe<Scalars['BigInt']>;
  daoEarnings_gt?: InputMaybe<Scalars['BigInt']>;
  daoEarnings_lt?: InputMaybe<Scalars['BigInt']>;
  daoEarnings_gte?: InputMaybe<Scalars['BigInt']>;
  daoEarnings_lte?: InputMaybe<Scalars['BigInt']>;
  daoEarnings_in?: InputMaybe<Array<Scalars['BigInt']>>;
  daoEarnings_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AnalyticsDayData_filter>>>;
  or?: InputMaybe<Array<InputMaybe<AnalyticsDayData_filter>>>;
};

export type AnalyticsDayData_orderBy =
  | 'id'
  | 'date'
  | 'sales'
  | 'volume'
  | 'creatorsEarnings'
  | 'daoEarnings';

export type Bid = {
  id: Scalars['ID'];
  bidAddress: Scalars['Bytes'];
  category: Category;
  nft?: Maybe<NFT>;
  nftAddress: Scalars['Bytes'];
  tokenId: Scalars['BigInt'];
  bidder?: Maybe<Scalars['Bytes']>;
  seller?: Maybe<Scalars['Bytes']>;
  price: Scalars['BigInt'];
  fingerprint?: Maybe<Scalars['Bytes']>;
  status: OrderStatus;
  blockchainId: Scalars['String'];
  blockNumber: Scalars['BigInt'];
  expiresAt: Scalars['BigInt'];
  createdAt: Scalars['BigInt'];
  updatedAt: Scalars['BigInt'];
};

export type Bid_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  bidAddress?: InputMaybe<Scalars['Bytes']>;
  bidAddress_not?: InputMaybe<Scalars['Bytes']>;
  bidAddress_gt?: InputMaybe<Scalars['Bytes']>;
  bidAddress_lt?: InputMaybe<Scalars['Bytes']>;
  bidAddress_gte?: InputMaybe<Scalars['Bytes']>;
  bidAddress_lte?: InputMaybe<Scalars['Bytes']>;
  bidAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  bidAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  bidAddress_contains?: InputMaybe<Scalars['Bytes']>;
  bidAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  category?: InputMaybe<Category>;
  category_not?: InputMaybe<Category>;
  category_in?: InputMaybe<Array<Category>>;
  category_not_in?: InputMaybe<Array<Category>>;
  nft?: InputMaybe<Scalars['String']>;
  nft_not?: InputMaybe<Scalars['String']>;
  nft_gt?: InputMaybe<Scalars['String']>;
  nft_lt?: InputMaybe<Scalars['String']>;
  nft_gte?: InputMaybe<Scalars['String']>;
  nft_lte?: InputMaybe<Scalars['String']>;
  nft_in?: InputMaybe<Array<Scalars['String']>>;
  nft_not_in?: InputMaybe<Array<Scalars['String']>>;
  nft_contains?: InputMaybe<Scalars['String']>;
  nft_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_not_contains?: InputMaybe<Scalars['String']>;
  nft_not_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_starts_with?: InputMaybe<Scalars['String']>;
  nft_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_starts_with?: InputMaybe<Scalars['String']>;
  nft_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_ends_with?: InputMaybe<Scalars['String']>;
  nft_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_ends_with?: InputMaybe<Scalars['String']>;
  nft_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_?: InputMaybe<NFT_filter>;
  nftAddress?: InputMaybe<Scalars['Bytes']>;
  nftAddress_not?: InputMaybe<Scalars['Bytes']>;
  nftAddress_gt?: InputMaybe<Scalars['Bytes']>;
  nftAddress_lt?: InputMaybe<Scalars['Bytes']>;
  nftAddress_gte?: InputMaybe<Scalars['Bytes']>;
  nftAddress_lte?: InputMaybe<Scalars['Bytes']>;
  nftAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  nftAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  nftAddress_contains?: InputMaybe<Scalars['Bytes']>;
  nftAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bidder?: InputMaybe<Scalars['Bytes']>;
  bidder_not?: InputMaybe<Scalars['Bytes']>;
  bidder_gt?: InputMaybe<Scalars['Bytes']>;
  bidder_lt?: InputMaybe<Scalars['Bytes']>;
  bidder_gte?: InputMaybe<Scalars['Bytes']>;
  bidder_lte?: InputMaybe<Scalars['Bytes']>;
  bidder_in?: InputMaybe<Array<Scalars['Bytes']>>;
  bidder_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  bidder_contains?: InputMaybe<Scalars['Bytes']>;
  bidder_not_contains?: InputMaybe<Scalars['Bytes']>;
  seller?: InputMaybe<Scalars['Bytes']>;
  seller_not?: InputMaybe<Scalars['Bytes']>;
  seller_gt?: InputMaybe<Scalars['Bytes']>;
  seller_lt?: InputMaybe<Scalars['Bytes']>;
  seller_gte?: InputMaybe<Scalars['Bytes']>;
  seller_lte?: InputMaybe<Scalars['Bytes']>;
  seller_in?: InputMaybe<Array<Scalars['Bytes']>>;
  seller_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  seller_contains?: InputMaybe<Scalars['Bytes']>;
  seller_not_contains?: InputMaybe<Scalars['Bytes']>;
  price?: InputMaybe<Scalars['BigInt']>;
  price_not?: InputMaybe<Scalars['BigInt']>;
  price_gt?: InputMaybe<Scalars['BigInt']>;
  price_lt?: InputMaybe<Scalars['BigInt']>;
  price_gte?: InputMaybe<Scalars['BigInt']>;
  price_lte?: InputMaybe<Scalars['BigInt']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fingerprint?: InputMaybe<Scalars['Bytes']>;
  fingerprint_not?: InputMaybe<Scalars['Bytes']>;
  fingerprint_gt?: InputMaybe<Scalars['Bytes']>;
  fingerprint_lt?: InputMaybe<Scalars['Bytes']>;
  fingerprint_gte?: InputMaybe<Scalars['Bytes']>;
  fingerprint_lte?: InputMaybe<Scalars['Bytes']>;
  fingerprint_in?: InputMaybe<Array<Scalars['Bytes']>>;
  fingerprint_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  fingerprint_contains?: InputMaybe<Scalars['Bytes']>;
  fingerprint_not_contains?: InputMaybe<Scalars['Bytes']>;
  status?: InputMaybe<OrderStatus>;
  status_not?: InputMaybe<OrderStatus>;
  status_in?: InputMaybe<Array<OrderStatus>>;
  status_not_in?: InputMaybe<Array<OrderStatus>>;
  blockchainId?: InputMaybe<Scalars['String']>;
  blockchainId_not?: InputMaybe<Scalars['String']>;
  blockchainId_gt?: InputMaybe<Scalars['String']>;
  blockchainId_lt?: InputMaybe<Scalars['String']>;
  blockchainId_gte?: InputMaybe<Scalars['String']>;
  blockchainId_lte?: InputMaybe<Scalars['String']>;
  blockchainId_in?: InputMaybe<Array<Scalars['String']>>;
  blockchainId_not_in?: InputMaybe<Array<Scalars['String']>>;
  blockchainId_contains?: InputMaybe<Scalars['String']>;
  blockchainId_contains_nocase?: InputMaybe<Scalars['String']>;
  blockchainId_not_contains?: InputMaybe<Scalars['String']>;
  blockchainId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  blockchainId_starts_with?: InputMaybe<Scalars['String']>;
  blockchainId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  blockchainId_not_starts_with?: InputMaybe<Scalars['String']>;
  blockchainId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  blockchainId_ends_with?: InputMaybe<Scalars['String']>;
  blockchainId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockchainId_not_ends_with?: InputMaybe<Scalars['String']>;
  blockchainId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiresAt?: InputMaybe<Scalars['BigInt']>;
  expiresAt_not?: InputMaybe<Scalars['BigInt']>;
  expiresAt_gt?: InputMaybe<Scalars['BigInt']>;
  expiresAt_lt?: InputMaybe<Scalars['BigInt']>;
  expiresAt_gte?: InputMaybe<Scalars['BigInt']>;
  expiresAt_lte?: InputMaybe<Scalars['BigInt']>;
  expiresAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiresAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Bid_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Bid_filter>>>;
};

export type Bid_orderBy =
  | 'id'
  | 'bidAddress'
  | 'category'
  | 'nft'
  | 'nft__id'
  | 'nft__tokenId'
  | 'nft__contractAddress'
  | 'nft__category'
  | 'nft__tokenURI'
  | 'nft__name'
  | 'nft__image'
  | 'nft__createdAt'
  | 'nft__updatedAt'
  | 'nft__soldAt'
  | 'nft__transferredAt'
  | 'nft__sales'
  | 'nft__volume'
  | 'nft__searchOrderStatus'
  | 'nft__searchOrderPrice'
  | 'nft__searchOrderExpiresAt'
  | 'nft__searchOrderCreatedAt'
  | 'nft__searchIsLand'
  | 'nft__searchText'
  | 'nft__searchParcelIsInBounds'
  | 'nft__searchParcelX'
  | 'nft__searchParcelY'
  | 'nft__searchParcelEstateId'
  | 'nft__searchDistanceToPlaza'
  | 'nft__searchAdjacentToRoad'
  | 'nft__searchEstateSize'
  | 'nft__searchIsWearableHead'
  | 'nft__searchIsWearableAccessory'
  | 'nft__searchWearableRarity'
  | 'nft__searchWearableCategory'
  | 'nftAddress'
  | 'tokenId'
  | 'bidder'
  | 'seller'
  | 'price'
  | 'fingerprint'
  | 'status'
  | 'blockchainId'
  | 'blockNumber'
  | 'expiresAt'
  | 'createdAt'
  | 'updatedAt'
  | 'nft__itemBlockchainId'
  | 'nft__issuedId'
  | 'nft__itemType'
  | 'nft__urn'
  | 'nft__searchItemType'
  | 'nft__searchEmoteCategory'
  | 'nft__searchEmoteLoop'
  | 'nft__searchEmoteRarity';

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Category =
  | 'parcel'
  | 'estate'
  | 'wearable'
  | 'ens';

export type Count = {
  id: Scalars['ID'];
  orderTotal: Scalars['Int'];
  orderParcel: Scalars['Int'];
  orderEstate: Scalars['Int'];
  orderWearable: Scalars['Int'];
  orderENS: Scalars['Int'];
  parcelTotal: Scalars['Int'];
  estateTotal: Scalars['Int'];
  wearableTotal: Scalars['Int'];
  ensTotal: Scalars['Int'];
  started: Scalars['Int'];
  salesTotal: Scalars['Int'];
  salesManaTotal: Scalars['BigInt'];
  creatorEarningsManaTotal: Scalars['BigInt'];
  daoEarningsManaTotal: Scalars['BigInt'];
  bidTotal: Scalars['Int'];
  collectionTotal: Scalars['Int'];
  itemTotal: Scalars['Int'];
  nftTotal: Scalars['Int'];
  primarySalesTotal: Scalars['Int'];
  primarySalesManaTotal: Scalars['BigInt'];
  secondarySalesTotal: Scalars['Int'];
  secondarySalesManaTotal: Scalars['BigInt'];
  royaltiesManaTotal: Scalars['BigInt'];
};

export type Count_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  orderTotal?: InputMaybe<Scalars['Int']>;
  orderTotal_not?: InputMaybe<Scalars['Int']>;
  orderTotal_gt?: InputMaybe<Scalars['Int']>;
  orderTotal_lt?: InputMaybe<Scalars['Int']>;
  orderTotal_gte?: InputMaybe<Scalars['Int']>;
  orderTotal_lte?: InputMaybe<Scalars['Int']>;
  orderTotal_in?: InputMaybe<Array<Scalars['Int']>>;
  orderTotal_not_in?: InputMaybe<Array<Scalars['Int']>>;
  orderParcel?: InputMaybe<Scalars['Int']>;
  orderParcel_not?: InputMaybe<Scalars['Int']>;
  orderParcel_gt?: InputMaybe<Scalars['Int']>;
  orderParcel_lt?: InputMaybe<Scalars['Int']>;
  orderParcel_gte?: InputMaybe<Scalars['Int']>;
  orderParcel_lte?: InputMaybe<Scalars['Int']>;
  orderParcel_in?: InputMaybe<Array<Scalars['Int']>>;
  orderParcel_not_in?: InputMaybe<Array<Scalars['Int']>>;
  orderEstate?: InputMaybe<Scalars['Int']>;
  orderEstate_not?: InputMaybe<Scalars['Int']>;
  orderEstate_gt?: InputMaybe<Scalars['Int']>;
  orderEstate_lt?: InputMaybe<Scalars['Int']>;
  orderEstate_gte?: InputMaybe<Scalars['Int']>;
  orderEstate_lte?: InputMaybe<Scalars['Int']>;
  orderEstate_in?: InputMaybe<Array<Scalars['Int']>>;
  orderEstate_not_in?: InputMaybe<Array<Scalars['Int']>>;
  orderWearable?: InputMaybe<Scalars['Int']>;
  orderWearable_not?: InputMaybe<Scalars['Int']>;
  orderWearable_gt?: InputMaybe<Scalars['Int']>;
  orderWearable_lt?: InputMaybe<Scalars['Int']>;
  orderWearable_gte?: InputMaybe<Scalars['Int']>;
  orderWearable_lte?: InputMaybe<Scalars['Int']>;
  orderWearable_in?: InputMaybe<Array<Scalars['Int']>>;
  orderWearable_not_in?: InputMaybe<Array<Scalars['Int']>>;
  orderENS?: InputMaybe<Scalars['Int']>;
  orderENS_not?: InputMaybe<Scalars['Int']>;
  orderENS_gt?: InputMaybe<Scalars['Int']>;
  orderENS_lt?: InputMaybe<Scalars['Int']>;
  orderENS_gte?: InputMaybe<Scalars['Int']>;
  orderENS_lte?: InputMaybe<Scalars['Int']>;
  orderENS_in?: InputMaybe<Array<Scalars['Int']>>;
  orderENS_not_in?: InputMaybe<Array<Scalars['Int']>>;
  parcelTotal?: InputMaybe<Scalars['Int']>;
  parcelTotal_not?: InputMaybe<Scalars['Int']>;
  parcelTotal_gt?: InputMaybe<Scalars['Int']>;
  parcelTotal_lt?: InputMaybe<Scalars['Int']>;
  parcelTotal_gte?: InputMaybe<Scalars['Int']>;
  parcelTotal_lte?: InputMaybe<Scalars['Int']>;
  parcelTotal_in?: InputMaybe<Array<Scalars['Int']>>;
  parcelTotal_not_in?: InputMaybe<Array<Scalars['Int']>>;
  estateTotal?: InputMaybe<Scalars['Int']>;
  estateTotal_not?: InputMaybe<Scalars['Int']>;
  estateTotal_gt?: InputMaybe<Scalars['Int']>;
  estateTotal_lt?: InputMaybe<Scalars['Int']>;
  estateTotal_gte?: InputMaybe<Scalars['Int']>;
  estateTotal_lte?: InputMaybe<Scalars['Int']>;
  estateTotal_in?: InputMaybe<Array<Scalars['Int']>>;
  estateTotal_not_in?: InputMaybe<Array<Scalars['Int']>>;
  wearableTotal?: InputMaybe<Scalars['Int']>;
  wearableTotal_not?: InputMaybe<Scalars['Int']>;
  wearableTotal_gt?: InputMaybe<Scalars['Int']>;
  wearableTotal_lt?: InputMaybe<Scalars['Int']>;
  wearableTotal_gte?: InputMaybe<Scalars['Int']>;
  wearableTotal_lte?: InputMaybe<Scalars['Int']>;
  wearableTotal_in?: InputMaybe<Array<Scalars['Int']>>;
  wearableTotal_not_in?: InputMaybe<Array<Scalars['Int']>>;
  ensTotal?: InputMaybe<Scalars['Int']>;
  ensTotal_not?: InputMaybe<Scalars['Int']>;
  ensTotal_gt?: InputMaybe<Scalars['Int']>;
  ensTotal_lt?: InputMaybe<Scalars['Int']>;
  ensTotal_gte?: InputMaybe<Scalars['Int']>;
  ensTotal_lte?: InputMaybe<Scalars['Int']>;
  ensTotal_in?: InputMaybe<Array<Scalars['Int']>>;
  ensTotal_not_in?: InputMaybe<Array<Scalars['Int']>>;
  started?: InputMaybe<Scalars['Int']>;
  started_not?: InputMaybe<Scalars['Int']>;
  started_gt?: InputMaybe<Scalars['Int']>;
  started_lt?: InputMaybe<Scalars['Int']>;
  started_gte?: InputMaybe<Scalars['Int']>;
  started_lte?: InputMaybe<Scalars['Int']>;
  started_in?: InputMaybe<Array<Scalars['Int']>>;
  started_not_in?: InputMaybe<Array<Scalars['Int']>>;
  salesTotal?: InputMaybe<Scalars['Int']>;
  salesTotal_not?: InputMaybe<Scalars['Int']>;
  salesTotal_gt?: InputMaybe<Scalars['Int']>;
  salesTotal_lt?: InputMaybe<Scalars['Int']>;
  salesTotal_gte?: InputMaybe<Scalars['Int']>;
  salesTotal_lte?: InputMaybe<Scalars['Int']>;
  salesTotal_in?: InputMaybe<Array<Scalars['Int']>>;
  salesTotal_not_in?: InputMaybe<Array<Scalars['Int']>>;
  salesManaTotal?: InputMaybe<Scalars['BigInt']>;
  salesManaTotal_not?: InputMaybe<Scalars['BigInt']>;
  salesManaTotal_gt?: InputMaybe<Scalars['BigInt']>;
  salesManaTotal_lt?: InputMaybe<Scalars['BigInt']>;
  salesManaTotal_gte?: InputMaybe<Scalars['BigInt']>;
  salesManaTotal_lte?: InputMaybe<Scalars['BigInt']>;
  salesManaTotal_in?: InputMaybe<Array<Scalars['BigInt']>>;
  salesManaTotal_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creatorEarningsManaTotal?: InputMaybe<Scalars['BigInt']>;
  creatorEarningsManaTotal_not?: InputMaybe<Scalars['BigInt']>;
  creatorEarningsManaTotal_gt?: InputMaybe<Scalars['BigInt']>;
  creatorEarningsManaTotal_lt?: InputMaybe<Scalars['BigInt']>;
  creatorEarningsManaTotal_gte?: InputMaybe<Scalars['BigInt']>;
  creatorEarningsManaTotal_lte?: InputMaybe<Scalars['BigInt']>;
  creatorEarningsManaTotal_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creatorEarningsManaTotal_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  daoEarningsManaTotal?: InputMaybe<Scalars['BigInt']>;
  daoEarningsManaTotal_not?: InputMaybe<Scalars['BigInt']>;
  daoEarningsManaTotal_gt?: InputMaybe<Scalars['BigInt']>;
  daoEarningsManaTotal_lt?: InputMaybe<Scalars['BigInt']>;
  daoEarningsManaTotal_gte?: InputMaybe<Scalars['BigInt']>;
  daoEarningsManaTotal_lte?: InputMaybe<Scalars['BigInt']>;
  daoEarningsManaTotal_in?: InputMaybe<Array<Scalars['BigInt']>>;
  daoEarningsManaTotal_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Count_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Count_filter>>>;
  bidTotal?: InputMaybe<Scalars['Int']>;
  bidTotal_not?: InputMaybe<Scalars['Int']>;
  bidTotal_gt?: InputMaybe<Scalars['Int']>;
  bidTotal_lt?: InputMaybe<Scalars['Int']>;
  bidTotal_gte?: InputMaybe<Scalars['Int']>;
  bidTotal_lte?: InputMaybe<Scalars['Int']>;
  bidTotal_in?: InputMaybe<Array<Scalars['Int']>>;
  bidTotal_not_in?: InputMaybe<Array<Scalars['Int']>>;
  collectionTotal?: InputMaybe<Scalars['Int']>;
  collectionTotal_not?: InputMaybe<Scalars['Int']>;
  collectionTotal_gt?: InputMaybe<Scalars['Int']>;
  collectionTotal_lt?: InputMaybe<Scalars['Int']>;
  collectionTotal_gte?: InputMaybe<Scalars['Int']>;
  collectionTotal_lte?: InputMaybe<Scalars['Int']>;
  collectionTotal_in?: InputMaybe<Array<Scalars['Int']>>;
  collectionTotal_not_in?: InputMaybe<Array<Scalars['Int']>>;
  itemTotal?: InputMaybe<Scalars['Int']>;
  itemTotal_not?: InputMaybe<Scalars['Int']>;
  itemTotal_gt?: InputMaybe<Scalars['Int']>;
  itemTotal_lt?: InputMaybe<Scalars['Int']>;
  itemTotal_gte?: InputMaybe<Scalars['Int']>;
  itemTotal_lte?: InputMaybe<Scalars['Int']>;
  itemTotal_in?: InputMaybe<Array<Scalars['Int']>>;
  itemTotal_not_in?: InputMaybe<Array<Scalars['Int']>>;
  nftTotal?: InputMaybe<Scalars['Int']>;
  nftTotal_not?: InputMaybe<Scalars['Int']>;
  nftTotal_gt?: InputMaybe<Scalars['Int']>;
  nftTotal_lt?: InputMaybe<Scalars['Int']>;
  nftTotal_gte?: InputMaybe<Scalars['Int']>;
  nftTotal_lte?: InputMaybe<Scalars['Int']>;
  nftTotal_in?: InputMaybe<Array<Scalars['Int']>>;
  nftTotal_not_in?: InputMaybe<Array<Scalars['Int']>>;
  primarySalesTotal?: InputMaybe<Scalars['Int']>;
  primarySalesTotal_not?: InputMaybe<Scalars['Int']>;
  primarySalesTotal_gt?: InputMaybe<Scalars['Int']>;
  primarySalesTotal_lt?: InputMaybe<Scalars['Int']>;
  primarySalesTotal_gte?: InputMaybe<Scalars['Int']>;
  primarySalesTotal_lte?: InputMaybe<Scalars['Int']>;
  primarySalesTotal_in?: InputMaybe<Array<Scalars['Int']>>;
  primarySalesTotal_not_in?: InputMaybe<Array<Scalars['Int']>>;
  primarySalesManaTotal?: InputMaybe<Scalars['BigInt']>;
  primarySalesManaTotal_not?: InputMaybe<Scalars['BigInt']>;
  primarySalesManaTotal_gt?: InputMaybe<Scalars['BigInt']>;
  primarySalesManaTotal_lt?: InputMaybe<Scalars['BigInt']>;
  primarySalesManaTotal_gte?: InputMaybe<Scalars['BigInt']>;
  primarySalesManaTotal_lte?: InputMaybe<Scalars['BigInt']>;
  primarySalesManaTotal_in?: InputMaybe<Array<Scalars['BigInt']>>;
  primarySalesManaTotal_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  secondarySalesTotal?: InputMaybe<Scalars['Int']>;
  secondarySalesTotal_not?: InputMaybe<Scalars['Int']>;
  secondarySalesTotal_gt?: InputMaybe<Scalars['Int']>;
  secondarySalesTotal_lt?: InputMaybe<Scalars['Int']>;
  secondarySalesTotal_gte?: InputMaybe<Scalars['Int']>;
  secondarySalesTotal_lte?: InputMaybe<Scalars['Int']>;
  secondarySalesTotal_in?: InputMaybe<Array<Scalars['Int']>>;
  secondarySalesTotal_not_in?: InputMaybe<Array<Scalars['Int']>>;
  secondarySalesManaTotal?: InputMaybe<Scalars['BigInt']>;
  secondarySalesManaTotal_not?: InputMaybe<Scalars['BigInt']>;
  secondarySalesManaTotal_gt?: InputMaybe<Scalars['BigInt']>;
  secondarySalesManaTotal_lt?: InputMaybe<Scalars['BigInt']>;
  secondarySalesManaTotal_gte?: InputMaybe<Scalars['BigInt']>;
  secondarySalesManaTotal_lte?: InputMaybe<Scalars['BigInt']>;
  secondarySalesManaTotal_in?: InputMaybe<Array<Scalars['BigInt']>>;
  secondarySalesManaTotal_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  royaltiesManaTotal?: InputMaybe<Scalars['BigInt']>;
  royaltiesManaTotal_not?: InputMaybe<Scalars['BigInt']>;
  royaltiesManaTotal_gt?: InputMaybe<Scalars['BigInt']>;
  royaltiesManaTotal_lt?: InputMaybe<Scalars['BigInt']>;
  royaltiesManaTotal_gte?: InputMaybe<Scalars['BigInt']>;
  royaltiesManaTotal_lte?: InputMaybe<Scalars['BigInt']>;
  royaltiesManaTotal_in?: InputMaybe<Array<Scalars['BigInt']>>;
  royaltiesManaTotal_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type Count_orderBy =
  | 'id'
  | 'orderTotal'
  | 'orderParcel'
  | 'orderEstate'
  | 'orderWearable'
  | 'orderENS'
  | 'parcelTotal'
  | 'estateTotal'
  | 'wearableTotal'
  | 'ensTotal'
  | 'started'
  | 'salesTotal'
  | 'salesManaTotal'
  | 'creatorEarningsManaTotal'
  | 'daoEarningsManaTotal'
  | 'bidTotal'
  | 'collectionTotal'
  | 'itemTotal'
  | 'nftTotal'
  | 'primarySalesTotal'
  | 'primarySalesManaTotal'
  | 'secondarySalesTotal'
  | 'secondarySalesManaTotal'
  | 'royaltiesManaTotal';

export type Data = {
  id: Scalars['ID'];
  parcel?: Maybe<Parcel>;
  estate?: Maybe<Estate>;
  version: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  ipns?: Maybe<Scalars['String']>;
};

export type Data_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  parcel?: InputMaybe<Scalars['String']>;
  parcel_not?: InputMaybe<Scalars['String']>;
  parcel_gt?: InputMaybe<Scalars['String']>;
  parcel_lt?: InputMaybe<Scalars['String']>;
  parcel_gte?: InputMaybe<Scalars['String']>;
  parcel_lte?: InputMaybe<Scalars['String']>;
  parcel_in?: InputMaybe<Array<Scalars['String']>>;
  parcel_not_in?: InputMaybe<Array<Scalars['String']>>;
  parcel_contains?: InputMaybe<Scalars['String']>;
  parcel_contains_nocase?: InputMaybe<Scalars['String']>;
  parcel_not_contains?: InputMaybe<Scalars['String']>;
  parcel_not_contains_nocase?: InputMaybe<Scalars['String']>;
  parcel_starts_with?: InputMaybe<Scalars['String']>;
  parcel_starts_with_nocase?: InputMaybe<Scalars['String']>;
  parcel_not_starts_with?: InputMaybe<Scalars['String']>;
  parcel_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  parcel_ends_with?: InputMaybe<Scalars['String']>;
  parcel_ends_with_nocase?: InputMaybe<Scalars['String']>;
  parcel_not_ends_with?: InputMaybe<Scalars['String']>;
  parcel_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  parcel_?: InputMaybe<Parcel_filter>;
  estate?: InputMaybe<Scalars['String']>;
  estate_not?: InputMaybe<Scalars['String']>;
  estate_gt?: InputMaybe<Scalars['String']>;
  estate_lt?: InputMaybe<Scalars['String']>;
  estate_gte?: InputMaybe<Scalars['String']>;
  estate_lte?: InputMaybe<Scalars['String']>;
  estate_in?: InputMaybe<Array<Scalars['String']>>;
  estate_not_in?: InputMaybe<Array<Scalars['String']>>;
  estate_contains?: InputMaybe<Scalars['String']>;
  estate_contains_nocase?: InputMaybe<Scalars['String']>;
  estate_not_contains?: InputMaybe<Scalars['String']>;
  estate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  estate_starts_with?: InputMaybe<Scalars['String']>;
  estate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  estate_not_starts_with?: InputMaybe<Scalars['String']>;
  estate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  estate_ends_with?: InputMaybe<Scalars['String']>;
  estate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  estate_not_ends_with?: InputMaybe<Scalars['String']>;
  estate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  estate_?: InputMaybe<Estate_filter>;
  version?: InputMaybe<Scalars['String']>;
  version_not?: InputMaybe<Scalars['String']>;
  version_gt?: InputMaybe<Scalars['String']>;
  version_lt?: InputMaybe<Scalars['String']>;
  version_gte?: InputMaybe<Scalars['String']>;
  version_lte?: InputMaybe<Scalars['String']>;
  version_in?: InputMaybe<Array<Scalars['String']>>;
  version_not_in?: InputMaybe<Array<Scalars['String']>>;
  version_contains?: InputMaybe<Scalars['String']>;
  version_contains_nocase?: InputMaybe<Scalars['String']>;
  version_not_contains?: InputMaybe<Scalars['String']>;
  version_not_contains_nocase?: InputMaybe<Scalars['String']>;
  version_starts_with?: InputMaybe<Scalars['String']>;
  version_starts_with_nocase?: InputMaybe<Scalars['String']>;
  version_not_starts_with?: InputMaybe<Scalars['String']>;
  version_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  version_ends_with?: InputMaybe<Scalars['String']>;
  version_ends_with_nocase?: InputMaybe<Scalars['String']>;
  version_not_ends_with?: InputMaybe<Scalars['String']>;
  version_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  description_not?: InputMaybe<Scalars['String']>;
  description_gt?: InputMaybe<Scalars['String']>;
  description_lt?: InputMaybe<Scalars['String']>;
  description_gte?: InputMaybe<Scalars['String']>;
  description_lte?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<Scalars['String']>>;
  description_not_in?: InputMaybe<Array<Scalars['String']>>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_contains_nocase?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  ipns?: InputMaybe<Scalars['String']>;
  ipns_not?: InputMaybe<Scalars['String']>;
  ipns_gt?: InputMaybe<Scalars['String']>;
  ipns_lt?: InputMaybe<Scalars['String']>;
  ipns_gte?: InputMaybe<Scalars['String']>;
  ipns_lte?: InputMaybe<Scalars['String']>;
  ipns_in?: InputMaybe<Array<Scalars['String']>>;
  ipns_not_in?: InputMaybe<Array<Scalars['String']>>;
  ipns_contains?: InputMaybe<Scalars['String']>;
  ipns_contains_nocase?: InputMaybe<Scalars['String']>;
  ipns_not_contains?: InputMaybe<Scalars['String']>;
  ipns_not_contains_nocase?: InputMaybe<Scalars['String']>;
  ipns_starts_with?: InputMaybe<Scalars['String']>;
  ipns_starts_with_nocase?: InputMaybe<Scalars['String']>;
  ipns_not_starts_with?: InputMaybe<Scalars['String']>;
  ipns_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  ipns_ends_with?: InputMaybe<Scalars['String']>;
  ipns_ends_with_nocase?: InputMaybe<Scalars['String']>;
  ipns_not_ends_with?: InputMaybe<Scalars['String']>;
  ipns_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Data_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Data_filter>>>;
};

export type Data_orderBy =
  | 'id'
  | 'parcel'
  | 'parcel__id'
  | 'parcel__tokenId'
  | 'parcel__x'
  | 'parcel__y'
  | 'parcel__rawData'
  | 'estate'
  | 'estate__id'
  | 'estate__tokenId'
  | 'estate__adjacentToRoadCount'
  | 'estate__size'
  | 'estate__rawData'
  | 'version'
  | 'name'
  | 'description'
  | 'ipns';

export type ENS = {
  id: Scalars['ID'];
  tokenId: Scalars['BigInt'];
  owner: Account;
  caller?: Maybe<Scalars['Bytes']>;
  beneficiary?: Maybe<Scalars['Bytes']>;
  labelHash?: Maybe<Scalars['Bytes']>;
  subdomain?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['BigInt']>;
  nft?: Maybe<NFT>;
};

export type ENS_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  owner?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<Account_filter>;
  caller?: InputMaybe<Scalars['Bytes']>;
  caller_not?: InputMaybe<Scalars['Bytes']>;
  caller_gt?: InputMaybe<Scalars['Bytes']>;
  caller_lt?: InputMaybe<Scalars['Bytes']>;
  caller_gte?: InputMaybe<Scalars['Bytes']>;
  caller_lte?: InputMaybe<Scalars['Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  caller_contains?: InputMaybe<Scalars['Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['Bytes']>;
  beneficiary?: InputMaybe<Scalars['Bytes']>;
  beneficiary_not?: InputMaybe<Scalars['Bytes']>;
  beneficiary_gt?: InputMaybe<Scalars['Bytes']>;
  beneficiary_lt?: InputMaybe<Scalars['Bytes']>;
  beneficiary_gte?: InputMaybe<Scalars['Bytes']>;
  beneficiary_lte?: InputMaybe<Scalars['Bytes']>;
  beneficiary_in?: InputMaybe<Array<Scalars['Bytes']>>;
  beneficiary_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  beneficiary_contains?: InputMaybe<Scalars['Bytes']>;
  beneficiary_not_contains?: InputMaybe<Scalars['Bytes']>;
  labelHash?: InputMaybe<Scalars['Bytes']>;
  labelHash_not?: InputMaybe<Scalars['Bytes']>;
  labelHash_gt?: InputMaybe<Scalars['Bytes']>;
  labelHash_lt?: InputMaybe<Scalars['Bytes']>;
  labelHash_gte?: InputMaybe<Scalars['Bytes']>;
  labelHash_lte?: InputMaybe<Scalars['Bytes']>;
  labelHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  labelHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  labelHash_contains?: InputMaybe<Scalars['Bytes']>;
  labelHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  subdomain?: InputMaybe<Scalars['String']>;
  subdomain_not?: InputMaybe<Scalars['String']>;
  subdomain_gt?: InputMaybe<Scalars['String']>;
  subdomain_lt?: InputMaybe<Scalars['String']>;
  subdomain_gte?: InputMaybe<Scalars['String']>;
  subdomain_lte?: InputMaybe<Scalars['String']>;
  subdomain_in?: InputMaybe<Array<Scalars['String']>>;
  subdomain_not_in?: InputMaybe<Array<Scalars['String']>>;
  subdomain_contains?: InputMaybe<Scalars['String']>;
  subdomain_contains_nocase?: InputMaybe<Scalars['String']>;
  subdomain_not_contains?: InputMaybe<Scalars['String']>;
  subdomain_not_contains_nocase?: InputMaybe<Scalars['String']>;
  subdomain_starts_with?: InputMaybe<Scalars['String']>;
  subdomain_starts_with_nocase?: InputMaybe<Scalars['String']>;
  subdomain_not_starts_with?: InputMaybe<Scalars['String']>;
  subdomain_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  subdomain_ends_with?: InputMaybe<Scalars['String']>;
  subdomain_ends_with_nocase?: InputMaybe<Scalars['String']>;
  subdomain_not_ends_with?: InputMaybe<Scalars['String']>;
  subdomain_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nft_?: InputMaybe<NFT_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ENS_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ENS_filter>>>;
};

export type ENS_orderBy =
  | 'id'
  | 'tokenId'
  | 'owner'
  | 'owner__id'
  | 'owner__address'
  | 'owner__sales'
  | 'owner__purchases'
  | 'owner__spent'
  | 'owner__earned'
  | 'caller'
  | 'beneficiary'
  | 'labelHash'
  | 'subdomain'
  | 'createdAt'
  | 'nft'
  | 'nft__id'
  | 'nft__tokenId'
  | 'nft__contractAddress'
  | 'nft__category'
  | 'nft__tokenURI'
  | 'nft__name'
  | 'nft__image'
  | 'nft__createdAt'
  | 'nft__updatedAt'
  | 'nft__soldAt'
  | 'nft__transferredAt'
  | 'nft__sales'
  | 'nft__volume'
  | 'nft__searchOrderStatus'
  | 'nft__searchOrderPrice'
  | 'nft__searchOrderExpiresAt'
  | 'nft__searchOrderCreatedAt'
  | 'nft__searchIsLand'
  | 'nft__searchText'
  | 'nft__searchParcelIsInBounds'
  | 'nft__searchParcelX'
  | 'nft__searchParcelY'
  | 'nft__searchParcelEstateId'
  | 'nft__searchDistanceToPlaza'
  | 'nft__searchAdjacentToRoad'
  | 'nft__searchEstateSize'
  | 'nft__searchIsWearableHead'
  | 'nft__searchIsWearableAccessory'
  | 'nft__searchWearableRarity'
  | 'nft__searchWearableCategory';

export type Estate = {
  id: Scalars['ID'];
  tokenId: Scalars['BigInt'];
  owner: Account;
  parcels: Array<Parcel>;
  parcelDistances?: Maybe<Array<Scalars['Int']>>;
  adjacentToRoadCount?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  data?: Maybe<Data>;
  rawData?: Maybe<Scalars['String']>;
  nft?: Maybe<NFT>;
};


export type EstateparcelsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Parcel_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Parcel_filter>;
};

export type Estate_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  owner?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<Account_filter>;
  parcels_?: InputMaybe<Parcel_filter>;
  parcelDistances?: InputMaybe<Array<Scalars['Int']>>;
  parcelDistances_not?: InputMaybe<Array<Scalars['Int']>>;
  parcelDistances_contains?: InputMaybe<Array<Scalars['Int']>>;
  parcelDistances_contains_nocase?: InputMaybe<Array<Scalars['Int']>>;
  parcelDistances_not_contains?: InputMaybe<Array<Scalars['Int']>>;
  parcelDistances_not_contains_nocase?: InputMaybe<Array<Scalars['Int']>>;
  adjacentToRoadCount?: InputMaybe<Scalars['Int']>;
  adjacentToRoadCount_not?: InputMaybe<Scalars['Int']>;
  adjacentToRoadCount_gt?: InputMaybe<Scalars['Int']>;
  adjacentToRoadCount_lt?: InputMaybe<Scalars['Int']>;
  adjacentToRoadCount_gte?: InputMaybe<Scalars['Int']>;
  adjacentToRoadCount_lte?: InputMaybe<Scalars['Int']>;
  adjacentToRoadCount_in?: InputMaybe<Array<Scalars['Int']>>;
  adjacentToRoadCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  size?: InputMaybe<Scalars['Int']>;
  size_not?: InputMaybe<Scalars['Int']>;
  size_gt?: InputMaybe<Scalars['Int']>;
  size_lt?: InputMaybe<Scalars['Int']>;
  size_gte?: InputMaybe<Scalars['Int']>;
  size_lte?: InputMaybe<Scalars['Int']>;
  size_in?: InputMaybe<Array<Scalars['Int']>>;
  size_not_in?: InputMaybe<Array<Scalars['Int']>>;
  data?: InputMaybe<Scalars['String']>;
  data_not?: InputMaybe<Scalars['String']>;
  data_gt?: InputMaybe<Scalars['String']>;
  data_lt?: InputMaybe<Scalars['String']>;
  data_gte?: InputMaybe<Scalars['String']>;
  data_lte?: InputMaybe<Scalars['String']>;
  data_in?: InputMaybe<Array<Scalars['String']>>;
  data_not_in?: InputMaybe<Array<Scalars['String']>>;
  data_contains?: InputMaybe<Scalars['String']>;
  data_contains_nocase?: InputMaybe<Scalars['String']>;
  data_not_contains?: InputMaybe<Scalars['String']>;
  data_not_contains_nocase?: InputMaybe<Scalars['String']>;
  data_starts_with?: InputMaybe<Scalars['String']>;
  data_starts_with_nocase?: InputMaybe<Scalars['String']>;
  data_not_starts_with?: InputMaybe<Scalars['String']>;
  data_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  data_ends_with?: InputMaybe<Scalars['String']>;
  data_ends_with_nocase?: InputMaybe<Scalars['String']>;
  data_not_ends_with?: InputMaybe<Scalars['String']>;
  data_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  data_?: InputMaybe<Data_filter>;
  rawData?: InputMaybe<Scalars['String']>;
  rawData_not?: InputMaybe<Scalars['String']>;
  rawData_gt?: InputMaybe<Scalars['String']>;
  rawData_lt?: InputMaybe<Scalars['String']>;
  rawData_gte?: InputMaybe<Scalars['String']>;
  rawData_lte?: InputMaybe<Scalars['String']>;
  rawData_in?: InputMaybe<Array<Scalars['String']>>;
  rawData_not_in?: InputMaybe<Array<Scalars['String']>>;
  rawData_contains?: InputMaybe<Scalars['String']>;
  rawData_contains_nocase?: InputMaybe<Scalars['String']>;
  rawData_not_contains?: InputMaybe<Scalars['String']>;
  rawData_not_contains_nocase?: InputMaybe<Scalars['String']>;
  rawData_starts_with?: InputMaybe<Scalars['String']>;
  rawData_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rawData_not_starts_with?: InputMaybe<Scalars['String']>;
  rawData_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rawData_ends_with?: InputMaybe<Scalars['String']>;
  rawData_ends_with_nocase?: InputMaybe<Scalars['String']>;
  rawData_not_ends_with?: InputMaybe<Scalars['String']>;
  rawData_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_?: InputMaybe<NFT_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Estate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Estate_filter>>>;
};

export type Estate_orderBy =
  | 'id'
  | 'tokenId'
  | 'owner'
  | 'owner__id'
  | 'owner__address'
  | 'owner__sales'
  | 'owner__purchases'
  | 'owner__spent'
  | 'owner__earned'
  | 'parcels'
  | 'parcelDistances'
  | 'adjacentToRoadCount'
  | 'size'
  | 'data'
  | 'data__id'
  | 'data__version'
  | 'data__name'
  | 'data__description'
  | 'data__ipns'
  | 'rawData'
  | 'nft'
  | 'nft__id'
  | 'nft__tokenId'
  | 'nft__contractAddress'
  | 'nft__category'
  | 'nft__tokenURI'
  | 'nft__name'
  | 'nft__image'
  | 'nft__createdAt'
  | 'nft__updatedAt'
  | 'nft__soldAt'
  | 'nft__transferredAt'
  | 'nft__sales'
  | 'nft__volume'
  | 'nft__searchOrderStatus'
  | 'nft__searchOrderPrice'
  | 'nft__searchOrderExpiresAt'
  | 'nft__searchOrderCreatedAt'
  | 'nft__searchIsLand'
  | 'nft__searchText'
  | 'nft__searchParcelIsInBounds'
  | 'nft__searchParcelX'
  | 'nft__searchParcelY'
  | 'nft__searchParcelEstateId'
  | 'nft__searchDistanceToPlaza'
  | 'nft__searchAdjacentToRoad'
  | 'nft__searchEstateSize'
  | 'nft__searchIsWearableHead'
  | 'nft__searchIsWearableAccessory'
  | 'nft__searchWearableRarity'
  | 'nft__searchWearableCategory';

export type NFT = {
  id: Scalars['ID'];
  tokenId: Scalars['BigInt'];
  contractAddress: Scalars['String'];
  category: Scalars['String'];
  owner: Account;
  tokenURI?: Maybe<Scalars['String']>;
  orders?: Maybe<Array<Order>>;
  bids?: Maybe<Array<Bid>>;
  activeOrder?: Maybe<Order>;
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  parcel?: Maybe<Parcel>;
  estate?: Maybe<Estate>;
  wearable?: Maybe<Wearable>;
  ens?: Maybe<ENS>;
  createdAt: Scalars['BigInt'];
  updatedAt: Scalars['BigInt'];
  soldAt?: Maybe<Scalars['BigInt']>;
  transferredAt: Scalars['BigInt'];
  sales: Scalars['Int'];
  volume: Scalars['BigInt'];
  searchOrderStatus?: Maybe<OrderStatus>;
  searchOrderPrice?: Maybe<Scalars['BigInt']>;
  searchOrderExpiresAt?: Maybe<Scalars['BigInt']>;
  searchOrderCreatedAt?: Maybe<Scalars['BigInt']>;
  searchIsLand?: Maybe<Scalars['Boolean']>;
  searchText?: Maybe<Scalars['String']>;
  searchParcelIsInBounds?: Maybe<Scalars['Boolean']>;
  searchParcelX?: Maybe<Scalars['BigInt']>;
  searchParcelY?: Maybe<Scalars['BigInt']>;
  searchParcelEstateId?: Maybe<Scalars['String']>;
  searchDistanceToPlaza?: Maybe<Scalars['Int']>;
  searchAdjacentToRoad?: Maybe<Scalars['Boolean']>;
  searchEstateSize?: Maybe<Scalars['Int']>;
  searchIsWearableHead?: Maybe<Scalars['Boolean']>;
  searchIsWearableAccessory?: Maybe<Scalars['Boolean']>;
  searchWearableRarity?: Maybe<Scalars['String']>;
  searchWearableCategory?: Maybe<WearableCategory>;
  searchWearableBodyShapes?: Maybe<Array<WearableBodyShape>>;
  itemBlockchainId?: Maybe<Scalars['BigInt']>;
  issuedId?: Maybe<Scalars['BigInt']>;
  itemType: ItemType;
  urn: Scalars['String'];
  collection: Collection;
  item?: Maybe<Item>;
  metadata?: Maybe<Metadata>;
  searchItemType?: Maybe<Scalars['String']>;
  searchEmoteCategory?: Maybe<EmoteCategory>;
  searchEmoteLoop?: Maybe<Scalars['Boolean']>;
  searchEmoteRarity?: Maybe<Scalars['String']>;
  searchEmoteBodyShapes?: Maybe<Array<WearableBodyShape>>;
};


export type NFTordersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Order_filter>;
};


export type NFTbidsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bid_filter>;
};

export type NFT_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  contractAddress?: InputMaybe<Scalars['String']>;
  contractAddress_not?: InputMaybe<Scalars['String']>;
  contractAddress_gt?: InputMaybe<Scalars['String']>;
  contractAddress_lt?: InputMaybe<Scalars['String']>;
  contractAddress_gte?: InputMaybe<Scalars['String']>;
  contractAddress_lte?: InputMaybe<Scalars['String']>;
  contractAddress_in?: InputMaybe<Array<Scalars['String']>>;
  contractAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  contractAddress_contains?: InputMaybe<Scalars['String']>;
  contractAddress_not_contains?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  category_not?: InputMaybe<Scalars['String']>;
  category_in?: InputMaybe<Array<Scalars['String']>>;
  category_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<Account_filter>;
  tokenURI?: InputMaybe<Scalars['String']>;
  tokenURI_not?: InputMaybe<Scalars['String']>;
  tokenURI_gt?: InputMaybe<Scalars['String']>;
  tokenURI_lt?: InputMaybe<Scalars['String']>;
  tokenURI_gte?: InputMaybe<Scalars['String']>;
  tokenURI_lte?: InputMaybe<Scalars['String']>;
  tokenURI_in?: InputMaybe<Array<Scalars['String']>>;
  tokenURI_not_in?: InputMaybe<Array<Scalars['String']>>;
  tokenURI_contains?: InputMaybe<Scalars['String']>;
  tokenURI_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_not_contains?: InputMaybe<Scalars['String']>;
  tokenURI_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_starts_with?: InputMaybe<Scalars['String']>;
  tokenURI_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_not_starts_with?: InputMaybe<Scalars['String']>;
  tokenURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_ends_with?: InputMaybe<Scalars['String']>;
  tokenURI_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_not_ends_with?: InputMaybe<Scalars['String']>;
  tokenURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  orders_?: InputMaybe<Order_filter>;
  bids_?: InputMaybe<Bid_filter>;
  activeOrder?: InputMaybe<Scalars['String']>;
  activeOrder_not?: InputMaybe<Scalars['String']>;
  activeOrder_gt?: InputMaybe<Scalars['String']>;
  activeOrder_lt?: InputMaybe<Scalars['String']>;
  activeOrder_gte?: InputMaybe<Scalars['String']>;
  activeOrder_lte?: InputMaybe<Scalars['String']>;
  activeOrder_in?: InputMaybe<Array<Scalars['String']>>;
  activeOrder_not_in?: InputMaybe<Array<Scalars['String']>>;
  activeOrder_contains?: InputMaybe<Scalars['String']>;
  activeOrder_contains_nocase?: InputMaybe<Scalars['String']>;
  activeOrder_not_contains?: InputMaybe<Scalars['String']>;
  activeOrder_not_contains_nocase?: InputMaybe<Scalars['String']>;
  activeOrder_starts_with?: InputMaybe<Scalars['String']>;
  activeOrder_starts_with_nocase?: InputMaybe<Scalars['String']>;
  activeOrder_not_starts_with?: InputMaybe<Scalars['String']>;
  activeOrder_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  activeOrder_ends_with?: InputMaybe<Scalars['String']>;
  activeOrder_ends_with_nocase?: InputMaybe<Scalars['String']>;
  activeOrder_not_ends_with?: InputMaybe<Scalars['String']>;
  activeOrder_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  activeOrder_?: InputMaybe<Order_filter>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  image_not?: InputMaybe<Scalars['String']>;
  image_gt?: InputMaybe<Scalars['String']>;
  image_lt?: InputMaybe<Scalars['String']>;
  image_gte?: InputMaybe<Scalars['String']>;
  image_lte?: InputMaybe<Scalars['String']>;
  image_in?: InputMaybe<Array<Scalars['String']>>;
  image_not_in?: InputMaybe<Array<Scalars['String']>>;
  image_contains?: InputMaybe<Scalars['String']>;
  image_contains_nocase?: InputMaybe<Scalars['String']>;
  image_not_contains?: InputMaybe<Scalars['String']>;
  image_not_contains_nocase?: InputMaybe<Scalars['String']>;
  image_starts_with?: InputMaybe<Scalars['String']>;
  image_starts_with_nocase?: InputMaybe<Scalars['String']>;
  image_not_starts_with?: InputMaybe<Scalars['String']>;
  image_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  image_ends_with?: InputMaybe<Scalars['String']>;
  image_ends_with_nocase?: InputMaybe<Scalars['String']>;
  image_not_ends_with?: InputMaybe<Scalars['String']>;
  image_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  parcel?: InputMaybe<Scalars['String']>;
  parcel_not?: InputMaybe<Scalars['String']>;
  parcel_gt?: InputMaybe<Scalars['String']>;
  parcel_lt?: InputMaybe<Scalars['String']>;
  parcel_gte?: InputMaybe<Scalars['String']>;
  parcel_lte?: InputMaybe<Scalars['String']>;
  parcel_in?: InputMaybe<Array<Scalars['String']>>;
  parcel_not_in?: InputMaybe<Array<Scalars['String']>>;
  parcel_contains?: InputMaybe<Scalars['String']>;
  parcel_contains_nocase?: InputMaybe<Scalars['String']>;
  parcel_not_contains?: InputMaybe<Scalars['String']>;
  parcel_not_contains_nocase?: InputMaybe<Scalars['String']>;
  parcel_starts_with?: InputMaybe<Scalars['String']>;
  parcel_starts_with_nocase?: InputMaybe<Scalars['String']>;
  parcel_not_starts_with?: InputMaybe<Scalars['String']>;
  parcel_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  parcel_ends_with?: InputMaybe<Scalars['String']>;
  parcel_ends_with_nocase?: InputMaybe<Scalars['String']>;
  parcel_not_ends_with?: InputMaybe<Scalars['String']>;
  parcel_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  parcel_?: InputMaybe<Parcel_filter>;
  estate?: InputMaybe<Scalars['String']>;
  estate_not?: InputMaybe<Scalars['String']>;
  estate_gt?: InputMaybe<Scalars['String']>;
  estate_lt?: InputMaybe<Scalars['String']>;
  estate_gte?: InputMaybe<Scalars['String']>;
  estate_lte?: InputMaybe<Scalars['String']>;
  estate_in?: InputMaybe<Array<Scalars['String']>>;
  estate_not_in?: InputMaybe<Array<Scalars['String']>>;
  estate_contains?: InputMaybe<Scalars['String']>;
  estate_contains_nocase?: InputMaybe<Scalars['String']>;
  estate_not_contains?: InputMaybe<Scalars['String']>;
  estate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  estate_starts_with?: InputMaybe<Scalars['String']>;
  estate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  estate_not_starts_with?: InputMaybe<Scalars['String']>;
  estate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  estate_ends_with?: InputMaybe<Scalars['String']>;
  estate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  estate_not_ends_with?: InputMaybe<Scalars['String']>;
  estate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  estate_?: InputMaybe<Estate_filter>;
  wearable?: InputMaybe<Scalars['String']>;
  wearable_not?: InputMaybe<Scalars['String']>;
  wearable_gt?: InputMaybe<Scalars['String']>;
  wearable_lt?: InputMaybe<Scalars['String']>;
  wearable_gte?: InputMaybe<Scalars['String']>;
  wearable_lte?: InputMaybe<Scalars['String']>;
  wearable_in?: InputMaybe<Array<Scalars['String']>>;
  wearable_not_in?: InputMaybe<Array<Scalars['String']>>;
  wearable_contains?: InputMaybe<Scalars['String']>;
  wearable_contains_nocase?: InputMaybe<Scalars['String']>;
  wearable_not_contains?: InputMaybe<Scalars['String']>;
  wearable_not_contains_nocase?: InputMaybe<Scalars['String']>;
  wearable_starts_with?: InputMaybe<Scalars['String']>;
  wearable_starts_with_nocase?: InputMaybe<Scalars['String']>;
  wearable_not_starts_with?: InputMaybe<Scalars['String']>;
  wearable_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  wearable_ends_with?: InputMaybe<Scalars['String']>;
  wearable_ends_with_nocase?: InputMaybe<Scalars['String']>;
  wearable_not_ends_with?: InputMaybe<Scalars['String']>;
  wearable_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  wearable_?: InputMaybe<Wearable_filter>;
  ens?: InputMaybe<Scalars['String']>;
  ens_not?: InputMaybe<Scalars['String']>;
  ens_gt?: InputMaybe<Scalars['String']>;
  ens_lt?: InputMaybe<Scalars['String']>;
  ens_gte?: InputMaybe<Scalars['String']>;
  ens_lte?: InputMaybe<Scalars['String']>;
  ens_in?: InputMaybe<Array<Scalars['String']>>;
  ens_not_in?: InputMaybe<Array<Scalars['String']>>;
  ens_contains?: InputMaybe<Scalars['String']>;
  ens_contains_nocase?: InputMaybe<Scalars['String']>;
  ens_not_contains?: InputMaybe<Scalars['String']>;
  ens_not_contains_nocase?: InputMaybe<Scalars['String']>;
  ens_starts_with?: InputMaybe<Scalars['String']>;
  ens_starts_with_nocase?: InputMaybe<Scalars['String']>;
  ens_not_starts_with?: InputMaybe<Scalars['String']>;
  ens_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  ens_ends_with?: InputMaybe<Scalars['String']>;
  ens_ends_with_nocase?: InputMaybe<Scalars['String']>;
  ens_not_ends_with?: InputMaybe<Scalars['String']>;
  ens_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  ens_?: InputMaybe<ENS_filter>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  soldAt?: InputMaybe<Scalars['BigInt']>;
  soldAt_not?: InputMaybe<Scalars['BigInt']>;
  soldAt_gt?: InputMaybe<Scalars['BigInt']>;
  soldAt_lt?: InputMaybe<Scalars['BigInt']>;
  soldAt_gte?: InputMaybe<Scalars['BigInt']>;
  soldAt_lte?: InputMaybe<Scalars['BigInt']>;
  soldAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  soldAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferredAt?: InputMaybe<Scalars['BigInt']>;
  transferredAt_not?: InputMaybe<Scalars['BigInt']>;
  transferredAt_gt?: InputMaybe<Scalars['BigInt']>;
  transferredAt_lt?: InputMaybe<Scalars['BigInt']>;
  transferredAt_gte?: InputMaybe<Scalars['BigInt']>;
  transferredAt_lte?: InputMaybe<Scalars['BigInt']>;
  transferredAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferredAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sales?: InputMaybe<Scalars['Int']>;
  sales_not?: InputMaybe<Scalars['Int']>;
  sales_gt?: InputMaybe<Scalars['Int']>;
  sales_lt?: InputMaybe<Scalars['Int']>;
  sales_gte?: InputMaybe<Scalars['Int']>;
  sales_lte?: InputMaybe<Scalars['Int']>;
  sales_in?: InputMaybe<Array<Scalars['Int']>>;
  sales_not_in?: InputMaybe<Array<Scalars['Int']>>;
  volume?: InputMaybe<Scalars['BigInt']>;
  volume_not?: InputMaybe<Scalars['BigInt']>;
  volume_gt?: InputMaybe<Scalars['BigInt']>;
  volume_lt?: InputMaybe<Scalars['BigInt']>;
  volume_gte?: InputMaybe<Scalars['BigInt']>;
  volume_lte?: InputMaybe<Scalars['BigInt']>;
  volume_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchOrderStatus?: InputMaybe<OrderStatus>;
  searchOrderStatus_not?: InputMaybe<OrderStatus>;
  searchOrderStatus_in?: InputMaybe<Array<OrderStatus>>;
  searchOrderStatus_not_in?: InputMaybe<Array<OrderStatus>>;
  searchOrderPrice?: InputMaybe<Scalars['BigInt']>;
  searchOrderPrice_not?: InputMaybe<Scalars['BigInt']>;
  searchOrderPrice_gt?: InputMaybe<Scalars['BigInt']>;
  searchOrderPrice_lt?: InputMaybe<Scalars['BigInt']>;
  searchOrderPrice_gte?: InputMaybe<Scalars['BigInt']>;
  searchOrderPrice_lte?: InputMaybe<Scalars['BigInt']>;
  searchOrderPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchOrderPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchOrderExpiresAt?: InputMaybe<Scalars['BigInt']>;
  searchOrderExpiresAt_not?: InputMaybe<Scalars['BigInt']>;
  searchOrderExpiresAt_gt?: InputMaybe<Scalars['BigInt']>;
  searchOrderExpiresAt_lt?: InputMaybe<Scalars['BigInt']>;
  searchOrderExpiresAt_gte?: InputMaybe<Scalars['BigInt']>;
  searchOrderExpiresAt_lte?: InputMaybe<Scalars['BigInt']>;
  searchOrderExpiresAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchOrderExpiresAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchOrderCreatedAt?: InputMaybe<Scalars['BigInt']>;
  searchOrderCreatedAt_not?: InputMaybe<Scalars['BigInt']>;
  searchOrderCreatedAt_gt?: InputMaybe<Scalars['BigInt']>;
  searchOrderCreatedAt_lt?: InputMaybe<Scalars['BigInt']>;
  searchOrderCreatedAt_gte?: InputMaybe<Scalars['BigInt']>;
  searchOrderCreatedAt_lte?: InputMaybe<Scalars['BigInt']>;
  searchOrderCreatedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchOrderCreatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchIsLand?: InputMaybe<Scalars['Boolean']>;
  searchIsLand_not?: InputMaybe<Scalars['Boolean']>;
  searchIsLand_in?: InputMaybe<Array<Scalars['Boolean']>>;
  searchIsLand_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  searchText?: InputMaybe<Scalars['String']>;
  searchText_not?: InputMaybe<Scalars['String']>;
  searchText_gt?: InputMaybe<Scalars['String']>;
  searchText_lt?: InputMaybe<Scalars['String']>;
  searchText_gte?: InputMaybe<Scalars['String']>;
  searchText_lte?: InputMaybe<Scalars['String']>;
  searchText_in?: InputMaybe<Array<Scalars['String']>>;
  searchText_not_in?: InputMaybe<Array<Scalars['String']>>;
  searchText_contains?: InputMaybe<Scalars['String']>;
  searchText_contains_nocase?: InputMaybe<Scalars['String']>;
  searchText_not_contains?: InputMaybe<Scalars['String']>;
  searchText_not_contains_nocase?: InputMaybe<Scalars['String']>;
  searchText_starts_with?: InputMaybe<Scalars['String']>;
  searchText_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchText_not_starts_with?: InputMaybe<Scalars['String']>;
  searchText_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchText_ends_with?: InputMaybe<Scalars['String']>;
  searchText_ends_with_nocase?: InputMaybe<Scalars['String']>;
  searchText_not_ends_with?: InputMaybe<Scalars['String']>;
  searchText_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  searchParcelIsInBounds?: InputMaybe<Scalars['Boolean']>;
  searchParcelIsInBounds_not?: InputMaybe<Scalars['Boolean']>;
  searchParcelIsInBounds_in?: InputMaybe<Array<Scalars['Boolean']>>;
  searchParcelIsInBounds_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  searchParcelX?: InputMaybe<Scalars['BigInt']>;
  searchParcelX_not?: InputMaybe<Scalars['BigInt']>;
  searchParcelX_gt?: InputMaybe<Scalars['BigInt']>;
  searchParcelX_lt?: InputMaybe<Scalars['BigInt']>;
  searchParcelX_gte?: InputMaybe<Scalars['BigInt']>;
  searchParcelX_lte?: InputMaybe<Scalars['BigInt']>;
  searchParcelX_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchParcelX_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchParcelY?: InputMaybe<Scalars['BigInt']>;
  searchParcelY_not?: InputMaybe<Scalars['BigInt']>;
  searchParcelY_gt?: InputMaybe<Scalars['BigInt']>;
  searchParcelY_lt?: InputMaybe<Scalars['BigInt']>;
  searchParcelY_gte?: InputMaybe<Scalars['BigInt']>;
  searchParcelY_lte?: InputMaybe<Scalars['BigInt']>;
  searchParcelY_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchParcelY_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchParcelEstateId?: InputMaybe<Scalars['String']>;
  searchParcelEstateId_not?: InputMaybe<Scalars['String']>;
  searchParcelEstateId_gt?: InputMaybe<Scalars['String']>;
  searchParcelEstateId_lt?: InputMaybe<Scalars['String']>;
  searchParcelEstateId_gte?: InputMaybe<Scalars['String']>;
  searchParcelEstateId_lte?: InputMaybe<Scalars['String']>;
  searchParcelEstateId_in?: InputMaybe<Array<Scalars['String']>>;
  searchParcelEstateId_not_in?: InputMaybe<Array<Scalars['String']>>;
  searchParcelEstateId_contains?: InputMaybe<Scalars['String']>;
  searchParcelEstateId_contains_nocase?: InputMaybe<Scalars['String']>;
  searchParcelEstateId_not_contains?: InputMaybe<Scalars['String']>;
  searchParcelEstateId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  searchParcelEstateId_starts_with?: InputMaybe<Scalars['String']>;
  searchParcelEstateId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchParcelEstateId_not_starts_with?: InputMaybe<Scalars['String']>;
  searchParcelEstateId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchParcelEstateId_ends_with?: InputMaybe<Scalars['String']>;
  searchParcelEstateId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  searchParcelEstateId_not_ends_with?: InputMaybe<Scalars['String']>;
  searchParcelEstateId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  searchDistanceToPlaza?: InputMaybe<Scalars['Int']>;
  searchDistanceToPlaza_not?: InputMaybe<Scalars['Int']>;
  searchDistanceToPlaza_gt?: InputMaybe<Scalars['Int']>;
  searchDistanceToPlaza_lt?: InputMaybe<Scalars['Int']>;
  searchDistanceToPlaza_gte?: InputMaybe<Scalars['Int']>;
  searchDistanceToPlaza_lte?: InputMaybe<Scalars['Int']>;
  searchDistanceToPlaza_in?: InputMaybe<Array<Scalars['Int']>>;
  searchDistanceToPlaza_not_in?: InputMaybe<Array<Scalars['Int']>>;
  searchAdjacentToRoad?: InputMaybe<Scalars['Boolean']>;
  searchAdjacentToRoad_not?: InputMaybe<Scalars['Boolean']>;
  searchAdjacentToRoad_in?: InputMaybe<Array<Scalars['Boolean']>>;
  searchAdjacentToRoad_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  searchEstateSize?: InputMaybe<Scalars['Int']>;
  searchEstateSize_not?: InputMaybe<Scalars['Int']>;
  searchEstateSize_gt?: InputMaybe<Scalars['Int']>;
  searchEstateSize_lt?: InputMaybe<Scalars['Int']>;
  searchEstateSize_gte?: InputMaybe<Scalars['Int']>;
  searchEstateSize_lte?: InputMaybe<Scalars['Int']>;
  searchEstateSize_in?: InputMaybe<Array<Scalars['Int']>>;
  searchEstateSize_not_in?: InputMaybe<Array<Scalars['Int']>>;
  searchIsWearableHead?: InputMaybe<Scalars['Boolean']>;
  searchIsWearableHead_not?: InputMaybe<Scalars['Boolean']>;
  searchIsWearableHead_in?: InputMaybe<Array<Scalars['Boolean']>>;
  searchIsWearableHead_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  searchIsWearableAccessory?: InputMaybe<Scalars['Boolean']>;
  searchIsWearableAccessory_not?: InputMaybe<Scalars['Boolean']>;
  searchIsWearableAccessory_in?: InputMaybe<Array<Scalars['Boolean']>>;
  searchIsWearableAccessory_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  searchWearableRarity?: InputMaybe<Scalars['String']>;
  searchWearableRarity_not?: InputMaybe<Scalars['String']>;
  searchWearableRarity_gt?: InputMaybe<Scalars['String']>;
  searchWearableRarity_lt?: InputMaybe<Scalars['String']>;
  searchWearableRarity_gte?: InputMaybe<Scalars['String']>;
  searchWearableRarity_lte?: InputMaybe<Scalars['String']>;
  searchWearableRarity_in?: InputMaybe<Array<Scalars['String']>>;
  searchWearableRarity_not_in?: InputMaybe<Array<Scalars['String']>>;
  searchWearableRarity_contains?: InputMaybe<Scalars['String']>;
  searchWearableRarity_contains_nocase?: InputMaybe<Scalars['String']>;
  searchWearableRarity_not_contains?: InputMaybe<Scalars['String']>;
  searchWearableRarity_not_contains_nocase?: InputMaybe<Scalars['String']>;
  searchWearableRarity_starts_with?: InputMaybe<Scalars['String']>;
  searchWearableRarity_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchWearableRarity_not_starts_with?: InputMaybe<Scalars['String']>;
  searchWearableRarity_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchWearableRarity_ends_with?: InputMaybe<Scalars['String']>;
  searchWearableRarity_ends_with_nocase?: InputMaybe<Scalars['String']>;
  searchWearableRarity_not_ends_with?: InputMaybe<Scalars['String']>;
  searchWearableRarity_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  searchWearableCategory?: InputMaybe<WearableCategory>;
  searchWearableCategory_not?: InputMaybe<WearableCategory>;
  searchWearableCategory_in?: InputMaybe<Array<WearableCategory>>;
  searchWearableCategory_not_in?: InputMaybe<Array<WearableCategory>>;
  searchWearableBodyShapes?: InputMaybe<Array<WearableBodyShape>>;
  searchWearableBodyShapes_not?: InputMaybe<Array<WearableBodyShape>>;
  searchWearableBodyShapes_contains?: InputMaybe<Array<WearableBodyShape>>;
  searchWearableBodyShapes_contains_nocase?: InputMaybe<Array<WearableBodyShape>>;
  searchWearableBodyShapes_not_contains?: InputMaybe<Array<WearableBodyShape>>;
  searchWearableBodyShapes_not_contains_nocase?: InputMaybe<Array<WearableBodyShape>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NFT_filter>>>;
  or?: InputMaybe<Array<InputMaybe<NFT_filter>>>;
  category_gt?: InputMaybe<Scalars['String']>;
  category_lt?: InputMaybe<Scalars['String']>;
  category_gte?: InputMaybe<Scalars['String']>;
  category_lte?: InputMaybe<Scalars['String']>;
  category_contains?: InputMaybe<Scalars['String']>;
  category_contains_nocase?: InputMaybe<Scalars['String']>;
  category_not_contains?: InputMaybe<Scalars['String']>;
  category_not_contains_nocase?: InputMaybe<Scalars['String']>;
  category_starts_with?: InputMaybe<Scalars['String']>;
  category_starts_with_nocase?: InputMaybe<Scalars['String']>;
  category_not_starts_with?: InputMaybe<Scalars['String']>;
  category_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  category_ends_with?: InputMaybe<Scalars['String']>;
  category_ends_with_nocase?: InputMaybe<Scalars['String']>;
  category_not_ends_with?: InputMaybe<Scalars['String']>;
  category_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_starts_with?: InputMaybe<Scalars['String']>;
  contractAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  contractAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_ends_with?: InputMaybe<Scalars['String']>;
  contractAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  contractAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  itemBlockchainId?: InputMaybe<Scalars['BigInt']>;
  itemBlockchainId_not?: InputMaybe<Scalars['BigInt']>;
  itemBlockchainId_gt?: InputMaybe<Scalars['BigInt']>;
  itemBlockchainId_lt?: InputMaybe<Scalars['BigInt']>;
  itemBlockchainId_gte?: InputMaybe<Scalars['BigInt']>;
  itemBlockchainId_lte?: InputMaybe<Scalars['BigInt']>;
  itemBlockchainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  itemBlockchainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  issuedId?: InputMaybe<Scalars['BigInt']>;
  issuedId_not?: InputMaybe<Scalars['BigInt']>;
  issuedId_gt?: InputMaybe<Scalars['BigInt']>;
  issuedId_lt?: InputMaybe<Scalars['BigInt']>;
  issuedId_gte?: InputMaybe<Scalars['BigInt']>;
  issuedId_lte?: InputMaybe<Scalars['BigInt']>;
  issuedId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  issuedId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  itemType?: InputMaybe<ItemType>;
  itemType_not?: InputMaybe<ItemType>;
  itemType_in?: InputMaybe<Array<ItemType>>;
  itemType_not_in?: InputMaybe<Array<ItemType>>;
  urn?: InputMaybe<Scalars['String']>;
  urn_not?: InputMaybe<Scalars['String']>;
  urn_gt?: InputMaybe<Scalars['String']>;
  urn_lt?: InputMaybe<Scalars['String']>;
  urn_gte?: InputMaybe<Scalars['String']>;
  urn_lte?: InputMaybe<Scalars['String']>;
  urn_in?: InputMaybe<Array<Scalars['String']>>;
  urn_not_in?: InputMaybe<Array<Scalars['String']>>;
  urn_contains?: InputMaybe<Scalars['String']>;
  urn_contains_nocase?: InputMaybe<Scalars['String']>;
  urn_not_contains?: InputMaybe<Scalars['String']>;
  urn_not_contains_nocase?: InputMaybe<Scalars['String']>;
  urn_starts_with?: InputMaybe<Scalars['String']>;
  urn_starts_with_nocase?: InputMaybe<Scalars['String']>;
  urn_not_starts_with?: InputMaybe<Scalars['String']>;
  urn_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  urn_ends_with?: InputMaybe<Scalars['String']>;
  urn_ends_with_nocase?: InputMaybe<Scalars['String']>;
  urn_not_ends_with?: InputMaybe<Scalars['String']>;
  urn_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collection?: InputMaybe<Scalars['String']>;
  collection_not?: InputMaybe<Scalars['String']>;
  collection_gt?: InputMaybe<Scalars['String']>;
  collection_lt?: InputMaybe<Scalars['String']>;
  collection_gte?: InputMaybe<Scalars['String']>;
  collection_lte?: InputMaybe<Scalars['String']>;
  collection_in?: InputMaybe<Array<Scalars['String']>>;
  collection_not_in?: InputMaybe<Array<Scalars['String']>>;
  collection_contains?: InputMaybe<Scalars['String']>;
  collection_contains_nocase?: InputMaybe<Scalars['String']>;
  collection_not_contains?: InputMaybe<Scalars['String']>;
  collection_not_contains_nocase?: InputMaybe<Scalars['String']>;
  collection_starts_with?: InputMaybe<Scalars['String']>;
  collection_starts_with_nocase?: InputMaybe<Scalars['String']>;
  collection_not_starts_with?: InputMaybe<Scalars['String']>;
  collection_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  collection_ends_with?: InputMaybe<Scalars['String']>;
  collection_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collection_not_ends_with?: InputMaybe<Scalars['String']>;
  collection_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collection_?: InputMaybe<Collection_filter>;
  item?: InputMaybe<Scalars['String']>;
  item_not?: InputMaybe<Scalars['String']>;
  item_gt?: InputMaybe<Scalars['String']>;
  item_lt?: InputMaybe<Scalars['String']>;
  item_gte?: InputMaybe<Scalars['String']>;
  item_lte?: InputMaybe<Scalars['String']>;
  item_in?: InputMaybe<Array<Scalars['String']>>;
  item_not_in?: InputMaybe<Array<Scalars['String']>>;
  item_contains?: InputMaybe<Scalars['String']>;
  item_contains_nocase?: InputMaybe<Scalars['String']>;
  item_not_contains?: InputMaybe<Scalars['String']>;
  item_not_contains_nocase?: InputMaybe<Scalars['String']>;
  item_starts_with?: InputMaybe<Scalars['String']>;
  item_starts_with_nocase?: InputMaybe<Scalars['String']>;
  item_not_starts_with?: InputMaybe<Scalars['String']>;
  item_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  item_ends_with?: InputMaybe<Scalars['String']>;
  item_ends_with_nocase?: InputMaybe<Scalars['String']>;
  item_not_ends_with?: InputMaybe<Scalars['String']>;
  item_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  item_?: InputMaybe<Item_filter>;
  metadata?: InputMaybe<Scalars['String']>;
  metadata_not?: InputMaybe<Scalars['String']>;
  metadata_gt?: InputMaybe<Scalars['String']>;
  metadata_lt?: InputMaybe<Scalars['String']>;
  metadata_gte?: InputMaybe<Scalars['String']>;
  metadata_lte?: InputMaybe<Scalars['String']>;
  metadata_in?: InputMaybe<Array<Scalars['String']>>;
  metadata_not_in?: InputMaybe<Array<Scalars['String']>>;
  metadata_contains?: InputMaybe<Scalars['String']>;
  metadata_contains_nocase?: InputMaybe<Scalars['String']>;
  metadata_not_contains?: InputMaybe<Scalars['String']>;
  metadata_not_contains_nocase?: InputMaybe<Scalars['String']>;
  metadata_starts_with?: InputMaybe<Scalars['String']>;
  metadata_starts_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_not_starts_with?: InputMaybe<Scalars['String']>;
  metadata_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_ends_with?: InputMaybe<Scalars['String']>;
  metadata_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_not_ends_with?: InputMaybe<Scalars['String']>;
  metadata_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_?: InputMaybe<Metadata_filter>;
  searchItemType?: InputMaybe<Scalars['String']>;
  searchItemType_not?: InputMaybe<Scalars['String']>;
  searchItemType_gt?: InputMaybe<Scalars['String']>;
  searchItemType_lt?: InputMaybe<Scalars['String']>;
  searchItemType_gte?: InputMaybe<Scalars['String']>;
  searchItemType_lte?: InputMaybe<Scalars['String']>;
  searchItemType_in?: InputMaybe<Array<Scalars['String']>>;
  searchItemType_not_in?: InputMaybe<Array<Scalars['String']>>;
  searchItemType_contains?: InputMaybe<Scalars['String']>;
  searchItemType_contains_nocase?: InputMaybe<Scalars['String']>;
  searchItemType_not_contains?: InputMaybe<Scalars['String']>;
  searchItemType_not_contains_nocase?: InputMaybe<Scalars['String']>;
  searchItemType_starts_with?: InputMaybe<Scalars['String']>;
  searchItemType_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchItemType_not_starts_with?: InputMaybe<Scalars['String']>;
  searchItemType_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchItemType_ends_with?: InputMaybe<Scalars['String']>;
  searchItemType_ends_with_nocase?: InputMaybe<Scalars['String']>;
  searchItemType_not_ends_with?: InputMaybe<Scalars['String']>;
  searchItemType_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  searchEmoteCategory?: InputMaybe<EmoteCategory>;
  searchEmoteCategory_not?: InputMaybe<EmoteCategory>;
  searchEmoteCategory_in?: InputMaybe<Array<EmoteCategory>>;
  searchEmoteCategory_not_in?: InputMaybe<Array<EmoteCategory>>;
  searchEmoteLoop?: InputMaybe<Scalars['Boolean']>;
  searchEmoteLoop_not?: InputMaybe<Scalars['Boolean']>;
  searchEmoteLoop_in?: InputMaybe<Array<Scalars['Boolean']>>;
  searchEmoteLoop_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  searchEmoteRarity?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_not?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_gt?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_lt?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_gte?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_lte?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_in?: InputMaybe<Array<Scalars['String']>>;
  searchEmoteRarity_not_in?: InputMaybe<Array<Scalars['String']>>;
  searchEmoteRarity_contains?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_contains_nocase?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_not_contains?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_not_contains_nocase?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_starts_with?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_not_starts_with?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_ends_with?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_ends_with_nocase?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_not_ends_with?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  searchEmoteBodyShapes?: InputMaybe<Array<WearableBodyShape>>;
  searchEmoteBodyShapes_not?: InputMaybe<Array<WearableBodyShape>>;
  searchEmoteBodyShapes_contains?: InputMaybe<Array<WearableBodyShape>>;
  searchEmoteBodyShapes_contains_nocase?: InputMaybe<Array<WearableBodyShape>>;
  searchEmoteBodyShapes_not_contains?: InputMaybe<Array<WearableBodyShape>>;
  searchEmoteBodyShapes_not_contains_nocase?: InputMaybe<Array<WearableBodyShape>>;
};

export type NFT_orderBy =
  | 'id'
  | 'tokenId'
  | 'contractAddress'
  | 'category'
  | 'owner'
  | 'owner__id'
  | 'owner__address'
  | 'owner__sales'
  | 'owner__purchases'
  | 'owner__spent'
  | 'owner__earned'
  | 'tokenURI'
  | 'orders'
  | 'bids'
  | 'activeOrder'
  | 'activeOrder__id'
  | 'activeOrder__marketplaceAddress'
  | 'activeOrder__category'
  | 'activeOrder__nftAddress'
  | 'activeOrder__tokenId'
  | 'activeOrder__txHash'
  | 'activeOrder__owner'
  | 'activeOrder__buyer'
  | 'activeOrder__price'
  | 'activeOrder__status'
  | 'activeOrder__blockNumber'
  | 'activeOrder__expiresAt'
  | 'activeOrder__createdAt'
  | 'activeOrder__updatedAt'
  | 'name'
  | 'image'
  | 'parcel'
  | 'parcel__id'
  | 'parcel__tokenId'
  | 'parcel__x'
  | 'parcel__y'
  | 'parcel__rawData'
  | 'estate'
  | 'estate__id'
  | 'estate__tokenId'
  | 'estate__adjacentToRoadCount'
  | 'estate__size'
  | 'estate__rawData'
  | 'wearable'
  | 'wearable__id'
  | 'wearable__representationId'
  | 'wearable__collection'
  | 'wearable__name'
  | 'wearable__description'
  | 'wearable__category'
  | 'wearable__rarity'
  | 'ens'
  | 'ens__id'
  | 'ens__tokenId'
  | 'ens__caller'
  | 'ens__beneficiary'
  | 'ens__labelHash'
  | 'ens__subdomain'
  | 'ens__createdAt'
  | 'createdAt'
  | 'updatedAt'
  | 'soldAt'
  | 'transferredAt'
  | 'sales'
  | 'volume'
  | 'searchOrderStatus'
  | 'searchOrderPrice'
  | 'searchOrderExpiresAt'
  | 'searchOrderCreatedAt'
  | 'searchIsLand'
  | 'searchText'
  | 'searchParcelIsInBounds'
  | 'searchParcelX'
  | 'searchParcelY'
  | 'searchParcelEstateId'
  | 'searchDistanceToPlaza'
  | 'searchAdjacentToRoad'
  | 'searchEstateSize'
  | 'searchIsWearableHead'
  | 'searchIsWearableAccessory'
  | 'searchWearableRarity'
  | 'searchWearableCategory'
  | 'searchWearableBodyShapes'
  | 'itemBlockchainId'
  | 'issuedId'
  | 'itemType'
  | 'owner__isCommitteeMember'
  | 'owner__totalCurations'
  | 'owner__primarySales'
  | 'owner__primarySalesEarned'
  | 'owner__royalties'
  | 'owner__uniqueAndMythicItemsTotal'
  | 'owner__collections'
  | 'owner__creatorsSupportedTotal'
  | 'owner__uniqueCollectorsTotal'
  | 'urn'
  | 'collection'
  | 'collection__id'
  | 'collection__owner'
  | 'collection__creator'
  | 'collection__name'
  | 'collection__symbol'
  | 'collection__isCompleted'
  | 'collection__isApproved'
  | 'collection__isEditable'
  | 'collection__urn'
  | 'collection__itemsCount'
  | 'collection__createdAt'
  | 'collection__updatedAt'
  | 'collection__reviewedAt'
  | 'collection__firstListedAt'
  | 'collection__searchIsStoreMinter'
  | 'collection__searchText'
  | 'item'
  | 'item__id'
  | 'item__blockchainId'
  | 'item__creator'
  | 'item__itemType'
  | 'item__totalSupply'
  | 'item__maxSupply'
  | 'item__rarity'
  | 'item__creationFee'
  | 'item__available'
  | 'item__price'
  | 'item__beneficiary'
  | 'item__contentHash'
  | 'item__URI'
  | 'item__image'
  | 'item__rawMetadata'
  | 'item__urn'
  | 'item__createdAt'
  | 'item__updatedAt'
  | 'item__reviewedAt'
  | 'item__soldAt'
  | 'item__firstListedAt'
  | 'item__sales'
  | 'item__volume'
  | 'item__searchText'
  | 'item__searchItemType'
  | 'item__searchIsCollectionApproved'
  | 'item__searchIsStoreMinter'
  | 'item__searchIsWearableHead'
  | 'item__searchIsWearableAccessory'
  | 'item__searchWearableCategory'
  | 'item__searchWearableRarity'
  | 'item__searchEmoteCategory'
  | 'item__searchEmoteLoop'
  | 'item__searchEmoteRarity'
  | 'item__uniqueCollectorsTotal'
  | 'metadata'
  | 'metadata__id'
  | 'metadata__itemType'
  | 'searchItemType'
  | 'searchEmoteCategory'
  | 'searchEmoteLoop'
  | 'searchEmoteRarity'
  | 'searchEmoteBodyShapes';

export type Order = {
  id: Scalars['ID'];
  marketplaceAddress: Scalars['Bytes'];
  category: Category;
  nft?: Maybe<NFT>;
  nftAddress: Scalars['Bytes'];
  tokenId: Scalars['BigInt'];
  txHash: Scalars['Bytes'];
  owner: Scalars['Bytes'];
  buyer?: Maybe<Scalars['Bytes']>;
  price: Scalars['BigInt'];
  status: OrderStatus;
  blockNumber: Scalars['BigInt'];
  expiresAt: Scalars['BigInt'];
  createdAt: Scalars['BigInt'];
  updatedAt: Scalars['BigInt'];
};

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type OrderStatus =
  | 'open'
  | 'sold'
  | 'cancelled';

export type Order_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  marketplaceAddress?: InputMaybe<Scalars['Bytes']>;
  marketplaceAddress_not?: InputMaybe<Scalars['Bytes']>;
  marketplaceAddress_gt?: InputMaybe<Scalars['Bytes']>;
  marketplaceAddress_lt?: InputMaybe<Scalars['Bytes']>;
  marketplaceAddress_gte?: InputMaybe<Scalars['Bytes']>;
  marketplaceAddress_lte?: InputMaybe<Scalars['Bytes']>;
  marketplaceAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  marketplaceAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  marketplaceAddress_contains?: InputMaybe<Scalars['Bytes']>;
  marketplaceAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  category?: InputMaybe<Category>;
  category_not?: InputMaybe<Category>;
  category_in?: InputMaybe<Array<Category>>;
  category_not_in?: InputMaybe<Array<Category>>;
  nft?: InputMaybe<Scalars['String']>;
  nft_not?: InputMaybe<Scalars['String']>;
  nft_gt?: InputMaybe<Scalars['String']>;
  nft_lt?: InputMaybe<Scalars['String']>;
  nft_gte?: InputMaybe<Scalars['String']>;
  nft_lte?: InputMaybe<Scalars['String']>;
  nft_in?: InputMaybe<Array<Scalars['String']>>;
  nft_not_in?: InputMaybe<Array<Scalars['String']>>;
  nft_contains?: InputMaybe<Scalars['String']>;
  nft_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_not_contains?: InputMaybe<Scalars['String']>;
  nft_not_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_starts_with?: InputMaybe<Scalars['String']>;
  nft_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_starts_with?: InputMaybe<Scalars['String']>;
  nft_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_ends_with?: InputMaybe<Scalars['String']>;
  nft_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_ends_with?: InputMaybe<Scalars['String']>;
  nft_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_?: InputMaybe<NFT_filter>;
  nftAddress?: InputMaybe<Scalars['Bytes']>;
  nftAddress_not?: InputMaybe<Scalars['Bytes']>;
  nftAddress_gt?: InputMaybe<Scalars['Bytes']>;
  nftAddress_lt?: InputMaybe<Scalars['Bytes']>;
  nftAddress_gte?: InputMaybe<Scalars['Bytes']>;
  nftAddress_lte?: InputMaybe<Scalars['Bytes']>;
  nftAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  nftAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  nftAddress_contains?: InputMaybe<Scalars['Bytes']>;
  nftAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_gt?: InputMaybe<Scalars['Bytes']>;
  owner_lt?: InputMaybe<Scalars['Bytes']>;
  owner_gte?: InputMaybe<Scalars['Bytes']>;
  owner_lte?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  buyer?: InputMaybe<Scalars['Bytes']>;
  buyer_not?: InputMaybe<Scalars['Bytes']>;
  buyer_gt?: InputMaybe<Scalars['Bytes']>;
  buyer_lt?: InputMaybe<Scalars['Bytes']>;
  buyer_gte?: InputMaybe<Scalars['Bytes']>;
  buyer_lte?: InputMaybe<Scalars['Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['Bytes']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  buyer_contains?: InputMaybe<Scalars['Bytes']>;
  buyer_not_contains?: InputMaybe<Scalars['Bytes']>;
  price?: InputMaybe<Scalars['BigInt']>;
  price_not?: InputMaybe<Scalars['BigInt']>;
  price_gt?: InputMaybe<Scalars['BigInt']>;
  price_lt?: InputMaybe<Scalars['BigInt']>;
  price_gte?: InputMaybe<Scalars['BigInt']>;
  price_lte?: InputMaybe<Scalars['BigInt']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<OrderStatus>;
  status_not?: InputMaybe<OrderStatus>;
  status_in?: InputMaybe<Array<OrderStatus>>;
  status_not_in?: InputMaybe<Array<OrderStatus>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiresAt?: InputMaybe<Scalars['BigInt']>;
  expiresAt_not?: InputMaybe<Scalars['BigInt']>;
  expiresAt_gt?: InputMaybe<Scalars['BigInt']>;
  expiresAt_lt?: InputMaybe<Scalars['BigInt']>;
  expiresAt_gte?: InputMaybe<Scalars['BigInt']>;
  expiresAt_lte?: InputMaybe<Scalars['BigInt']>;
  expiresAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiresAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Order_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Order_filter>>>;
};

export type Order_orderBy =
  | 'id'
  | 'marketplaceAddress'
  | 'category'
  | 'nft'
  | 'nft__id'
  | 'nft__tokenId'
  | 'nft__contractAddress'
  | 'nft__category'
  | 'nft__tokenURI'
  | 'nft__name'
  | 'nft__image'
  | 'nft__createdAt'
  | 'nft__updatedAt'
  | 'nft__soldAt'
  | 'nft__transferredAt'
  | 'nft__sales'
  | 'nft__volume'
  | 'nft__searchOrderStatus'
  | 'nft__searchOrderPrice'
  | 'nft__searchOrderExpiresAt'
  | 'nft__searchOrderCreatedAt'
  | 'nft__searchIsLand'
  | 'nft__searchText'
  | 'nft__searchParcelIsInBounds'
  | 'nft__searchParcelX'
  | 'nft__searchParcelY'
  | 'nft__searchParcelEstateId'
  | 'nft__searchDistanceToPlaza'
  | 'nft__searchAdjacentToRoad'
  | 'nft__searchEstateSize'
  | 'nft__searchIsWearableHead'
  | 'nft__searchIsWearableAccessory'
  | 'nft__searchWearableRarity'
  | 'nft__searchWearableCategory'
  | 'nftAddress'
  | 'tokenId'
  | 'txHash'
  | 'owner'
  | 'buyer'
  | 'price'
  | 'status'
  | 'blockNumber'
  | 'expiresAt'
  | 'createdAt'
  | 'updatedAt'
  | 'nft__itemBlockchainId'
  | 'nft__issuedId'
  | 'nft__itemType'
  | 'nft__urn'
  | 'nft__searchItemType'
  | 'nft__searchEmoteCategory'
  | 'nft__searchEmoteLoop'
  | 'nft__searchEmoteRarity';

export type Parcel = {
  id: Scalars['ID'];
  tokenId: Scalars['BigInt'];
  owner: Account;
  x: Scalars['BigInt'];
  y: Scalars['BigInt'];
  estate?: Maybe<Estate>;
  data?: Maybe<Data>;
  rawData?: Maybe<Scalars['String']>;
  nft?: Maybe<NFT>;
};

export type Parcel_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  owner?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<Account_filter>;
  x?: InputMaybe<Scalars['BigInt']>;
  x_not?: InputMaybe<Scalars['BigInt']>;
  x_gt?: InputMaybe<Scalars['BigInt']>;
  x_lt?: InputMaybe<Scalars['BigInt']>;
  x_gte?: InputMaybe<Scalars['BigInt']>;
  x_lte?: InputMaybe<Scalars['BigInt']>;
  x_in?: InputMaybe<Array<Scalars['BigInt']>>;
  x_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  y?: InputMaybe<Scalars['BigInt']>;
  y_not?: InputMaybe<Scalars['BigInt']>;
  y_gt?: InputMaybe<Scalars['BigInt']>;
  y_lt?: InputMaybe<Scalars['BigInt']>;
  y_gte?: InputMaybe<Scalars['BigInt']>;
  y_lte?: InputMaybe<Scalars['BigInt']>;
  y_in?: InputMaybe<Array<Scalars['BigInt']>>;
  y_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  estate?: InputMaybe<Scalars['String']>;
  estate_not?: InputMaybe<Scalars['String']>;
  estate_gt?: InputMaybe<Scalars['String']>;
  estate_lt?: InputMaybe<Scalars['String']>;
  estate_gte?: InputMaybe<Scalars['String']>;
  estate_lte?: InputMaybe<Scalars['String']>;
  estate_in?: InputMaybe<Array<Scalars['String']>>;
  estate_not_in?: InputMaybe<Array<Scalars['String']>>;
  estate_contains?: InputMaybe<Scalars['String']>;
  estate_contains_nocase?: InputMaybe<Scalars['String']>;
  estate_not_contains?: InputMaybe<Scalars['String']>;
  estate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  estate_starts_with?: InputMaybe<Scalars['String']>;
  estate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  estate_not_starts_with?: InputMaybe<Scalars['String']>;
  estate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  estate_ends_with?: InputMaybe<Scalars['String']>;
  estate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  estate_not_ends_with?: InputMaybe<Scalars['String']>;
  estate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  estate_?: InputMaybe<Estate_filter>;
  data?: InputMaybe<Scalars['String']>;
  data_not?: InputMaybe<Scalars['String']>;
  data_gt?: InputMaybe<Scalars['String']>;
  data_lt?: InputMaybe<Scalars['String']>;
  data_gte?: InputMaybe<Scalars['String']>;
  data_lte?: InputMaybe<Scalars['String']>;
  data_in?: InputMaybe<Array<Scalars['String']>>;
  data_not_in?: InputMaybe<Array<Scalars['String']>>;
  data_contains?: InputMaybe<Scalars['String']>;
  data_contains_nocase?: InputMaybe<Scalars['String']>;
  data_not_contains?: InputMaybe<Scalars['String']>;
  data_not_contains_nocase?: InputMaybe<Scalars['String']>;
  data_starts_with?: InputMaybe<Scalars['String']>;
  data_starts_with_nocase?: InputMaybe<Scalars['String']>;
  data_not_starts_with?: InputMaybe<Scalars['String']>;
  data_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  data_ends_with?: InputMaybe<Scalars['String']>;
  data_ends_with_nocase?: InputMaybe<Scalars['String']>;
  data_not_ends_with?: InputMaybe<Scalars['String']>;
  data_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  data_?: InputMaybe<Data_filter>;
  rawData?: InputMaybe<Scalars['String']>;
  rawData_not?: InputMaybe<Scalars['String']>;
  rawData_gt?: InputMaybe<Scalars['String']>;
  rawData_lt?: InputMaybe<Scalars['String']>;
  rawData_gte?: InputMaybe<Scalars['String']>;
  rawData_lte?: InputMaybe<Scalars['String']>;
  rawData_in?: InputMaybe<Array<Scalars['String']>>;
  rawData_not_in?: InputMaybe<Array<Scalars['String']>>;
  rawData_contains?: InputMaybe<Scalars['String']>;
  rawData_contains_nocase?: InputMaybe<Scalars['String']>;
  rawData_not_contains?: InputMaybe<Scalars['String']>;
  rawData_not_contains_nocase?: InputMaybe<Scalars['String']>;
  rawData_starts_with?: InputMaybe<Scalars['String']>;
  rawData_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rawData_not_starts_with?: InputMaybe<Scalars['String']>;
  rawData_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rawData_ends_with?: InputMaybe<Scalars['String']>;
  rawData_ends_with_nocase?: InputMaybe<Scalars['String']>;
  rawData_not_ends_with?: InputMaybe<Scalars['String']>;
  rawData_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_?: InputMaybe<NFT_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Parcel_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Parcel_filter>>>;
};

export type Parcel_orderBy =
  | 'id'
  | 'tokenId'
  | 'owner'
  | 'owner__id'
  | 'owner__address'
  | 'owner__sales'
  | 'owner__purchases'
  | 'owner__spent'
  | 'owner__earned'
  | 'x'
  | 'y'
  | 'estate'
  | 'estate__id'
  | 'estate__tokenId'
  | 'estate__adjacentToRoadCount'
  | 'estate__size'
  | 'estate__rawData'
  | 'data'
  | 'data__id'
  | 'data__version'
  | 'data__name'
  | 'data__description'
  | 'data__ipns'
  | 'rawData'
  | 'nft'
  | 'nft__id'
  | 'nft__tokenId'
  | 'nft__contractAddress'
  | 'nft__category'
  | 'nft__tokenURI'
  | 'nft__name'
  | 'nft__image'
  | 'nft__createdAt'
  | 'nft__updatedAt'
  | 'nft__soldAt'
  | 'nft__transferredAt'
  | 'nft__sales'
  | 'nft__volume'
  | 'nft__searchOrderStatus'
  | 'nft__searchOrderPrice'
  | 'nft__searchOrderExpiresAt'
  | 'nft__searchOrderCreatedAt'
  | 'nft__searchIsLand'
  | 'nft__searchText'
  | 'nft__searchParcelIsInBounds'
  | 'nft__searchParcelX'
  | 'nft__searchParcelY'
  | 'nft__searchParcelEstateId'
  | 'nft__searchDistanceToPlaza'
  | 'nft__searchAdjacentToRoad'
  | 'nft__searchEstateSize'
  | 'nft__searchIsWearableHead'
  | 'nft__searchIsWearableAccessory'
  | 'nft__searchWearableRarity'
  | 'nft__searchWearableCategory';

export type Sale = {
  id: Scalars['ID'];
  type: SaleType;
  buyer: Scalars['Bytes'];
  seller: Scalars['Bytes'];
  price: Scalars['BigInt'];
  nft: NFT;
  timestamp: Scalars['BigInt'];
  txHash: Scalars['Bytes'];
  searchTokenId: Scalars['BigInt'];
  searchContractAddress: Scalars['String'];
  searchCategory: Scalars['String'];
  beneficiary: Scalars['Bytes'];
  feesCollectorCut: Scalars['BigInt'];
  feesCollector: Scalars['Bytes'];
  royaltiesCut: Scalars['BigInt'];
  royaltiesCollector: Scalars['Bytes'];
  item: Item;
  searchItemId: Scalars['BigInt'];
};

export type SaleType =
  | 'bid'
  | 'order'
  | 'mint';

export type Sale_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<SaleType>;
  type_not?: InputMaybe<SaleType>;
  type_in?: InputMaybe<Array<SaleType>>;
  type_not_in?: InputMaybe<Array<SaleType>>;
  buyer?: InputMaybe<Scalars['Bytes']>;
  buyer_not?: InputMaybe<Scalars['Bytes']>;
  buyer_gt?: InputMaybe<Scalars['Bytes']>;
  buyer_lt?: InputMaybe<Scalars['Bytes']>;
  buyer_gte?: InputMaybe<Scalars['Bytes']>;
  buyer_lte?: InputMaybe<Scalars['Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['Bytes']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  buyer_contains?: InputMaybe<Scalars['Bytes']>;
  buyer_not_contains?: InputMaybe<Scalars['Bytes']>;
  seller?: InputMaybe<Scalars['Bytes']>;
  seller_not?: InputMaybe<Scalars['Bytes']>;
  seller_gt?: InputMaybe<Scalars['Bytes']>;
  seller_lt?: InputMaybe<Scalars['Bytes']>;
  seller_gte?: InputMaybe<Scalars['Bytes']>;
  seller_lte?: InputMaybe<Scalars['Bytes']>;
  seller_in?: InputMaybe<Array<Scalars['Bytes']>>;
  seller_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  seller_contains?: InputMaybe<Scalars['Bytes']>;
  seller_not_contains?: InputMaybe<Scalars['Bytes']>;
  price?: InputMaybe<Scalars['BigInt']>;
  price_not?: InputMaybe<Scalars['BigInt']>;
  price_gt?: InputMaybe<Scalars['BigInt']>;
  price_lt?: InputMaybe<Scalars['BigInt']>;
  price_gte?: InputMaybe<Scalars['BigInt']>;
  price_lte?: InputMaybe<Scalars['BigInt']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nft?: InputMaybe<Scalars['String']>;
  nft_not?: InputMaybe<Scalars['String']>;
  nft_gt?: InputMaybe<Scalars['String']>;
  nft_lt?: InputMaybe<Scalars['String']>;
  nft_gte?: InputMaybe<Scalars['String']>;
  nft_lte?: InputMaybe<Scalars['String']>;
  nft_in?: InputMaybe<Array<Scalars['String']>>;
  nft_not_in?: InputMaybe<Array<Scalars['String']>>;
  nft_contains?: InputMaybe<Scalars['String']>;
  nft_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_not_contains?: InputMaybe<Scalars['String']>;
  nft_not_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_starts_with?: InputMaybe<Scalars['String']>;
  nft_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_starts_with?: InputMaybe<Scalars['String']>;
  nft_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_ends_with?: InputMaybe<Scalars['String']>;
  nft_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_ends_with?: InputMaybe<Scalars['String']>;
  nft_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_?: InputMaybe<NFT_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  searchTokenId?: InputMaybe<Scalars['BigInt']>;
  searchTokenId_not?: InputMaybe<Scalars['BigInt']>;
  searchTokenId_gt?: InputMaybe<Scalars['BigInt']>;
  searchTokenId_lt?: InputMaybe<Scalars['BigInt']>;
  searchTokenId_gte?: InputMaybe<Scalars['BigInt']>;
  searchTokenId_lte?: InputMaybe<Scalars['BigInt']>;
  searchTokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchTokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchContractAddress?: InputMaybe<Scalars['String']>;
  searchContractAddress_not?: InputMaybe<Scalars['String']>;
  searchContractAddress_gt?: InputMaybe<Scalars['String']>;
  searchContractAddress_lt?: InputMaybe<Scalars['String']>;
  searchContractAddress_gte?: InputMaybe<Scalars['String']>;
  searchContractAddress_lte?: InputMaybe<Scalars['String']>;
  searchContractAddress_in?: InputMaybe<Array<Scalars['String']>>;
  searchContractAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  searchContractAddress_contains?: InputMaybe<Scalars['String']>;
  searchContractAddress_not_contains?: InputMaybe<Scalars['String']>;
  searchCategory?: InputMaybe<Scalars['String']>;
  searchCategory_not?: InputMaybe<Scalars['String']>;
  searchCategory_gt?: InputMaybe<Scalars['String']>;
  searchCategory_lt?: InputMaybe<Scalars['String']>;
  searchCategory_gte?: InputMaybe<Scalars['String']>;
  searchCategory_lte?: InputMaybe<Scalars['String']>;
  searchCategory_in?: InputMaybe<Array<Scalars['String']>>;
  searchCategory_not_in?: InputMaybe<Array<Scalars['String']>>;
  searchCategory_contains?: InputMaybe<Scalars['String']>;
  searchCategory_contains_nocase?: InputMaybe<Scalars['String']>;
  searchCategory_not_contains?: InputMaybe<Scalars['String']>;
  searchCategory_not_contains_nocase?: InputMaybe<Scalars['String']>;
  searchCategory_starts_with?: InputMaybe<Scalars['String']>;
  searchCategory_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchCategory_not_starts_with?: InputMaybe<Scalars['String']>;
  searchCategory_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchCategory_ends_with?: InputMaybe<Scalars['String']>;
  searchCategory_ends_with_nocase?: InputMaybe<Scalars['String']>;
  searchCategory_not_ends_with?: InputMaybe<Scalars['String']>;
  searchCategory_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Sale_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Sale_filter>>>;
  beneficiary?: InputMaybe<Scalars['Bytes']>;
  beneficiary_not?: InputMaybe<Scalars['Bytes']>;
  beneficiary_gt?: InputMaybe<Scalars['Bytes']>;
  beneficiary_lt?: InputMaybe<Scalars['Bytes']>;
  beneficiary_gte?: InputMaybe<Scalars['Bytes']>;
  beneficiary_lte?: InputMaybe<Scalars['Bytes']>;
  beneficiary_in?: InputMaybe<Array<Scalars['Bytes']>>;
  beneficiary_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  beneficiary_contains?: InputMaybe<Scalars['Bytes']>;
  beneficiary_not_contains?: InputMaybe<Scalars['Bytes']>;
  feesCollectorCut?: InputMaybe<Scalars['BigInt']>;
  feesCollectorCut_not?: InputMaybe<Scalars['BigInt']>;
  feesCollectorCut_gt?: InputMaybe<Scalars['BigInt']>;
  feesCollectorCut_lt?: InputMaybe<Scalars['BigInt']>;
  feesCollectorCut_gte?: InputMaybe<Scalars['BigInt']>;
  feesCollectorCut_lte?: InputMaybe<Scalars['BigInt']>;
  feesCollectorCut_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesCollectorCut_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesCollector?: InputMaybe<Scalars['Bytes']>;
  feesCollector_not?: InputMaybe<Scalars['Bytes']>;
  feesCollector_gt?: InputMaybe<Scalars['Bytes']>;
  feesCollector_lt?: InputMaybe<Scalars['Bytes']>;
  feesCollector_gte?: InputMaybe<Scalars['Bytes']>;
  feesCollector_lte?: InputMaybe<Scalars['Bytes']>;
  feesCollector_in?: InputMaybe<Array<Scalars['Bytes']>>;
  feesCollector_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  feesCollector_contains?: InputMaybe<Scalars['Bytes']>;
  feesCollector_not_contains?: InputMaybe<Scalars['Bytes']>;
  royaltiesCut?: InputMaybe<Scalars['BigInt']>;
  royaltiesCut_not?: InputMaybe<Scalars['BigInt']>;
  royaltiesCut_gt?: InputMaybe<Scalars['BigInt']>;
  royaltiesCut_lt?: InputMaybe<Scalars['BigInt']>;
  royaltiesCut_gte?: InputMaybe<Scalars['BigInt']>;
  royaltiesCut_lte?: InputMaybe<Scalars['BigInt']>;
  royaltiesCut_in?: InputMaybe<Array<Scalars['BigInt']>>;
  royaltiesCut_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  royaltiesCollector?: InputMaybe<Scalars['Bytes']>;
  royaltiesCollector_not?: InputMaybe<Scalars['Bytes']>;
  royaltiesCollector_gt?: InputMaybe<Scalars['Bytes']>;
  royaltiesCollector_lt?: InputMaybe<Scalars['Bytes']>;
  royaltiesCollector_gte?: InputMaybe<Scalars['Bytes']>;
  royaltiesCollector_lte?: InputMaybe<Scalars['Bytes']>;
  royaltiesCollector_in?: InputMaybe<Array<Scalars['Bytes']>>;
  royaltiesCollector_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  royaltiesCollector_contains?: InputMaybe<Scalars['Bytes']>;
  royaltiesCollector_not_contains?: InputMaybe<Scalars['Bytes']>;
  item?: InputMaybe<Scalars['String']>;
  item_not?: InputMaybe<Scalars['String']>;
  item_gt?: InputMaybe<Scalars['String']>;
  item_lt?: InputMaybe<Scalars['String']>;
  item_gte?: InputMaybe<Scalars['String']>;
  item_lte?: InputMaybe<Scalars['String']>;
  item_in?: InputMaybe<Array<Scalars['String']>>;
  item_not_in?: InputMaybe<Array<Scalars['String']>>;
  item_contains?: InputMaybe<Scalars['String']>;
  item_contains_nocase?: InputMaybe<Scalars['String']>;
  item_not_contains?: InputMaybe<Scalars['String']>;
  item_not_contains_nocase?: InputMaybe<Scalars['String']>;
  item_starts_with?: InputMaybe<Scalars['String']>;
  item_starts_with_nocase?: InputMaybe<Scalars['String']>;
  item_not_starts_with?: InputMaybe<Scalars['String']>;
  item_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  item_ends_with?: InputMaybe<Scalars['String']>;
  item_ends_with_nocase?: InputMaybe<Scalars['String']>;
  item_not_ends_with?: InputMaybe<Scalars['String']>;
  item_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  item_?: InputMaybe<Item_filter>;
  searchItemId?: InputMaybe<Scalars['BigInt']>;
  searchItemId_not?: InputMaybe<Scalars['BigInt']>;
  searchItemId_gt?: InputMaybe<Scalars['BigInt']>;
  searchItemId_lt?: InputMaybe<Scalars['BigInt']>;
  searchItemId_gte?: InputMaybe<Scalars['BigInt']>;
  searchItemId_lte?: InputMaybe<Scalars['BigInt']>;
  searchItemId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchItemId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchContractAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  searchContractAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  searchContractAddress_starts_with?: InputMaybe<Scalars['String']>;
  searchContractAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchContractAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  searchContractAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchContractAddress_ends_with?: InputMaybe<Scalars['String']>;
  searchContractAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  searchContractAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  searchContractAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
};

export type Sale_orderBy =
  | 'id'
  | 'type'
  | 'buyer'
  | 'seller'
  | 'price'
  | 'nft'
  | 'nft__id'
  | 'nft__tokenId'
  | 'nft__contractAddress'
  | 'nft__category'
  | 'nft__tokenURI'
  | 'nft__name'
  | 'nft__image'
  | 'nft__createdAt'
  | 'nft__updatedAt'
  | 'nft__soldAt'
  | 'nft__transferredAt'
  | 'nft__sales'
  | 'nft__volume'
  | 'nft__searchOrderStatus'
  | 'nft__searchOrderPrice'
  | 'nft__searchOrderExpiresAt'
  | 'nft__searchOrderCreatedAt'
  | 'nft__searchIsLand'
  | 'nft__searchText'
  | 'nft__searchParcelIsInBounds'
  | 'nft__searchParcelX'
  | 'nft__searchParcelY'
  | 'nft__searchParcelEstateId'
  | 'nft__searchDistanceToPlaza'
  | 'nft__searchAdjacentToRoad'
  | 'nft__searchEstateSize'
  | 'nft__searchIsWearableHead'
  | 'nft__searchIsWearableAccessory'
  | 'nft__searchWearableRarity'
  | 'nft__searchWearableCategory'
  | 'timestamp'
  | 'txHash'
  | 'searchTokenId'
  | 'searchContractAddress'
  | 'searchCategory'
  | 'beneficiary'
  | 'feesCollectorCut'
  | 'feesCollector'
  | 'royaltiesCut'
  | 'royaltiesCollector'
  | 'item'
  | 'item__id'
  | 'item__blockchainId'
  | 'item__creator'
  | 'item__itemType'
  | 'item__totalSupply'
  | 'item__maxSupply'
  | 'item__rarity'
  | 'item__creationFee'
  | 'item__available'
  | 'item__price'
  | 'item__beneficiary'
  | 'item__contentHash'
  | 'item__URI'
  | 'item__image'
  | 'item__rawMetadata'
  | 'item__urn'
  | 'item__createdAt'
  | 'item__updatedAt'
  | 'item__reviewedAt'
  | 'item__soldAt'
  | 'item__firstListedAt'
  | 'item__sales'
  | 'item__volume'
  | 'item__searchText'
  | 'item__searchItemType'
  | 'item__searchIsCollectionApproved'
  | 'item__searchIsStoreMinter'
  | 'item__searchIsWearableHead'
  | 'item__searchIsWearableAccessory'
  | 'item__searchWearableCategory'
  | 'item__searchWearableRarity'
  | 'item__searchEmoteCategory'
  | 'item__searchEmoteLoop'
  | 'item__searchEmoteRarity'
  | 'item__uniqueCollectorsTotal'
  | 'nft__itemBlockchainId'
  | 'nft__issuedId'
  | 'nft__itemType'
  | 'nft__urn'
  | 'nft__searchItemType'
  | 'nft__searchEmoteCategory'
  | 'nft__searchEmoteLoop'
  | 'nft__searchEmoteRarity'
  | 'searchItemId';

export type Wearable = {
  id: Scalars['ID'];
  owner: Account;
  representationId: Scalars['String'];
  collection: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  category: WearableCategory;
  rarity: WearableRarity;
  bodyShapes?: Maybe<Array<WearableBodyShape>>;
  nft?: Maybe<NFT>;
};

export type WearableBodyShape =
  | 'BaseFemale'
  | 'BaseMale';

export type WearableCategory =
  | 'eyebrows'
  | 'eyes'
  | 'facial_hair'
  | 'hair'
  | 'mouth'
  | 'upper_body'
  | 'lower_body'
  | 'feet'
  | 'earring'
  | 'eyewear'
  | 'hat'
  | 'helmet'
  | 'mask'
  | 'tiara'
  | 'top_head'
  | 'skin';

export type WearableRarity =
  | 'common'
  | 'uncommon'
  | 'rare'
  | 'epic'
  | 'legendary'
  | 'mythic'
  | 'unique';

export type Wearable_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  owner?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<Account_filter>;
  representationId?: InputMaybe<Scalars['String']>;
  representationId_not?: InputMaybe<Scalars['String']>;
  representationId_gt?: InputMaybe<Scalars['String']>;
  representationId_lt?: InputMaybe<Scalars['String']>;
  representationId_gte?: InputMaybe<Scalars['String']>;
  representationId_lte?: InputMaybe<Scalars['String']>;
  representationId_in?: InputMaybe<Array<Scalars['String']>>;
  representationId_not_in?: InputMaybe<Array<Scalars['String']>>;
  representationId_contains?: InputMaybe<Scalars['String']>;
  representationId_contains_nocase?: InputMaybe<Scalars['String']>;
  representationId_not_contains?: InputMaybe<Scalars['String']>;
  representationId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  representationId_starts_with?: InputMaybe<Scalars['String']>;
  representationId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  representationId_not_starts_with?: InputMaybe<Scalars['String']>;
  representationId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  representationId_ends_with?: InputMaybe<Scalars['String']>;
  representationId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  representationId_not_ends_with?: InputMaybe<Scalars['String']>;
  representationId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collection?: InputMaybe<Scalars['String']>;
  collection_not?: InputMaybe<Scalars['String']>;
  collection_gt?: InputMaybe<Scalars['String']>;
  collection_lt?: InputMaybe<Scalars['String']>;
  collection_gte?: InputMaybe<Scalars['String']>;
  collection_lte?: InputMaybe<Scalars['String']>;
  collection_in?: InputMaybe<Array<Scalars['String']>>;
  collection_not_in?: InputMaybe<Array<Scalars['String']>>;
  collection_contains?: InputMaybe<Scalars['String']>;
  collection_contains_nocase?: InputMaybe<Scalars['String']>;
  collection_not_contains?: InputMaybe<Scalars['String']>;
  collection_not_contains_nocase?: InputMaybe<Scalars['String']>;
  collection_starts_with?: InputMaybe<Scalars['String']>;
  collection_starts_with_nocase?: InputMaybe<Scalars['String']>;
  collection_not_starts_with?: InputMaybe<Scalars['String']>;
  collection_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  collection_ends_with?: InputMaybe<Scalars['String']>;
  collection_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collection_not_ends_with?: InputMaybe<Scalars['String']>;
  collection_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  description_not?: InputMaybe<Scalars['String']>;
  description_gt?: InputMaybe<Scalars['String']>;
  description_lt?: InputMaybe<Scalars['String']>;
  description_gte?: InputMaybe<Scalars['String']>;
  description_lte?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<Scalars['String']>>;
  description_not_in?: InputMaybe<Array<Scalars['String']>>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_contains_nocase?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<WearableCategory>;
  category_not?: InputMaybe<WearableCategory>;
  category_in?: InputMaybe<Array<WearableCategory>>;
  category_not_in?: InputMaybe<Array<WearableCategory>>;
  rarity?: InputMaybe<WearableRarity>;
  rarity_not?: InputMaybe<WearableRarity>;
  rarity_in?: InputMaybe<Array<WearableRarity>>;
  rarity_not_in?: InputMaybe<Array<WearableRarity>>;
  bodyShapes?: InputMaybe<Array<WearableBodyShape>>;
  bodyShapes_not?: InputMaybe<Array<WearableBodyShape>>;
  bodyShapes_contains?: InputMaybe<Array<WearableBodyShape>>;
  bodyShapes_contains_nocase?: InputMaybe<Array<WearableBodyShape>>;
  bodyShapes_not_contains?: InputMaybe<Array<WearableBodyShape>>;
  bodyShapes_not_contains_nocase?: InputMaybe<Array<WearableBodyShape>>;
  nft_?: InputMaybe<NFT_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Wearable_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Wearable_filter>>>;
};

export type Wearable_orderBy =
  | 'id'
  | 'owner'
  | 'owner__id'
  | 'owner__address'
  | 'owner__sales'
  | 'owner__purchases'
  | 'owner__spent'
  | 'owner__earned'
  | 'representationId'
  | 'collection'
  | 'name'
  | 'description'
  | 'category'
  | 'rarity'
  | 'bodyShapes'
  | 'nft'
  | 'nft__id'
  | 'nft__tokenId'
  | 'nft__contractAddress'
  | 'nft__category'
  | 'nft__tokenURI'
  | 'nft__name'
  | 'nft__image'
  | 'nft__createdAt'
  | 'nft__updatedAt'
  | 'nft__soldAt'
  | 'nft__transferredAt'
  | 'nft__sales'
  | 'nft__volume'
  | 'nft__searchOrderStatus'
  | 'nft__searchOrderPrice'
  | 'nft__searchOrderExpiresAt'
  | 'nft__searchOrderCreatedAt'
  | 'nft__searchIsLand'
  | 'nft__searchText'
  | 'nft__searchParcelIsInBounds'
  | 'nft__searchParcelX'
  | 'nft__searchParcelY'
  | 'nft__searchParcelEstateId'
  | 'nft__searchDistanceToPlaza'
  | 'nft__searchAdjacentToRoad'
  | 'nft__searchEstateSize'
  | 'nft__searchIsWearableHead'
  | 'nft__searchIsWearableAccessory'
  | 'nft__searchWearableRarity'
  | 'nft__searchWearableCategory';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

export type AccountsDayData = {
  id: Scalars['ID'];
  date: Scalars['Int'];
  sales: Scalars['Int'];
  purchases: Scalars['Int'];
  earned: Scalars['BigInt'];
  spent: Scalars['BigInt'];
  uniqueCollectionsSales: Array<Scalars['String']>;
  uniqueCollectors: Array<Scalars['String']>;
  uniqueCollectorsTotal: Scalars['Int'];
  uniqueAndMythicItems: Array<Scalars['ID']>;
  uniqueAndMythicItemsTotal: Scalars['Int'];
  creatorsSupported: Array<Scalars['String']>;
  creatorsSupportedTotal: Scalars['Int'];
};

export type AccountsDayData_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  date?: InputMaybe<Scalars['Int']>;
  date_not?: InputMaybe<Scalars['Int']>;
  date_gt?: InputMaybe<Scalars['Int']>;
  date_lt?: InputMaybe<Scalars['Int']>;
  date_gte?: InputMaybe<Scalars['Int']>;
  date_lte?: InputMaybe<Scalars['Int']>;
  date_in?: InputMaybe<Array<Scalars['Int']>>;
  date_not_in?: InputMaybe<Array<Scalars['Int']>>;
  sales?: InputMaybe<Scalars['Int']>;
  sales_not?: InputMaybe<Scalars['Int']>;
  sales_gt?: InputMaybe<Scalars['Int']>;
  sales_lt?: InputMaybe<Scalars['Int']>;
  sales_gte?: InputMaybe<Scalars['Int']>;
  sales_lte?: InputMaybe<Scalars['Int']>;
  sales_in?: InputMaybe<Array<Scalars['Int']>>;
  sales_not_in?: InputMaybe<Array<Scalars['Int']>>;
  purchases?: InputMaybe<Scalars['Int']>;
  purchases_not?: InputMaybe<Scalars['Int']>;
  purchases_gt?: InputMaybe<Scalars['Int']>;
  purchases_lt?: InputMaybe<Scalars['Int']>;
  purchases_gte?: InputMaybe<Scalars['Int']>;
  purchases_lte?: InputMaybe<Scalars['Int']>;
  purchases_in?: InputMaybe<Array<Scalars['Int']>>;
  purchases_not_in?: InputMaybe<Array<Scalars['Int']>>;
  earned?: InputMaybe<Scalars['BigInt']>;
  earned_not?: InputMaybe<Scalars['BigInt']>;
  earned_gt?: InputMaybe<Scalars['BigInt']>;
  earned_lt?: InputMaybe<Scalars['BigInt']>;
  earned_gte?: InputMaybe<Scalars['BigInt']>;
  earned_lte?: InputMaybe<Scalars['BigInt']>;
  earned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  earned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  spent?: InputMaybe<Scalars['BigInt']>;
  spent_not?: InputMaybe<Scalars['BigInt']>;
  spent_gt?: InputMaybe<Scalars['BigInt']>;
  spent_lt?: InputMaybe<Scalars['BigInt']>;
  spent_gte?: InputMaybe<Scalars['BigInt']>;
  spent_lte?: InputMaybe<Scalars['BigInt']>;
  spent_in?: InputMaybe<Array<Scalars['BigInt']>>;
  spent_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  uniqueCollectionsSales?: InputMaybe<Array<Scalars['String']>>;
  uniqueCollectionsSales_not?: InputMaybe<Array<Scalars['String']>>;
  uniqueCollectionsSales_contains?: InputMaybe<Array<Scalars['String']>>;
  uniqueCollectionsSales_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  uniqueCollectionsSales_not_contains?: InputMaybe<Array<Scalars['String']>>;
  uniqueCollectionsSales_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  uniqueCollectors?: InputMaybe<Array<Scalars['String']>>;
  uniqueCollectors_not?: InputMaybe<Array<Scalars['String']>>;
  uniqueCollectors_contains?: InputMaybe<Array<Scalars['String']>>;
  uniqueCollectors_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  uniqueCollectors_not_contains?: InputMaybe<Array<Scalars['String']>>;
  uniqueCollectors_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  uniqueCollectorsTotal?: InputMaybe<Scalars['Int']>;
  uniqueCollectorsTotal_not?: InputMaybe<Scalars['Int']>;
  uniqueCollectorsTotal_gt?: InputMaybe<Scalars['Int']>;
  uniqueCollectorsTotal_lt?: InputMaybe<Scalars['Int']>;
  uniqueCollectorsTotal_gte?: InputMaybe<Scalars['Int']>;
  uniqueCollectorsTotal_lte?: InputMaybe<Scalars['Int']>;
  uniqueCollectorsTotal_in?: InputMaybe<Array<Scalars['Int']>>;
  uniqueCollectorsTotal_not_in?: InputMaybe<Array<Scalars['Int']>>;
  uniqueAndMythicItems?: InputMaybe<Array<Scalars['ID']>>;
  uniqueAndMythicItems_not?: InputMaybe<Array<Scalars['ID']>>;
  uniqueAndMythicItems_contains?: InputMaybe<Array<Scalars['ID']>>;
  uniqueAndMythicItems_contains_nocase?: InputMaybe<Array<Scalars['ID']>>;
  uniqueAndMythicItems_not_contains?: InputMaybe<Array<Scalars['ID']>>;
  uniqueAndMythicItems_not_contains_nocase?: InputMaybe<Array<Scalars['ID']>>;
  uniqueAndMythicItemsTotal?: InputMaybe<Scalars['Int']>;
  uniqueAndMythicItemsTotal_not?: InputMaybe<Scalars['Int']>;
  uniqueAndMythicItemsTotal_gt?: InputMaybe<Scalars['Int']>;
  uniqueAndMythicItemsTotal_lt?: InputMaybe<Scalars['Int']>;
  uniqueAndMythicItemsTotal_gte?: InputMaybe<Scalars['Int']>;
  uniqueAndMythicItemsTotal_lte?: InputMaybe<Scalars['Int']>;
  uniqueAndMythicItemsTotal_in?: InputMaybe<Array<Scalars['Int']>>;
  uniqueAndMythicItemsTotal_not_in?: InputMaybe<Array<Scalars['Int']>>;
  creatorsSupported?: InputMaybe<Array<Scalars['String']>>;
  creatorsSupported_not?: InputMaybe<Array<Scalars['String']>>;
  creatorsSupported_contains?: InputMaybe<Array<Scalars['String']>>;
  creatorsSupported_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  creatorsSupported_not_contains?: InputMaybe<Array<Scalars['String']>>;
  creatorsSupported_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  creatorsSupportedTotal?: InputMaybe<Scalars['Int']>;
  creatorsSupportedTotal_not?: InputMaybe<Scalars['Int']>;
  creatorsSupportedTotal_gt?: InputMaybe<Scalars['Int']>;
  creatorsSupportedTotal_lt?: InputMaybe<Scalars['Int']>;
  creatorsSupportedTotal_gte?: InputMaybe<Scalars['Int']>;
  creatorsSupportedTotal_lte?: InputMaybe<Scalars['Int']>;
  creatorsSupportedTotal_in?: InputMaybe<Array<Scalars['Int']>>;
  creatorsSupportedTotal_not_in?: InputMaybe<Array<Scalars['Int']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AccountsDayData_filter>>>;
  or?: InputMaybe<Array<InputMaybe<AccountsDayData_filter>>>;
};

export type AccountsDayData_orderBy =
  | 'id'
  | 'date'
  | 'sales'
  | 'purchases'
  | 'earned'
  | 'spent'
  | 'uniqueCollectionsSales'
  | 'uniqueCollectors'
  | 'uniqueCollectorsTotal'
  | 'uniqueAndMythicItems'
  | 'uniqueAndMythicItemsTotal'
  | 'creatorsSupported'
  | 'creatorsSupportedTotal';

export type Collection = {
  id: Scalars['ID'];
  items?: Maybe<Array<Item>>;
  owner: Scalars['String'];
  creator: Scalars['String'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  isCompleted?: Maybe<Scalars['Boolean']>;
  isApproved?: Maybe<Scalars['Boolean']>;
  isEditable?: Maybe<Scalars['Boolean']>;
  minters: Array<Scalars['String']>;
  managers: Array<Scalars['String']>;
  urn: Scalars['String'];
  itemsCount: Scalars['Int'];
  createdAt: Scalars['BigInt'];
  updatedAt: Scalars['BigInt'];
  reviewedAt: Scalars['BigInt'];
  firstListedAt?: Maybe<Scalars['BigInt']>;
  searchIsStoreMinter: Scalars['Boolean'];
  searchText: Scalars['String'];
};


export type CollectionitemsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Item_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Item_filter>;
};

export type Collection_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  items_?: InputMaybe<Item_filter>;
  owner?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  creator?: InputMaybe<Scalars['String']>;
  creator_not?: InputMaybe<Scalars['String']>;
  creator_gt?: InputMaybe<Scalars['String']>;
  creator_lt?: InputMaybe<Scalars['String']>;
  creator_gte?: InputMaybe<Scalars['String']>;
  creator_lte?: InputMaybe<Scalars['String']>;
  creator_in?: InputMaybe<Array<Scalars['String']>>;
  creator_not_in?: InputMaybe<Array<Scalars['String']>>;
  creator_contains?: InputMaybe<Scalars['String']>;
  creator_contains_nocase?: InputMaybe<Scalars['String']>;
  creator_not_contains?: InputMaybe<Scalars['String']>;
  creator_not_contains_nocase?: InputMaybe<Scalars['String']>;
  creator_starts_with?: InputMaybe<Scalars['String']>;
  creator_starts_with_nocase?: InputMaybe<Scalars['String']>;
  creator_not_starts_with?: InputMaybe<Scalars['String']>;
  creator_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  creator_ends_with?: InputMaybe<Scalars['String']>;
  creator_ends_with_nocase?: InputMaybe<Scalars['String']>;
  creator_not_ends_with?: InputMaybe<Scalars['String']>;
  creator_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  isCompleted?: InputMaybe<Scalars['Boolean']>;
  isCompleted_not?: InputMaybe<Scalars['Boolean']>;
  isCompleted_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isCompleted_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  isApproved_not?: InputMaybe<Scalars['Boolean']>;
  isApproved_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isApproved_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isEditable?: InputMaybe<Scalars['Boolean']>;
  isEditable_not?: InputMaybe<Scalars['Boolean']>;
  isEditable_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isEditable_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  minters?: InputMaybe<Array<Scalars['String']>>;
  minters_not?: InputMaybe<Array<Scalars['String']>>;
  minters_contains?: InputMaybe<Array<Scalars['String']>>;
  minters_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  minters_not_contains?: InputMaybe<Array<Scalars['String']>>;
  minters_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  managers?: InputMaybe<Array<Scalars['String']>>;
  managers_not?: InputMaybe<Array<Scalars['String']>>;
  managers_contains?: InputMaybe<Array<Scalars['String']>>;
  managers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  managers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  managers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  urn?: InputMaybe<Scalars['String']>;
  urn_not?: InputMaybe<Scalars['String']>;
  urn_gt?: InputMaybe<Scalars['String']>;
  urn_lt?: InputMaybe<Scalars['String']>;
  urn_gte?: InputMaybe<Scalars['String']>;
  urn_lte?: InputMaybe<Scalars['String']>;
  urn_in?: InputMaybe<Array<Scalars['String']>>;
  urn_not_in?: InputMaybe<Array<Scalars['String']>>;
  urn_contains?: InputMaybe<Scalars['String']>;
  urn_contains_nocase?: InputMaybe<Scalars['String']>;
  urn_not_contains?: InputMaybe<Scalars['String']>;
  urn_not_contains_nocase?: InputMaybe<Scalars['String']>;
  urn_starts_with?: InputMaybe<Scalars['String']>;
  urn_starts_with_nocase?: InputMaybe<Scalars['String']>;
  urn_not_starts_with?: InputMaybe<Scalars['String']>;
  urn_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  urn_ends_with?: InputMaybe<Scalars['String']>;
  urn_ends_with_nocase?: InputMaybe<Scalars['String']>;
  urn_not_ends_with?: InputMaybe<Scalars['String']>;
  urn_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  itemsCount?: InputMaybe<Scalars['Int']>;
  itemsCount_not?: InputMaybe<Scalars['Int']>;
  itemsCount_gt?: InputMaybe<Scalars['Int']>;
  itemsCount_lt?: InputMaybe<Scalars['Int']>;
  itemsCount_gte?: InputMaybe<Scalars['Int']>;
  itemsCount_lte?: InputMaybe<Scalars['Int']>;
  itemsCount_in?: InputMaybe<Array<Scalars['Int']>>;
  itemsCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reviewedAt?: InputMaybe<Scalars['BigInt']>;
  reviewedAt_not?: InputMaybe<Scalars['BigInt']>;
  reviewedAt_gt?: InputMaybe<Scalars['BigInt']>;
  reviewedAt_lt?: InputMaybe<Scalars['BigInt']>;
  reviewedAt_gte?: InputMaybe<Scalars['BigInt']>;
  reviewedAt_lte?: InputMaybe<Scalars['BigInt']>;
  reviewedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reviewedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstListedAt?: InputMaybe<Scalars['BigInt']>;
  firstListedAt_not?: InputMaybe<Scalars['BigInt']>;
  firstListedAt_gt?: InputMaybe<Scalars['BigInt']>;
  firstListedAt_lt?: InputMaybe<Scalars['BigInt']>;
  firstListedAt_gte?: InputMaybe<Scalars['BigInt']>;
  firstListedAt_lte?: InputMaybe<Scalars['BigInt']>;
  firstListedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstListedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchIsStoreMinter?: InputMaybe<Scalars['Boolean']>;
  searchIsStoreMinter_not?: InputMaybe<Scalars['Boolean']>;
  searchIsStoreMinter_in?: InputMaybe<Array<Scalars['Boolean']>>;
  searchIsStoreMinter_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  searchText?: InputMaybe<Scalars['String']>;
  searchText_not?: InputMaybe<Scalars['String']>;
  searchText_gt?: InputMaybe<Scalars['String']>;
  searchText_lt?: InputMaybe<Scalars['String']>;
  searchText_gte?: InputMaybe<Scalars['String']>;
  searchText_lte?: InputMaybe<Scalars['String']>;
  searchText_in?: InputMaybe<Array<Scalars['String']>>;
  searchText_not_in?: InputMaybe<Array<Scalars['String']>>;
  searchText_contains?: InputMaybe<Scalars['String']>;
  searchText_contains_nocase?: InputMaybe<Scalars['String']>;
  searchText_not_contains?: InputMaybe<Scalars['String']>;
  searchText_not_contains_nocase?: InputMaybe<Scalars['String']>;
  searchText_starts_with?: InputMaybe<Scalars['String']>;
  searchText_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchText_not_starts_with?: InputMaybe<Scalars['String']>;
  searchText_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchText_ends_with?: InputMaybe<Scalars['String']>;
  searchText_ends_with_nocase?: InputMaybe<Scalars['String']>;
  searchText_not_ends_with?: InputMaybe<Scalars['String']>;
  searchText_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Collection_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Collection_filter>>>;
};

export type Collection_orderBy =
  | 'id'
  | 'items'
  | 'owner'
  | 'creator'
  | 'name'
  | 'symbol'
  | 'isCompleted'
  | 'isApproved'
  | 'isEditable'
  | 'minters'
  | 'managers'
  | 'urn'
  | 'itemsCount'
  | 'createdAt'
  | 'updatedAt'
  | 'reviewedAt'
  | 'firstListedAt'
  | 'searchIsStoreMinter'
  | 'searchText';

export type Curation = {
  id: Scalars['ID'];
  txHash: Scalars['Bytes'];
  curator: Account;
  collection: Collection;
  item?: Maybe<Item>;
  isApproved: Scalars['Boolean'];
  timestamp: Scalars['BigInt'];
};

export type Curation_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  curator?: InputMaybe<Scalars['String']>;
  curator_not?: InputMaybe<Scalars['String']>;
  curator_gt?: InputMaybe<Scalars['String']>;
  curator_lt?: InputMaybe<Scalars['String']>;
  curator_gte?: InputMaybe<Scalars['String']>;
  curator_lte?: InputMaybe<Scalars['String']>;
  curator_in?: InputMaybe<Array<Scalars['String']>>;
  curator_not_in?: InputMaybe<Array<Scalars['String']>>;
  curator_contains?: InputMaybe<Scalars['String']>;
  curator_contains_nocase?: InputMaybe<Scalars['String']>;
  curator_not_contains?: InputMaybe<Scalars['String']>;
  curator_not_contains_nocase?: InputMaybe<Scalars['String']>;
  curator_starts_with?: InputMaybe<Scalars['String']>;
  curator_starts_with_nocase?: InputMaybe<Scalars['String']>;
  curator_not_starts_with?: InputMaybe<Scalars['String']>;
  curator_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  curator_ends_with?: InputMaybe<Scalars['String']>;
  curator_ends_with_nocase?: InputMaybe<Scalars['String']>;
  curator_not_ends_with?: InputMaybe<Scalars['String']>;
  curator_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  curator_?: InputMaybe<Account_filter>;
  collection?: InputMaybe<Scalars['String']>;
  collection_not?: InputMaybe<Scalars['String']>;
  collection_gt?: InputMaybe<Scalars['String']>;
  collection_lt?: InputMaybe<Scalars['String']>;
  collection_gte?: InputMaybe<Scalars['String']>;
  collection_lte?: InputMaybe<Scalars['String']>;
  collection_in?: InputMaybe<Array<Scalars['String']>>;
  collection_not_in?: InputMaybe<Array<Scalars['String']>>;
  collection_contains?: InputMaybe<Scalars['String']>;
  collection_contains_nocase?: InputMaybe<Scalars['String']>;
  collection_not_contains?: InputMaybe<Scalars['String']>;
  collection_not_contains_nocase?: InputMaybe<Scalars['String']>;
  collection_starts_with?: InputMaybe<Scalars['String']>;
  collection_starts_with_nocase?: InputMaybe<Scalars['String']>;
  collection_not_starts_with?: InputMaybe<Scalars['String']>;
  collection_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  collection_ends_with?: InputMaybe<Scalars['String']>;
  collection_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collection_not_ends_with?: InputMaybe<Scalars['String']>;
  collection_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collection_?: InputMaybe<Collection_filter>;
  item?: InputMaybe<Scalars['String']>;
  item_not?: InputMaybe<Scalars['String']>;
  item_gt?: InputMaybe<Scalars['String']>;
  item_lt?: InputMaybe<Scalars['String']>;
  item_gte?: InputMaybe<Scalars['String']>;
  item_lte?: InputMaybe<Scalars['String']>;
  item_in?: InputMaybe<Array<Scalars['String']>>;
  item_not_in?: InputMaybe<Array<Scalars['String']>>;
  item_contains?: InputMaybe<Scalars['String']>;
  item_contains_nocase?: InputMaybe<Scalars['String']>;
  item_not_contains?: InputMaybe<Scalars['String']>;
  item_not_contains_nocase?: InputMaybe<Scalars['String']>;
  item_starts_with?: InputMaybe<Scalars['String']>;
  item_starts_with_nocase?: InputMaybe<Scalars['String']>;
  item_not_starts_with?: InputMaybe<Scalars['String']>;
  item_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  item_ends_with?: InputMaybe<Scalars['String']>;
  item_ends_with_nocase?: InputMaybe<Scalars['String']>;
  item_not_ends_with?: InputMaybe<Scalars['String']>;
  item_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  item_?: InputMaybe<Item_filter>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  isApproved_not?: InputMaybe<Scalars['Boolean']>;
  isApproved_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isApproved_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Curation_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Curation_filter>>>;
};

export type Curation_orderBy =
  | 'id'
  | 'txHash'
  | 'curator'
  | 'curator__id'
  | 'curator__address'
  | 'curator__isCommitteeMember'
  | 'curator__totalCurations'
  | 'curator__sales'
  | 'curator__primarySales'
  | 'curator__purchases'
  | 'curator__spent'
  | 'curator__earned'
  | 'curator__primarySalesEarned'
  | 'curator__royalties'
  | 'curator__uniqueAndMythicItemsTotal'
  | 'curator__collections'
  | 'curator__creatorsSupportedTotal'
  | 'curator__uniqueCollectorsTotal'
  | 'collection'
  | 'collection__id'
  | 'collection__owner'
  | 'collection__creator'
  | 'collection__name'
  | 'collection__symbol'
  | 'collection__isCompleted'
  | 'collection__isApproved'
  | 'collection__isEditable'
  | 'collection__urn'
  | 'collection__itemsCount'
  | 'collection__createdAt'
  | 'collection__updatedAt'
  | 'collection__reviewedAt'
  | 'collection__firstListedAt'
  | 'collection__searchIsStoreMinter'
  | 'collection__searchText'
  | 'item'
  | 'item__id'
  | 'item__blockchainId'
  | 'item__creator'
  | 'item__itemType'
  | 'item__totalSupply'
  | 'item__maxSupply'
  | 'item__rarity'
  | 'item__creationFee'
  | 'item__available'
  | 'item__price'
  | 'item__beneficiary'
  | 'item__contentHash'
  | 'item__URI'
  | 'item__image'
  | 'item__rawMetadata'
  | 'item__urn'
  | 'item__createdAt'
  | 'item__updatedAt'
  | 'item__reviewedAt'
  | 'item__soldAt'
  | 'item__firstListedAt'
  | 'item__sales'
  | 'item__volume'
  | 'item__searchText'
  | 'item__searchItemType'
  | 'item__searchIsCollectionApproved'
  | 'item__searchIsStoreMinter'
  | 'item__searchIsWearableHead'
  | 'item__searchIsWearableAccessory'
  | 'item__searchWearableCategory'
  | 'item__searchWearableRarity'
  | 'item__searchEmoteCategory'
  | 'item__searchEmoteLoop'
  | 'item__searchEmoteRarity'
  | 'item__uniqueCollectorsTotal'
  | 'isApproved'
  | 'timestamp';

export type Currency =
  | 'MANA'
  | 'USD';

export type Emote = {
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  collection: Scalars['String'];
  category: EmoteCategory;
  loop: Scalars['Boolean'];
  rarity: WearableRarity;
  bodyShapes?: Maybe<Array<WearableBodyShape>>;
};

export type EmoteCategory =
  | 'dance'
  | 'stunt'
  | 'greetings'
  | 'fun'
  | 'poses'
  | 'reactions'
  | 'horror'
  | 'miscellaneous';

export type Emote_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  description_not?: InputMaybe<Scalars['String']>;
  description_gt?: InputMaybe<Scalars['String']>;
  description_lt?: InputMaybe<Scalars['String']>;
  description_gte?: InputMaybe<Scalars['String']>;
  description_lte?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<Scalars['String']>>;
  description_not_in?: InputMaybe<Array<Scalars['String']>>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_contains_nocase?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collection?: InputMaybe<Scalars['String']>;
  collection_not?: InputMaybe<Scalars['String']>;
  collection_gt?: InputMaybe<Scalars['String']>;
  collection_lt?: InputMaybe<Scalars['String']>;
  collection_gte?: InputMaybe<Scalars['String']>;
  collection_lte?: InputMaybe<Scalars['String']>;
  collection_in?: InputMaybe<Array<Scalars['String']>>;
  collection_not_in?: InputMaybe<Array<Scalars['String']>>;
  collection_contains?: InputMaybe<Scalars['String']>;
  collection_contains_nocase?: InputMaybe<Scalars['String']>;
  collection_not_contains?: InputMaybe<Scalars['String']>;
  collection_not_contains_nocase?: InputMaybe<Scalars['String']>;
  collection_starts_with?: InputMaybe<Scalars['String']>;
  collection_starts_with_nocase?: InputMaybe<Scalars['String']>;
  collection_not_starts_with?: InputMaybe<Scalars['String']>;
  collection_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  collection_ends_with?: InputMaybe<Scalars['String']>;
  collection_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collection_not_ends_with?: InputMaybe<Scalars['String']>;
  collection_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<EmoteCategory>;
  category_not?: InputMaybe<EmoteCategory>;
  category_in?: InputMaybe<Array<EmoteCategory>>;
  category_not_in?: InputMaybe<Array<EmoteCategory>>;
  loop?: InputMaybe<Scalars['Boolean']>;
  loop_not?: InputMaybe<Scalars['Boolean']>;
  loop_in?: InputMaybe<Array<Scalars['Boolean']>>;
  loop_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  rarity?: InputMaybe<WearableRarity>;
  rarity_not?: InputMaybe<WearableRarity>;
  rarity_in?: InputMaybe<Array<WearableRarity>>;
  rarity_not_in?: InputMaybe<Array<WearableRarity>>;
  bodyShapes?: InputMaybe<Array<WearableBodyShape>>;
  bodyShapes_not?: InputMaybe<Array<WearableBodyShape>>;
  bodyShapes_contains?: InputMaybe<Array<WearableBodyShape>>;
  bodyShapes_contains_nocase?: InputMaybe<Array<WearableBodyShape>>;
  bodyShapes_not_contains?: InputMaybe<Array<WearableBodyShape>>;
  bodyShapes_not_contains_nocase?: InputMaybe<Array<WearableBodyShape>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Emote_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Emote_filter>>>;
};

export type Emote_orderBy =
  | 'id'
  | 'name'
  | 'description'
  | 'collection'
  | 'category'
  | 'loop'
  | 'rarity'
  | 'bodyShapes';

export type Item = {
  id: Scalars['ID'];
  collection: Collection;
  blockchainId: Scalars['BigInt'];
  creator: Scalars['String'];
  itemType: ItemType;
  totalSupply: Scalars['BigInt'];
  maxSupply: Scalars['BigInt'];
  rarity: Scalars['String'];
  creationFee: Scalars['BigInt'];
  available: Scalars['BigInt'];
  price: Scalars['BigInt'];
  beneficiary: Scalars['String'];
  contentHash?: Maybe<Scalars['String']>;
  URI: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  minters: Array<Scalars['String']>;
  managers: Array<Scalars['String']>;
  metadata?: Maybe<Metadata>;
  rawMetadata: Scalars['String'];
  urn: Scalars['String'];
  nfts?: Maybe<Array<NFT>>;
  createdAt: Scalars['BigInt'];
  updatedAt: Scalars['BigInt'];
  /** Last time the item was reviewed */
  reviewedAt: Scalars['BigInt'];
  /** Last time the Item was sold */
  soldAt?: Maybe<Scalars['BigInt']>;
  /** First time the Item was listed */
  firstListedAt?: Maybe<Scalars['BigInt']>;
  sales: Scalars['Int'];
  volume: Scalars['BigInt'];
  searchText?: Maybe<Scalars['String']>;
  searchItemType?: Maybe<Scalars['String']>;
  searchIsCollectionApproved?: Maybe<Scalars['Boolean']>;
  searchIsStoreMinter: Scalars['Boolean'];
  searchIsWearableHead?: Maybe<Scalars['Boolean']>;
  searchIsWearableAccessory?: Maybe<Scalars['Boolean']>;
  searchWearableCategory?: Maybe<WearableCategory>;
  searchWearableRarity?: Maybe<Scalars['String']>;
  searchWearableBodyShapes?: Maybe<Array<WearableBodyShape>>;
  searchEmoteCategory?: Maybe<EmoteCategory>;
  searchEmoteLoop?: Maybe<Scalars['Boolean']>;
  searchEmoteRarity?: Maybe<Scalars['String']>;
  searchEmoteBodyShapes?: Maybe<Array<WearableBodyShape>>;
  uniqueCollectors: Array<Scalars['String']>;
  uniqueCollectorsTotal: Scalars['Int'];
};


export type ItemnftsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NFT_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NFT_filter>;
};

export type ItemType =
  | 'undefined'
  | 'wearable_v1'
  | 'wearable_v2'
  | 'smart_wearable_v1'
  | 'emote_v1';

export type Item_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  collection?: InputMaybe<Scalars['String']>;
  collection_not?: InputMaybe<Scalars['String']>;
  collection_gt?: InputMaybe<Scalars['String']>;
  collection_lt?: InputMaybe<Scalars['String']>;
  collection_gte?: InputMaybe<Scalars['String']>;
  collection_lte?: InputMaybe<Scalars['String']>;
  collection_in?: InputMaybe<Array<Scalars['String']>>;
  collection_not_in?: InputMaybe<Array<Scalars['String']>>;
  collection_contains?: InputMaybe<Scalars['String']>;
  collection_contains_nocase?: InputMaybe<Scalars['String']>;
  collection_not_contains?: InputMaybe<Scalars['String']>;
  collection_not_contains_nocase?: InputMaybe<Scalars['String']>;
  collection_starts_with?: InputMaybe<Scalars['String']>;
  collection_starts_with_nocase?: InputMaybe<Scalars['String']>;
  collection_not_starts_with?: InputMaybe<Scalars['String']>;
  collection_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  collection_ends_with?: InputMaybe<Scalars['String']>;
  collection_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collection_not_ends_with?: InputMaybe<Scalars['String']>;
  collection_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collection_?: InputMaybe<Collection_filter>;
  blockchainId?: InputMaybe<Scalars['BigInt']>;
  blockchainId_not?: InputMaybe<Scalars['BigInt']>;
  blockchainId_gt?: InputMaybe<Scalars['BigInt']>;
  blockchainId_lt?: InputMaybe<Scalars['BigInt']>;
  blockchainId_gte?: InputMaybe<Scalars['BigInt']>;
  blockchainId_lte?: InputMaybe<Scalars['BigInt']>;
  blockchainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockchainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creator?: InputMaybe<Scalars['String']>;
  creator_not?: InputMaybe<Scalars['String']>;
  creator_gt?: InputMaybe<Scalars['String']>;
  creator_lt?: InputMaybe<Scalars['String']>;
  creator_gte?: InputMaybe<Scalars['String']>;
  creator_lte?: InputMaybe<Scalars['String']>;
  creator_in?: InputMaybe<Array<Scalars['String']>>;
  creator_not_in?: InputMaybe<Array<Scalars['String']>>;
  creator_contains?: InputMaybe<Scalars['String']>;
  creator_contains_nocase?: InputMaybe<Scalars['String']>;
  creator_not_contains?: InputMaybe<Scalars['String']>;
  creator_not_contains_nocase?: InputMaybe<Scalars['String']>;
  creator_starts_with?: InputMaybe<Scalars['String']>;
  creator_starts_with_nocase?: InputMaybe<Scalars['String']>;
  creator_not_starts_with?: InputMaybe<Scalars['String']>;
  creator_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  creator_ends_with?: InputMaybe<Scalars['String']>;
  creator_ends_with_nocase?: InputMaybe<Scalars['String']>;
  creator_not_ends_with?: InputMaybe<Scalars['String']>;
  creator_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  itemType?: InputMaybe<ItemType>;
  itemType_not?: InputMaybe<ItemType>;
  itemType_in?: InputMaybe<Array<ItemType>>;
  itemType_not_in?: InputMaybe<Array<ItemType>>;
  totalSupply?: InputMaybe<Scalars['BigInt']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxSupply?: InputMaybe<Scalars['BigInt']>;
  maxSupply_not?: InputMaybe<Scalars['BigInt']>;
  maxSupply_gt?: InputMaybe<Scalars['BigInt']>;
  maxSupply_lt?: InputMaybe<Scalars['BigInt']>;
  maxSupply_gte?: InputMaybe<Scalars['BigInt']>;
  maxSupply_lte?: InputMaybe<Scalars['BigInt']>;
  maxSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rarity?: InputMaybe<Scalars['String']>;
  rarity_not?: InputMaybe<Scalars['String']>;
  rarity_gt?: InputMaybe<Scalars['String']>;
  rarity_lt?: InputMaybe<Scalars['String']>;
  rarity_gte?: InputMaybe<Scalars['String']>;
  rarity_lte?: InputMaybe<Scalars['String']>;
  rarity_in?: InputMaybe<Array<Scalars['String']>>;
  rarity_not_in?: InputMaybe<Array<Scalars['String']>>;
  rarity_contains?: InputMaybe<Scalars['String']>;
  rarity_contains_nocase?: InputMaybe<Scalars['String']>;
  rarity_not_contains?: InputMaybe<Scalars['String']>;
  rarity_not_contains_nocase?: InputMaybe<Scalars['String']>;
  rarity_starts_with?: InputMaybe<Scalars['String']>;
  rarity_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rarity_not_starts_with?: InputMaybe<Scalars['String']>;
  rarity_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rarity_ends_with?: InputMaybe<Scalars['String']>;
  rarity_ends_with_nocase?: InputMaybe<Scalars['String']>;
  rarity_not_ends_with?: InputMaybe<Scalars['String']>;
  rarity_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  creationFee?: InputMaybe<Scalars['BigInt']>;
  creationFee_not?: InputMaybe<Scalars['BigInt']>;
  creationFee_gt?: InputMaybe<Scalars['BigInt']>;
  creationFee_lt?: InputMaybe<Scalars['BigInt']>;
  creationFee_gte?: InputMaybe<Scalars['BigInt']>;
  creationFee_lte?: InputMaybe<Scalars['BigInt']>;
  creationFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creationFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  available?: InputMaybe<Scalars['BigInt']>;
  available_not?: InputMaybe<Scalars['BigInt']>;
  available_gt?: InputMaybe<Scalars['BigInt']>;
  available_lt?: InputMaybe<Scalars['BigInt']>;
  available_gte?: InputMaybe<Scalars['BigInt']>;
  available_lte?: InputMaybe<Scalars['BigInt']>;
  available_in?: InputMaybe<Array<Scalars['BigInt']>>;
  available_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price?: InputMaybe<Scalars['BigInt']>;
  price_not?: InputMaybe<Scalars['BigInt']>;
  price_gt?: InputMaybe<Scalars['BigInt']>;
  price_lt?: InputMaybe<Scalars['BigInt']>;
  price_gte?: InputMaybe<Scalars['BigInt']>;
  price_lte?: InputMaybe<Scalars['BigInt']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  beneficiary?: InputMaybe<Scalars['String']>;
  beneficiary_not?: InputMaybe<Scalars['String']>;
  beneficiary_gt?: InputMaybe<Scalars['String']>;
  beneficiary_lt?: InputMaybe<Scalars['String']>;
  beneficiary_gte?: InputMaybe<Scalars['String']>;
  beneficiary_lte?: InputMaybe<Scalars['String']>;
  beneficiary_in?: InputMaybe<Array<Scalars['String']>>;
  beneficiary_not_in?: InputMaybe<Array<Scalars['String']>>;
  beneficiary_contains?: InputMaybe<Scalars['String']>;
  beneficiary_contains_nocase?: InputMaybe<Scalars['String']>;
  beneficiary_not_contains?: InputMaybe<Scalars['String']>;
  beneficiary_not_contains_nocase?: InputMaybe<Scalars['String']>;
  beneficiary_starts_with?: InputMaybe<Scalars['String']>;
  beneficiary_starts_with_nocase?: InputMaybe<Scalars['String']>;
  beneficiary_not_starts_with?: InputMaybe<Scalars['String']>;
  beneficiary_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  beneficiary_ends_with?: InputMaybe<Scalars['String']>;
  beneficiary_ends_with_nocase?: InputMaybe<Scalars['String']>;
  beneficiary_not_ends_with?: InputMaybe<Scalars['String']>;
  beneficiary_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contentHash?: InputMaybe<Scalars['String']>;
  contentHash_not?: InputMaybe<Scalars['String']>;
  contentHash_gt?: InputMaybe<Scalars['String']>;
  contentHash_lt?: InputMaybe<Scalars['String']>;
  contentHash_gte?: InputMaybe<Scalars['String']>;
  contentHash_lte?: InputMaybe<Scalars['String']>;
  contentHash_in?: InputMaybe<Array<Scalars['String']>>;
  contentHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  contentHash_contains?: InputMaybe<Scalars['String']>;
  contentHash_contains_nocase?: InputMaybe<Scalars['String']>;
  contentHash_not_contains?: InputMaybe<Scalars['String']>;
  contentHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contentHash_starts_with?: InputMaybe<Scalars['String']>;
  contentHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contentHash_not_starts_with?: InputMaybe<Scalars['String']>;
  contentHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contentHash_ends_with?: InputMaybe<Scalars['String']>;
  contentHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contentHash_not_ends_with?: InputMaybe<Scalars['String']>;
  contentHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  URI?: InputMaybe<Scalars['String']>;
  URI_not?: InputMaybe<Scalars['String']>;
  URI_gt?: InputMaybe<Scalars['String']>;
  URI_lt?: InputMaybe<Scalars['String']>;
  URI_gte?: InputMaybe<Scalars['String']>;
  URI_lte?: InputMaybe<Scalars['String']>;
  URI_in?: InputMaybe<Array<Scalars['String']>>;
  URI_not_in?: InputMaybe<Array<Scalars['String']>>;
  URI_contains?: InputMaybe<Scalars['String']>;
  URI_contains_nocase?: InputMaybe<Scalars['String']>;
  URI_not_contains?: InputMaybe<Scalars['String']>;
  URI_not_contains_nocase?: InputMaybe<Scalars['String']>;
  URI_starts_with?: InputMaybe<Scalars['String']>;
  URI_starts_with_nocase?: InputMaybe<Scalars['String']>;
  URI_not_starts_with?: InputMaybe<Scalars['String']>;
  URI_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  URI_ends_with?: InputMaybe<Scalars['String']>;
  URI_ends_with_nocase?: InputMaybe<Scalars['String']>;
  URI_not_ends_with?: InputMaybe<Scalars['String']>;
  URI_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  image_not?: InputMaybe<Scalars['String']>;
  image_gt?: InputMaybe<Scalars['String']>;
  image_lt?: InputMaybe<Scalars['String']>;
  image_gte?: InputMaybe<Scalars['String']>;
  image_lte?: InputMaybe<Scalars['String']>;
  image_in?: InputMaybe<Array<Scalars['String']>>;
  image_not_in?: InputMaybe<Array<Scalars['String']>>;
  image_contains?: InputMaybe<Scalars['String']>;
  image_contains_nocase?: InputMaybe<Scalars['String']>;
  image_not_contains?: InputMaybe<Scalars['String']>;
  image_not_contains_nocase?: InputMaybe<Scalars['String']>;
  image_starts_with?: InputMaybe<Scalars['String']>;
  image_starts_with_nocase?: InputMaybe<Scalars['String']>;
  image_not_starts_with?: InputMaybe<Scalars['String']>;
  image_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  image_ends_with?: InputMaybe<Scalars['String']>;
  image_ends_with_nocase?: InputMaybe<Scalars['String']>;
  image_not_ends_with?: InputMaybe<Scalars['String']>;
  image_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  minters?: InputMaybe<Array<Scalars['String']>>;
  minters_not?: InputMaybe<Array<Scalars['String']>>;
  minters_contains?: InputMaybe<Array<Scalars['String']>>;
  minters_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  minters_not_contains?: InputMaybe<Array<Scalars['String']>>;
  minters_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  managers?: InputMaybe<Array<Scalars['String']>>;
  managers_not?: InputMaybe<Array<Scalars['String']>>;
  managers_contains?: InputMaybe<Array<Scalars['String']>>;
  managers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  managers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  managers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  metadata?: InputMaybe<Scalars['String']>;
  metadata_not?: InputMaybe<Scalars['String']>;
  metadata_gt?: InputMaybe<Scalars['String']>;
  metadata_lt?: InputMaybe<Scalars['String']>;
  metadata_gte?: InputMaybe<Scalars['String']>;
  metadata_lte?: InputMaybe<Scalars['String']>;
  metadata_in?: InputMaybe<Array<Scalars['String']>>;
  metadata_not_in?: InputMaybe<Array<Scalars['String']>>;
  metadata_contains?: InputMaybe<Scalars['String']>;
  metadata_contains_nocase?: InputMaybe<Scalars['String']>;
  metadata_not_contains?: InputMaybe<Scalars['String']>;
  metadata_not_contains_nocase?: InputMaybe<Scalars['String']>;
  metadata_starts_with?: InputMaybe<Scalars['String']>;
  metadata_starts_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_not_starts_with?: InputMaybe<Scalars['String']>;
  metadata_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_ends_with?: InputMaybe<Scalars['String']>;
  metadata_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_not_ends_with?: InputMaybe<Scalars['String']>;
  metadata_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_?: InputMaybe<Metadata_filter>;
  rawMetadata?: InputMaybe<Scalars['String']>;
  rawMetadata_not?: InputMaybe<Scalars['String']>;
  rawMetadata_gt?: InputMaybe<Scalars['String']>;
  rawMetadata_lt?: InputMaybe<Scalars['String']>;
  rawMetadata_gte?: InputMaybe<Scalars['String']>;
  rawMetadata_lte?: InputMaybe<Scalars['String']>;
  rawMetadata_in?: InputMaybe<Array<Scalars['String']>>;
  rawMetadata_not_in?: InputMaybe<Array<Scalars['String']>>;
  rawMetadata_contains?: InputMaybe<Scalars['String']>;
  rawMetadata_contains_nocase?: InputMaybe<Scalars['String']>;
  rawMetadata_not_contains?: InputMaybe<Scalars['String']>;
  rawMetadata_not_contains_nocase?: InputMaybe<Scalars['String']>;
  rawMetadata_starts_with?: InputMaybe<Scalars['String']>;
  rawMetadata_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rawMetadata_not_starts_with?: InputMaybe<Scalars['String']>;
  rawMetadata_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rawMetadata_ends_with?: InputMaybe<Scalars['String']>;
  rawMetadata_ends_with_nocase?: InputMaybe<Scalars['String']>;
  rawMetadata_not_ends_with?: InputMaybe<Scalars['String']>;
  rawMetadata_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  urn?: InputMaybe<Scalars['String']>;
  urn_not?: InputMaybe<Scalars['String']>;
  urn_gt?: InputMaybe<Scalars['String']>;
  urn_lt?: InputMaybe<Scalars['String']>;
  urn_gte?: InputMaybe<Scalars['String']>;
  urn_lte?: InputMaybe<Scalars['String']>;
  urn_in?: InputMaybe<Array<Scalars['String']>>;
  urn_not_in?: InputMaybe<Array<Scalars['String']>>;
  urn_contains?: InputMaybe<Scalars['String']>;
  urn_contains_nocase?: InputMaybe<Scalars['String']>;
  urn_not_contains?: InputMaybe<Scalars['String']>;
  urn_not_contains_nocase?: InputMaybe<Scalars['String']>;
  urn_starts_with?: InputMaybe<Scalars['String']>;
  urn_starts_with_nocase?: InputMaybe<Scalars['String']>;
  urn_not_starts_with?: InputMaybe<Scalars['String']>;
  urn_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  urn_ends_with?: InputMaybe<Scalars['String']>;
  urn_ends_with_nocase?: InputMaybe<Scalars['String']>;
  urn_not_ends_with?: InputMaybe<Scalars['String']>;
  urn_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nfts_?: InputMaybe<NFT_filter>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reviewedAt?: InputMaybe<Scalars['BigInt']>;
  reviewedAt_not?: InputMaybe<Scalars['BigInt']>;
  reviewedAt_gt?: InputMaybe<Scalars['BigInt']>;
  reviewedAt_lt?: InputMaybe<Scalars['BigInt']>;
  reviewedAt_gte?: InputMaybe<Scalars['BigInt']>;
  reviewedAt_lte?: InputMaybe<Scalars['BigInt']>;
  reviewedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reviewedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  soldAt?: InputMaybe<Scalars['BigInt']>;
  soldAt_not?: InputMaybe<Scalars['BigInt']>;
  soldAt_gt?: InputMaybe<Scalars['BigInt']>;
  soldAt_lt?: InputMaybe<Scalars['BigInt']>;
  soldAt_gte?: InputMaybe<Scalars['BigInt']>;
  soldAt_lte?: InputMaybe<Scalars['BigInt']>;
  soldAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  soldAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstListedAt?: InputMaybe<Scalars['BigInt']>;
  firstListedAt_not?: InputMaybe<Scalars['BigInt']>;
  firstListedAt_gt?: InputMaybe<Scalars['BigInt']>;
  firstListedAt_lt?: InputMaybe<Scalars['BigInt']>;
  firstListedAt_gte?: InputMaybe<Scalars['BigInt']>;
  firstListedAt_lte?: InputMaybe<Scalars['BigInt']>;
  firstListedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstListedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sales?: InputMaybe<Scalars['Int']>;
  sales_not?: InputMaybe<Scalars['Int']>;
  sales_gt?: InputMaybe<Scalars['Int']>;
  sales_lt?: InputMaybe<Scalars['Int']>;
  sales_gte?: InputMaybe<Scalars['Int']>;
  sales_lte?: InputMaybe<Scalars['Int']>;
  sales_in?: InputMaybe<Array<Scalars['Int']>>;
  sales_not_in?: InputMaybe<Array<Scalars['Int']>>;
  volume?: InputMaybe<Scalars['BigInt']>;
  volume_not?: InputMaybe<Scalars['BigInt']>;
  volume_gt?: InputMaybe<Scalars['BigInt']>;
  volume_lt?: InputMaybe<Scalars['BigInt']>;
  volume_gte?: InputMaybe<Scalars['BigInt']>;
  volume_lte?: InputMaybe<Scalars['BigInt']>;
  volume_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchText?: InputMaybe<Scalars['String']>;
  searchText_not?: InputMaybe<Scalars['String']>;
  searchText_gt?: InputMaybe<Scalars['String']>;
  searchText_lt?: InputMaybe<Scalars['String']>;
  searchText_gte?: InputMaybe<Scalars['String']>;
  searchText_lte?: InputMaybe<Scalars['String']>;
  searchText_in?: InputMaybe<Array<Scalars['String']>>;
  searchText_not_in?: InputMaybe<Array<Scalars['String']>>;
  searchText_contains?: InputMaybe<Scalars['String']>;
  searchText_contains_nocase?: InputMaybe<Scalars['String']>;
  searchText_not_contains?: InputMaybe<Scalars['String']>;
  searchText_not_contains_nocase?: InputMaybe<Scalars['String']>;
  searchText_starts_with?: InputMaybe<Scalars['String']>;
  searchText_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchText_not_starts_with?: InputMaybe<Scalars['String']>;
  searchText_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchText_ends_with?: InputMaybe<Scalars['String']>;
  searchText_ends_with_nocase?: InputMaybe<Scalars['String']>;
  searchText_not_ends_with?: InputMaybe<Scalars['String']>;
  searchText_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  searchItemType?: InputMaybe<Scalars['String']>;
  searchItemType_not?: InputMaybe<Scalars['String']>;
  searchItemType_gt?: InputMaybe<Scalars['String']>;
  searchItemType_lt?: InputMaybe<Scalars['String']>;
  searchItemType_gte?: InputMaybe<Scalars['String']>;
  searchItemType_lte?: InputMaybe<Scalars['String']>;
  searchItemType_in?: InputMaybe<Array<Scalars['String']>>;
  searchItemType_not_in?: InputMaybe<Array<Scalars['String']>>;
  searchItemType_contains?: InputMaybe<Scalars['String']>;
  searchItemType_contains_nocase?: InputMaybe<Scalars['String']>;
  searchItemType_not_contains?: InputMaybe<Scalars['String']>;
  searchItemType_not_contains_nocase?: InputMaybe<Scalars['String']>;
  searchItemType_starts_with?: InputMaybe<Scalars['String']>;
  searchItemType_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchItemType_not_starts_with?: InputMaybe<Scalars['String']>;
  searchItemType_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchItemType_ends_with?: InputMaybe<Scalars['String']>;
  searchItemType_ends_with_nocase?: InputMaybe<Scalars['String']>;
  searchItemType_not_ends_with?: InputMaybe<Scalars['String']>;
  searchItemType_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  searchIsCollectionApproved?: InputMaybe<Scalars['Boolean']>;
  searchIsCollectionApproved_not?: InputMaybe<Scalars['Boolean']>;
  searchIsCollectionApproved_in?: InputMaybe<Array<Scalars['Boolean']>>;
  searchIsCollectionApproved_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  searchIsStoreMinter?: InputMaybe<Scalars['Boolean']>;
  searchIsStoreMinter_not?: InputMaybe<Scalars['Boolean']>;
  searchIsStoreMinter_in?: InputMaybe<Array<Scalars['Boolean']>>;
  searchIsStoreMinter_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  searchIsWearableHead?: InputMaybe<Scalars['Boolean']>;
  searchIsWearableHead_not?: InputMaybe<Scalars['Boolean']>;
  searchIsWearableHead_in?: InputMaybe<Array<Scalars['Boolean']>>;
  searchIsWearableHead_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  searchIsWearableAccessory?: InputMaybe<Scalars['Boolean']>;
  searchIsWearableAccessory_not?: InputMaybe<Scalars['Boolean']>;
  searchIsWearableAccessory_in?: InputMaybe<Array<Scalars['Boolean']>>;
  searchIsWearableAccessory_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  searchWearableCategory?: InputMaybe<WearableCategory>;
  searchWearableCategory_not?: InputMaybe<WearableCategory>;
  searchWearableCategory_in?: InputMaybe<Array<WearableCategory>>;
  searchWearableCategory_not_in?: InputMaybe<Array<WearableCategory>>;
  searchWearableRarity?: InputMaybe<Scalars['String']>;
  searchWearableRarity_not?: InputMaybe<Scalars['String']>;
  searchWearableRarity_gt?: InputMaybe<Scalars['String']>;
  searchWearableRarity_lt?: InputMaybe<Scalars['String']>;
  searchWearableRarity_gte?: InputMaybe<Scalars['String']>;
  searchWearableRarity_lte?: InputMaybe<Scalars['String']>;
  searchWearableRarity_in?: InputMaybe<Array<Scalars['String']>>;
  searchWearableRarity_not_in?: InputMaybe<Array<Scalars['String']>>;
  searchWearableRarity_contains?: InputMaybe<Scalars['String']>;
  searchWearableRarity_contains_nocase?: InputMaybe<Scalars['String']>;
  searchWearableRarity_not_contains?: InputMaybe<Scalars['String']>;
  searchWearableRarity_not_contains_nocase?: InputMaybe<Scalars['String']>;
  searchWearableRarity_starts_with?: InputMaybe<Scalars['String']>;
  searchWearableRarity_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchWearableRarity_not_starts_with?: InputMaybe<Scalars['String']>;
  searchWearableRarity_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchWearableRarity_ends_with?: InputMaybe<Scalars['String']>;
  searchWearableRarity_ends_with_nocase?: InputMaybe<Scalars['String']>;
  searchWearableRarity_not_ends_with?: InputMaybe<Scalars['String']>;
  searchWearableRarity_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  searchWearableBodyShapes?: InputMaybe<Array<WearableBodyShape>>;
  searchWearableBodyShapes_not?: InputMaybe<Array<WearableBodyShape>>;
  searchWearableBodyShapes_contains?: InputMaybe<Array<WearableBodyShape>>;
  searchWearableBodyShapes_contains_nocase?: InputMaybe<Array<WearableBodyShape>>;
  searchWearableBodyShapes_not_contains?: InputMaybe<Array<WearableBodyShape>>;
  searchWearableBodyShapes_not_contains_nocase?: InputMaybe<Array<WearableBodyShape>>;
  searchEmoteCategory?: InputMaybe<EmoteCategory>;
  searchEmoteCategory_not?: InputMaybe<EmoteCategory>;
  searchEmoteCategory_in?: InputMaybe<Array<EmoteCategory>>;
  searchEmoteCategory_not_in?: InputMaybe<Array<EmoteCategory>>;
  searchEmoteLoop?: InputMaybe<Scalars['Boolean']>;
  searchEmoteLoop_not?: InputMaybe<Scalars['Boolean']>;
  searchEmoteLoop_in?: InputMaybe<Array<Scalars['Boolean']>>;
  searchEmoteLoop_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  searchEmoteRarity?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_not?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_gt?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_lt?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_gte?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_lte?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_in?: InputMaybe<Array<Scalars['String']>>;
  searchEmoteRarity_not_in?: InputMaybe<Array<Scalars['String']>>;
  searchEmoteRarity_contains?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_contains_nocase?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_not_contains?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_not_contains_nocase?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_starts_with?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_not_starts_with?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_ends_with?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_ends_with_nocase?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_not_ends_with?: InputMaybe<Scalars['String']>;
  searchEmoteRarity_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  searchEmoteBodyShapes?: InputMaybe<Array<WearableBodyShape>>;
  searchEmoteBodyShapes_not?: InputMaybe<Array<WearableBodyShape>>;
  searchEmoteBodyShapes_contains?: InputMaybe<Array<WearableBodyShape>>;
  searchEmoteBodyShapes_contains_nocase?: InputMaybe<Array<WearableBodyShape>>;
  searchEmoteBodyShapes_not_contains?: InputMaybe<Array<WearableBodyShape>>;
  searchEmoteBodyShapes_not_contains_nocase?: InputMaybe<Array<WearableBodyShape>>;
  uniqueCollectors?: InputMaybe<Array<Scalars['String']>>;
  uniqueCollectors_not?: InputMaybe<Array<Scalars['String']>>;
  uniqueCollectors_contains?: InputMaybe<Array<Scalars['String']>>;
  uniqueCollectors_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  uniqueCollectors_not_contains?: InputMaybe<Array<Scalars['String']>>;
  uniqueCollectors_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  uniqueCollectorsTotal?: InputMaybe<Scalars['Int']>;
  uniqueCollectorsTotal_not?: InputMaybe<Scalars['Int']>;
  uniqueCollectorsTotal_gt?: InputMaybe<Scalars['Int']>;
  uniqueCollectorsTotal_lt?: InputMaybe<Scalars['Int']>;
  uniqueCollectorsTotal_gte?: InputMaybe<Scalars['Int']>;
  uniqueCollectorsTotal_lte?: InputMaybe<Scalars['Int']>;
  uniqueCollectorsTotal_in?: InputMaybe<Array<Scalars['Int']>>;
  uniqueCollectorsTotal_not_in?: InputMaybe<Array<Scalars['Int']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Item_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Item_filter>>>;
};

export type Item_orderBy =
  | 'id'
  | 'collection'
  | 'collection__id'
  | 'collection__owner'
  | 'collection__creator'
  | 'collection__name'
  | 'collection__symbol'
  | 'collection__isCompleted'
  | 'collection__isApproved'
  | 'collection__isEditable'
  | 'collection__urn'
  | 'collection__itemsCount'
  | 'collection__createdAt'
  | 'collection__updatedAt'
  | 'collection__reviewedAt'
  | 'collection__firstListedAt'
  | 'collection__searchIsStoreMinter'
  | 'collection__searchText'
  | 'blockchainId'
  | 'creator'
  | 'itemType'
  | 'totalSupply'
  | 'maxSupply'
  | 'rarity'
  | 'creationFee'
  | 'available'
  | 'price'
  | 'beneficiary'
  | 'contentHash'
  | 'URI'
  | 'image'
  | 'minters'
  | 'managers'
  | 'metadata'
  | 'metadata__id'
  | 'metadata__itemType'
  | 'rawMetadata'
  | 'urn'
  | 'nfts'
  | 'createdAt'
  | 'updatedAt'
  | 'reviewedAt'
  | 'soldAt'
  | 'firstListedAt'
  | 'sales'
  | 'volume'
  | 'searchText'
  | 'searchItemType'
  | 'searchIsCollectionApproved'
  | 'searchIsStoreMinter'
  | 'searchIsWearableHead'
  | 'searchIsWearableAccessory'
  | 'searchWearableCategory'
  | 'searchWearableRarity'
  | 'searchWearableBodyShapes'
  | 'searchEmoteCategory'
  | 'searchEmoteLoop'
  | 'searchEmoteRarity'
  | 'searchEmoteBodyShapes'
  | 'uniqueCollectors'
  | 'uniqueCollectorsTotal';

export type ItemsDayData = {
  id: Scalars['ID'];
  date: Scalars['Int'];
  sales: Scalars['Int'];
  volume: Scalars['BigInt'];
  searchEmoteCategory?: Maybe<EmoteCategory>;
  searchWearableCategory?: Maybe<WearableCategory>;
  searchRarity?: Maybe<Scalars['String']>;
};

export type ItemsDayData_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  date?: InputMaybe<Scalars['Int']>;
  date_not?: InputMaybe<Scalars['Int']>;
  date_gt?: InputMaybe<Scalars['Int']>;
  date_lt?: InputMaybe<Scalars['Int']>;
  date_gte?: InputMaybe<Scalars['Int']>;
  date_lte?: InputMaybe<Scalars['Int']>;
  date_in?: InputMaybe<Array<Scalars['Int']>>;
  date_not_in?: InputMaybe<Array<Scalars['Int']>>;
  sales?: InputMaybe<Scalars['Int']>;
  sales_not?: InputMaybe<Scalars['Int']>;
  sales_gt?: InputMaybe<Scalars['Int']>;
  sales_lt?: InputMaybe<Scalars['Int']>;
  sales_gte?: InputMaybe<Scalars['Int']>;
  sales_lte?: InputMaybe<Scalars['Int']>;
  sales_in?: InputMaybe<Array<Scalars['Int']>>;
  sales_not_in?: InputMaybe<Array<Scalars['Int']>>;
  volume?: InputMaybe<Scalars['BigInt']>;
  volume_not?: InputMaybe<Scalars['BigInt']>;
  volume_gt?: InputMaybe<Scalars['BigInt']>;
  volume_lt?: InputMaybe<Scalars['BigInt']>;
  volume_gte?: InputMaybe<Scalars['BigInt']>;
  volume_lte?: InputMaybe<Scalars['BigInt']>;
  volume_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchEmoteCategory?: InputMaybe<EmoteCategory>;
  searchEmoteCategory_not?: InputMaybe<EmoteCategory>;
  searchEmoteCategory_in?: InputMaybe<Array<EmoteCategory>>;
  searchEmoteCategory_not_in?: InputMaybe<Array<EmoteCategory>>;
  searchWearableCategory?: InputMaybe<WearableCategory>;
  searchWearableCategory_not?: InputMaybe<WearableCategory>;
  searchWearableCategory_in?: InputMaybe<Array<WearableCategory>>;
  searchWearableCategory_not_in?: InputMaybe<Array<WearableCategory>>;
  searchRarity?: InputMaybe<Scalars['String']>;
  searchRarity_not?: InputMaybe<Scalars['String']>;
  searchRarity_gt?: InputMaybe<Scalars['String']>;
  searchRarity_lt?: InputMaybe<Scalars['String']>;
  searchRarity_gte?: InputMaybe<Scalars['String']>;
  searchRarity_lte?: InputMaybe<Scalars['String']>;
  searchRarity_in?: InputMaybe<Array<Scalars['String']>>;
  searchRarity_not_in?: InputMaybe<Array<Scalars['String']>>;
  searchRarity_contains?: InputMaybe<Scalars['String']>;
  searchRarity_contains_nocase?: InputMaybe<Scalars['String']>;
  searchRarity_not_contains?: InputMaybe<Scalars['String']>;
  searchRarity_not_contains_nocase?: InputMaybe<Scalars['String']>;
  searchRarity_starts_with?: InputMaybe<Scalars['String']>;
  searchRarity_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchRarity_not_starts_with?: InputMaybe<Scalars['String']>;
  searchRarity_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchRarity_ends_with?: InputMaybe<Scalars['String']>;
  searchRarity_ends_with_nocase?: InputMaybe<Scalars['String']>;
  searchRarity_not_ends_with?: InputMaybe<Scalars['String']>;
  searchRarity_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ItemsDayData_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ItemsDayData_filter>>>;
};

export type ItemsDayData_orderBy =
  | 'id'
  | 'date'
  | 'sales'
  | 'volume'
  | 'searchEmoteCategory'
  | 'searchWearableCategory'
  | 'searchRarity';

export type Metadata = {
  id: Scalars['ID'];
  itemType: ItemType;
  wearable?: Maybe<Wearable>;
  emote?: Maybe<Emote>;
};

export type Metadata_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  itemType?: InputMaybe<ItemType>;
  itemType_not?: InputMaybe<ItemType>;
  itemType_in?: InputMaybe<Array<ItemType>>;
  itemType_not_in?: InputMaybe<Array<ItemType>>;
  wearable?: InputMaybe<Scalars['String']>;
  wearable_not?: InputMaybe<Scalars['String']>;
  wearable_gt?: InputMaybe<Scalars['String']>;
  wearable_lt?: InputMaybe<Scalars['String']>;
  wearable_gte?: InputMaybe<Scalars['String']>;
  wearable_lte?: InputMaybe<Scalars['String']>;
  wearable_in?: InputMaybe<Array<Scalars['String']>>;
  wearable_not_in?: InputMaybe<Array<Scalars['String']>>;
  wearable_contains?: InputMaybe<Scalars['String']>;
  wearable_contains_nocase?: InputMaybe<Scalars['String']>;
  wearable_not_contains?: InputMaybe<Scalars['String']>;
  wearable_not_contains_nocase?: InputMaybe<Scalars['String']>;
  wearable_starts_with?: InputMaybe<Scalars['String']>;
  wearable_starts_with_nocase?: InputMaybe<Scalars['String']>;
  wearable_not_starts_with?: InputMaybe<Scalars['String']>;
  wearable_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  wearable_ends_with?: InputMaybe<Scalars['String']>;
  wearable_ends_with_nocase?: InputMaybe<Scalars['String']>;
  wearable_not_ends_with?: InputMaybe<Scalars['String']>;
  wearable_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  wearable_?: InputMaybe<Wearable_filter>;
  emote?: InputMaybe<Scalars['String']>;
  emote_not?: InputMaybe<Scalars['String']>;
  emote_gt?: InputMaybe<Scalars['String']>;
  emote_lt?: InputMaybe<Scalars['String']>;
  emote_gte?: InputMaybe<Scalars['String']>;
  emote_lte?: InputMaybe<Scalars['String']>;
  emote_in?: InputMaybe<Array<Scalars['String']>>;
  emote_not_in?: InputMaybe<Array<Scalars['String']>>;
  emote_contains?: InputMaybe<Scalars['String']>;
  emote_contains_nocase?: InputMaybe<Scalars['String']>;
  emote_not_contains?: InputMaybe<Scalars['String']>;
  emote_not_contains_nocase?: InputMaybe<Scalars['String']>;
  emote_starts_with?: InputMaybe<Scalars['String']>;
  emote_starts_with_nocase?: InputMaybe<Scalars['String']>;
  emote_not_starts_with?: InputMaybe<Scalars['String']>;
  emote_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  emote_ends_with?: InputMaybe<Scalars['String']>;
  emote_ends_with_nocase?: InputMaybe<Scalars['String']>;
  emote_not_ends_with?: InputMaybe<Scalars['String']>;
  emote_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  emote_?: InputMaybe<Emote_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Metadata_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Metadata_filter>>>;
};

export type Metadata_orderBy =
  | 'id'
  | 'itemType'
  | 'wearable'
  | 'wearable__id'
  | 'wearable__name'
  | 'wearable__description'
  | 'wearable__collection'
  | 'wearable__category'
  | 'wearable__rarity'
  | 'emote'
  | 'emote__id'
  | 'emote__name'
  | 'emote__description'
  | 'emote__collection'
  | 'emote__category'
  | 'emote__loop'
  | 'emote__rarity';

export type Mint = {
  id: Scalars['ID'];
  item: Item;
  nft: NFT;
  creator: Scalars['String'];
  beneficiary: Scalars['String'];
  minter: Scalars['String'];
  timestamp: Scalars['BigInt'];
  searchPrimarySalePrice?: Maybe<Scalars['BigInt']>;
  searchContractAddress: Scalars['String'];
  searchItemId: Scalars['BigInt'];
  searchTokenId: Scalars['BigInt'];
  searchIssuedId?: Maybe<Scalars['BigInt']>;
  searchIsStoreMinter: Scalars['Boolean'];
};

export type Mint_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  item?: InputMaybe<Scalars['String']>;
  item_not?: InputMaybe<Scalars['String']>;
  item_gt?: InputMaybe<Scalars['String']>;
  item_lt?: InputMaybe<Scalars['String']>;
  item_gte?: InputMaybe<Scalars['String']>;
  item_lte?: InputMaybe<Scalars['String']>;
  item_in?: InputMaybe<Array<Scalars['String']>>;
  item_not_in?: InputMaybe<Array<Scalars['String']>>;
  item_contains?: InputMaybe<Scalars['String']>;
  item_contains_nocase?: InputMaybe<Scalars['String']>;
  item_not_contains?: InputMaybe<Scalars['String']>;
  item_not_contains_nocase?: InputMaybe<Scalars['String']>;
  item_starts_with?: InputMaybe<Scalars['String']>;
  item_starts_with_nocase?: InputMaybe<Scalars['String']>;
  item_not_starts_with?: InputMaybe<Scalars['String']>;
  item_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  item_ends_with?: InputMaybe<Scalars['String']>;
  item_ends_with_nocase?: InputMaybe<Scalars['String']>;
  item_not_ends_with?: InputMaybe<Scalars['String']>;
  item_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  item_?: InputMaybe<Item_filter>;
  nft?: InputMaybe<Scalars['String']>;
  nft_not?: InputMaybe<Scalars['String']>;
  nft_gt?: InputMaybe<Scalars['String']>;
  nft_lt?: InputMaybe<Scalars['String']>;
  nft_gte?: InputMaybe<Scalars['String']>;
  nft_lte?: InputMaybe<Scalars['String']>;
  nft_in?: InputMaybe<Array<Scalars['String']>>;
  nft_not_in?: InputMaybe<Array<Scalars['String']>>;
  nft_contains?: InputMaybe<Scalars['String']>;
  nft_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_not_contains?: InputMaybe<Scalars['String']>;
  nft_not_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_starts_with?: InputMaybe<Scalars['String']>;
  nft_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_starts_with?: InputMaybe<Scalars['String']>;
  nft_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_ends_with?: InputMaybe<Scalars['String']>;
  nft_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_ends_with?: InputMaybe<Scalars['String']>;
  nft_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_?: InputMaybe<NFT_filter>;
  creator?: InputMaybe<Scalars['String']>;
  creator_not?: InputMaybe<Scalars['String']>;
  creator_gt?: InputMaybe<Scalars['String']>;
  creator_lt?: InputMaybe<Scalars['String']>;
  creator_gte?: InputMaybe<Scalars['String']>;
  creator_lte?: InputMaybe<Scalars['String']>;
  creator_in?: InputMaybe<Array<Scalars['String']>>;
  creator_not_in?: InputMaybe<Array<Scalars['String']>>;
  creator_contains?: InputMaybe<Scalars['String']>;
  creator_contains_nocase?: InputMaybe<Scalars['String']>;
  creator_not_contains?: InputMaybe<Scalars['String']>;
  creator_not_contains_nocase?: InputMaybe<Scalars['String']>;
  creator_starts_with?: InputMaybe<Scalars['String']>;
  creator_starts_with_nocase?: InputMaybe<Scalars['String']>;
  creator_not_starts_with?: InputMaybe<Scalars['String']>;
  creator_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  creator_ends_with?: InputMaybe<Scalars['String']>;
  creator_ends_with_nocase?: InputMaybe<Scalars['String']>;
  creator_not_ends_with?: InputMaybe<Scalars['String']>;
  creator_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  beneficiary?: InputMaybe<Scalars['String']>;
  beneficiary_not?: InputMaybe<Scalars['String']>;
  beneficiary_gt?: InputMaybe<Scalars['String']>;
  beneficiary_lt?: InputMaybe<Scalars['String']>;
  beneficiary_gte?: InputMaybe<Scalars['String']>;
  beneficiary_lte?: InputMaybe<Scalars['String']>;
  beneficiary_in?: InputMaybe<Array<Scalars['String']>>;
  beneficiary_not_in?: InputMaybe<Array<Scalars['String']>>;
  beneficiary_contains?: InputMaybe<Scalars['String']>;
  beneficiary_contains_nocase?: InputMaybe<Scalars['String']>;
  beneficiary_not_contains?: InputMaybe<Scalars['String']>;
  beneficiary_not_contains_nocase?: InputMaybe<Scalars['String']>;
  beneficiary_starts_with?: InputMaybe<Scalars['String']>;
  beneficiary_starts_with_nocase?: InputMaybe<Scalars['String']>;
  beneficiary_not_starts_with?: InputMaybe<Scalars['String']>;
  beneficiary_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  beneficiary_ends_with?: InputMaybe<Scalars['String']>;
  beneficiary_ends_with_nocase?: InputMaybe<Scalars['String']>;
  beneficiary_not_ends_with?: InputMaybe<Scalars['String']>;
  beneficiary_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  minter?: InputMaybe<Scalars['String']>;
  minter_not?: InputMaybe<Scalars['String']>;
  minter_gt?: InputMaybe<Scalars['String']>;
  minter_lt?: InputMaybe<Scalars['String']>;
  minter_gte?: InputMaybe<Scalars['String']>;
  minter_lte?: InputMaybe<Scalars['String']>;
  minter_in?: InputMaybe<Array<Scalars['String']>>;
  minter_not_in?: InputMaybe<Array<Scalars['String']>>;
  minter_contains?: InputMaybe<Scalars['String']>;
  minter_contains_nocase?: InputMaybe<Scalars['String']>;
  minter_not_contains?: InputMaybe<Scalars['String']>;
  minter_not_contains_nocase?: InputMaybe<Scalars['String']>;
  minter_starts_with?: InputMaybe<Scalars['String']>;
  minter_starts_with_nocase?: InputMaybe<Scalars['String']>;
  minter_not_starts_with?: InputMaybe<Scalars['String']>;
  minter_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  minter_ends_with?: InputMaybe<Scalars['String']>;
  minter_ends_with_nocase?: InputMaybe<Scalars['String']>;
  minter_not_ends_with?: InputMaybe<Scalars['String']>;
  minter_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchPrimarySalePrice?: InputMaybe<Scalars['BigInt']>;
  searchPrimarySalePrice_not?: InputMaybe<Scalars['BigInt']>;
  searchPrimarySalePrice_gt?: InputMaybe<Scalars['BigInt']>;
  searchPrimarySalePrice_lt?: InputMaybe<Scalars['BigInt']>;
  searchPrimarySalePrice_gte?: InputMaybe<Scalars['BigInt']>;
  searchPrimarySalePrice_lte?: InputMaybe<Scalars['BigInt']>;
  searchPrimarySalePrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchPrimarySalePrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchContractAddress?: InputMaybe<Scalars['String']>;
  searchContractAddress_not?: InputMaybe<Scalars['String']>;
  searchContractAddress_gt?: InputMaybe<Scalars['String']>;
  searchContractAddress_lt?: InputMaybe<Scalars['String']>;
  searchContractAddress_gte?: InputMaybe<Scalars['String']>;
  searchContractAddress_lte?: InputMaybe<Scalars['String']>;
  searchContractAddress_in?: InputMaybe<Array<Scalars['String']>>;
  searchContractAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  searchContractAddress_contains?: InputMaybe<Scalars['String']>;
  searchContractAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  searchContractAddress_not_contains?: InputMaybe<Scalars['String']>;
  searchContractAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  searchContractAddress_starts_with?: InputMaybe<Scalars['String']>;
  searchContractAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchContractAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  searchContractAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  searchContractAddress_ends_with?: InputMaybe<Scalars['String']>;
  searchContractAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  searchContractAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  searchContractAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  searchItemId?: InputMaybe<Scalars['BigInt']>;
  searchItemId_not?: InputMaybe<Scalars['BigInt']>;
  searchItemId_gt?: InputMaybe<Scalars['BigInt']>;
  searchItemId_lt?: InputMaybe<Scalars['BigInt']>;
  searchItemId_gte?: InputMaybe<Scalars['BigInt']>;
  searchItemId_lte?: InputMaybe<Scalars['BigInt']>;
  searchItemId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchItemId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchTokenId?: InputMaybe<Scalars['BigInt']>;
  searchTokenId_not?: InputMaybe<Scalars['BigInt']>;
  searchTokenId_gt?: InputMaybe<Scalars['BigInt']>;
  searchTokenId_lt?: InputMaybe<Scalars['BigInt']>;
  searchTokenId_gte?: InputMaybe<Scalars['BigInt']>;
  searchTokenId_lte?: InputMaybe<Scalars['BigInt']>;
  searchTokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchTokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchIssuedId?: InputMaybe<Scalars['BigInt']>;
  searchIssuedId_not?: InputMaybe<Scalars['BigInt']>;
  searchIssuedId_gt?: InputMaybe<Scalars['BigInt']>;
  searchIssuedId_lt?: InputMaybe<Scalars['BigInt']>;
  searchIssuedId_gte?: InputMaybe<Scalars['BigInt']>;
  searchIssuedId_lte?: InputMaybe<Scalars['BigInt']>;
  searchIssuedId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchIssuedId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchIsStoreMinter?: InputMaybe<Scalars['Boolean']>;
  searchIsStoreMinter_not?: InputMaybe<Scalars['Boolean']>;
  searchIsStoreMinter_in?: InputMaybe<Array<Scalars['Boolean']>>;
  searchIsStoreMinter_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Mint_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Mint_filter>>>;
};

export type Mint_orderBy =
  | 'id'
  | 'item'
  | 'item__id'
  | 'item__blockchainId'
  | 'item__creator'
  | 'item__itemType'
  | 'item__totalSupply'
  | 'item__maxSupply'
  | 'item__rarity'
  | 'item__creationFee'
  | 'item__available'
  | 'item__price'
  | 'item__beneficiary'
  | 'item__contentHash'
  | 'item__URI'
  | 'item__image'
  | 'item__rawMetadata'
  | 'item__urn'
  | 'item__createdAt'
  | 'item__updatedAt'
  | 'item__reviewedAt'
  | 'item__soldAt'
  | 'item__firstListedAt'
  | 'item__sales'
  | 'item__volume'
  | 'item__searchText'
  | 'item__searchItemType'
  | 'item__searchIsCollectionApproved'
  | 'item__searchIsStoreMinter'
  | 'item__searchIsWearableHead'
  | 'item__searchIsWearableAccessory'
  | 'item__searchWearableCategory'
  | 'item__searchWearableRarity'
  | 'item__searchEmoteCategory'
  | 'item__searchEmoteLoop'
  | 'item__searchEmoteRarity'
  | 'item__uniqueCollectorsTotal'
  | 'nft'
  | 'nft__id'
  | 'nft__tokenId'
  | 'nft__category'
  | 'nft__contractAddress'
  | 'nft__itemBlockchainId'
  | 'nft__issuedId'
  | 'nft__itemType'
  | 'nft__tokenURI'
  | 'nft__image'
  | 'nft__urn'
  | 'nft__createdAt'
  | 'nft__updatedAt'
  | 'nft__soldAt'
  | 'nft__transferredAt'
  | 'nft__sales'
  | 'nft__volume'
  | 'nft__searchText'
  | 'nft__searchItemType'
  | 'nft__searchIsWearableHead'
  | 'nft__searchIsWearableAccessory'
  | 'nft__searchWearableCategory'
  | 'nft__searchWearableRarity'
  | 'nft__searchEmoteCategory'
  | 'nft__searchEmoteLoop'
  | 'nft__searchEmoteRarity'
  | 'nft__searchOrderStatus'
  | 'nft__searchOrderPrice'
  | 'nft__searchOrderExpiresAt'
  | 'nft__searchOrderCreatedAt'
  | 'creator'
  | 'beneficiary'
  | 'minter'
  | 'timestamp'
  | 'searchPrimarySalePrice'
  | 'searchContractAddress'
  | 'searchItemId'
  | 'searchTokenId'
  | 'searchIssuedId'
  | 'searchIsStoreMinter';

export type Rarity = {
  id: Scalars['ID'];
  name: Scalars['String'];
  maxSupply: Scalars['BigInt'];
  price: Scalars['BigInt'];
  currency: Currency;
};

export type Rarity_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  maxSupply?: InputMaybe<Scalars['BigInt']>;
  maxSupply_not?: InputMaybe<Scalars['BigInt']>;
  maxSupply_gt?: InputMaybe<Scalars['BigInt']>;
  maxSupply_lt?: InputMaybe<Scalars['BigInt']>;
  maxSupply_gte?: InputMaybe<Scalars['BigInt']>;
  maxSupply_lte?: InputMaybe<Scalars['BigInt']>;
  maxSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price?: InputMaybe<Scalars['BigInt']>;
  price_not?: InputMaybe<Scalars['BigInt']>;
  price_gt?: InputMaybe<Scalars['BigInt']>;
  price_lt?: InputMaybe<Scalars['BigInt']>;
  price_gte?: InputMaybe<Scalars['BigInt']>;
  price_lte?: InputMaybe<Scalars['BigInt']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currency?: InputMaybe<Currency>;
  currency_not?: InputMaybe<Currency>;
  currency_in?: InputMaybe<Array<Currency>>;
  currency_not_in?: InputMaybe<Array<Currency>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Rarity_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Rarity_filter>>>;
};

export type Rarity_orderBy =
  | 'id'
  | 'name'
  | 'maxSupply'
  | 'price'
  | 'currency';

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  Account: ResolverTypeWrapper<Account>;
  Account_filter: Account_filter;
  Account_orderBy: Account_orderBy;
  AnalyticsDayData: ResolverTypeWrapper<AnalyticsDayData>;
  AnalyticsDayData_filter: AnalyticsDayData_filter;
  AnalyticsDayData_orderBy: AnalyticsDayData_orderBy;
  Bid: ResolverTypeWrapper<Bid>;
  Bid_filter: Bid_filter;
  Bid_orderBy: Bid_orderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Category: Category;
  Count: ResolverTypeWrapper<Count>;
  Count_filter: Count_filter;
  Count_orderBy: Count_orderBy;
  Data: ResolverTypeWrapper<Data>;
  Data_filter: Data_filter;
  Data_orderBy: Data_orderBy;
  ENS: ResolverTypeWrapper<ENS>;
  ENS_filter: ENS_filter;
  ENS_orderBy: ENS_orderBy;
  Estate: ResolverTypeWrapper<Estate>;
  Estate_filter: Estate_filter;
  Estate_orderBy: Estate_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  NFT: ResolverTypeWrapper<NFT>;
  NFT_filter: NFT_filter;
  NFT_orderBy: NFT_orderBy;
  Order: ResolverTypeWrapper<Order>;
  OrderDirection: OrderDirection;
  OrderStatus: OrderStatus;
  Order_filter: Order_filter;
  Order_orderBy: Order_orderBy;
  Parcel: ResolverTypeWrapper<Parcel>;
  Parcel_filter: Parcel_filter;
  Parcel_orderBy: Parcel_orderBy;
  Sale: ResolverTypeWrapper<Sale>;
  SaleType: SaleType;
  Sale_filter: Sale_filter;
  Sale_orderBy: Sale_orderBy;
  String: ResolverTypeWrapper<Scalars['String']>;
  Wearable: ResolverTypeWrapper<Wearable>;
  WearableBodyShape: WearableBodyShape;
  WearableCategory: WearableCategory;
  WearableRarity: WearableRarity;
  Wearable_filter: Wearable_filter;
  Wearable_orderBy: Wearable_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
  AccountsDayData: ResolverTypeWrapper<AccountsDayData>;
  AccountsDayData_filter: AccountsDayData_filter;
  AccountsDayData_orderBy: AccountsDayData_orderBy;
  Collection: ResolverTypeWrapper<Collection>;
  Collection_filter: Collection_filter;
  Collection_orderBy: Collection_orderBy;
  Curation: ResolverTypeWrapper<Curation>;
  Curation_filter: Curation_filter;
  Curation_orderBy: Curation_orderBy;
  Currency: Currency;
  Emote: ResolverTypeWrapper<Emote>;
  EmoteCategory: EmoteCategory;
  Emote_filter: Emote_filter;
  Emote_orderBy: Emote_orderBy;
  Item: ResolverTypeWrapper<Item>;
  ItemType: ItemType;
  Item_filter: Item_filter;
  Item_orderBy: Item_orderBy;
  ItemsDayData: ResolverTypeWrapper<ItemsDayData>;
  ItemsDayData_filter: ItemsDayData_filter;
  ItemsDayData_orderBy: ItemsDayData_orderBy;
  Metadata: ResolverTypeWrapper<Metadata>;
  Metadata_filter: Metadata_filter;
  Metadata_orderBy: Metadata_orderBy;
  Mint: ResolverTypeWrapper<Mint>;
  Mint_filter: Mint_filter;
  Mint_orderBy: Mint_orderBy;
  Rarity: ResolverTypeWrapper<Rarity>;
  Rarity_filter: Rarity_filter;
  Rarity_orderBy: Rarity_orderBy;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Subscription: {};
  Account: Account;
  Account_filter: Account_filter;
  AnalyticsDayData: AnalyticsDayData;
  AnalyticsDayData_filter: AnalyticsDayData_filter;
  Bid: Bid;
  Bid_filter: Bid_filter;
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  Count: Count;
  Count_filter: Count_filter;
  Data: Data;
  Data_filter: Data_filter;
  ENS: ENS;
  ENS_filter: ENS_filter;
  Estate: Estate;
  Estate_filter: Estate_filter;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  NFT: NFT;
  NFT_filter: NFT_filter;
  Order: Order;
  Order_filter: Order_filter;
  Parcel: Parcel;
  Parcel_filter: Parcel_filter;
  Sale: Sale;
  Sale_filter: Sale_filter;
  String: Scalars['String'];
  Wearable: Wearable;
  Wearable_filter: Wearable_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
  AccountsDayData: AccountsDayData;
  AccountsDayData_filter: AccountsDayData_filter;
  Collection: Collection;
  Collection_filter: Collection_filter;
  Curation: Curation;
  Curation_filter: Curation_filter;
  Emote: Emote;
  Emote_filter: Emote_filter;
  Item: Item;
  Item_filter: Item_filter;
  ItemsDayData: ItemsDayData;
  ItemsDayData_filter: ItemsDayData_filter;
  Metadata: Metadata;
  Metadata_filter: Metadata_filter;
  Mint: Mint;
  Mint_filter: Mint_filter;
  Rarity: Rarity;
  Rarity_filter: Rarity_filter;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  count?: Resolver<Maybe<ResolversTypes['Count']>, ParentType, ContextType, RequireFields<QuerycountArgs, 'id' | 'subgraphError'>>;
  counts?: Resolver<Array<ResolversTypes['Count']>, ParentType, ContextType, RequireFields<QuerycountsArgs, 'skip' | 'first' | 'subgraphError'>>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryorderArgs, 'id' | 'subgraphError'>>;
  orders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryordersArgs, 'skip' | 'first' | 'subgraphError'>>;
  bid?: Resolver<Maybe<ResolversTypes['Bid']>, ParentType, ContextType, RequireFields<QuerybidArgs, 'id' | 'subgraphError'>>;
  bids?: Resolver<Array<ResolversTypes['Bid']>, ParentType, ContextType, RequireFields<QuerybidsArgs, 'skip' | 'first' | 'subgraphError'>>;
  parcel?: Resolver<Maybe<ResolversTypes['Parcel']>, ParentType, ContextType, RequireFields<QueryparcelArgs, 'id' | 'subgraphError'>>;
  parcels?: Resolver<Array<ResolversTypes['Parcel']>, ParentType, ContextType, RequireFields<QueryparcelsArgs, 'skip' | 'first' | 'subgraphError'>>;
  estate?: Resolver<Maybe<ResolversTypes['Estate']>, ParentType, ContextType, RequireFields<QueryestateArgs, 'id' | 'subgraphError'>>;
  estates?: Resolver<Array<ResolversTypes['Estate']>, ParentType, ContextType, RequireFields<QueryestatesArgs, 'skip' | 'first' | 'subgraphError'>>;
  data?: Resolver<Maybe<ResolversTypes['Data']>, ParentType, ContextType, RequireFields<QuerydataArgs, 'id' | 'subgraphError'>>;
  datas?: Resolver<Array<ResolversTypes['Data']>, ParentType, ContextType, RequireFields<QuerydatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  wearable?: Resolver<Maybe<ResolversTypes['Wearable']>, ParentType, ContextType, RequireFields<QuerywearableArgs, 'id' | 'subgraphError'>>;
  wearables?: Resolver<Array<ResolversTypes['Wearable']>, ParentType, ContextType, RequireFields<QuerywearablesArgs, 'skip' | 'first' | 'subgraphError'>>;
  ens?: Resolver<Maybe<ResolversTypes['ENS']>, ParentType, ContextType, RequireFields<QueryensArgs, 'id' | 'subgraphError'>>;
  enss?: Resolver<Array<ResolversTypes['ENS']>, ParentType, ContextType, RequireFields<QueryenssArgs, 'skip' | 'first' | 'subgraphError'>>;
  nft?: Resolver<Maybe<ResolversTypes['NFT']>, ParentType, ContextType, RequireFields<QuerynftArgs, 'id' | 'subgraphError'>>;
  legacyNFTs?: Resolver<Array<ResolversTypes['NFT']>, ParentType, ContextType, RequireFields<QuerylegacyNFTsArgs, 'skip' | 'first' | 'subgraphError'>>;
  account?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryaccountArgs, 'id' | 'subgraphError'>>;
  accounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryaccountsArgs, 'skip' | 'first' | 'subgraphError'>>;
  sale?: Resolver<Maybe<ResolversTypes['Sale']>, ParentType, ContextType, RequireFields<QuerysaleArgs, 'id' | 'subgraphError'>>;
  sales?: Resolver<Array<ResolversTypes['Sale']>, ParentType, ContextType, RequireFields<QuerysalesArgs, 'skip' | 'first' | 'subgraphError'>>;
  analyticsDayData?: Resolver<Maybe<ResolversTypes['AnalyticsDayData']>, ParentType, ContextType, RequireFields<QueryanalyticsDayDataArgs, 'id' | 'subgraphError'>>;
  analyticsDayDatas?: Resolver<Array<ResolversTypes['AnalyticsDayData']>, ParentType, ContextType, RequireFields<QueryanalyticsDayDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
  collection?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType, RequireFields<QuerycollectionArgs, 'id' | 'subgraphError'>>;
  collections?: Resolver<Array<ResolversTypes['Collection']>, ParentType, ContextType, RequireFields<QuerycollectionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  item?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType, RequireFields<QueryitemArgs, 'id' | 'subgraphError'>>;
  items?: Resolver<Array<ResolversTypes['Item']>, ParentType, ContextType, RequireFields<QueryitemsArgs, 'skip' | 'first' | 'subgraphError'>>;
  nfts?: Resolver<Array<ResolversTypes['NFT']>, ParentType, ContextType, RequireFields<QuerynftsArgs, 'skip' | 'first' | 'subgraphError'>>;
  metadata?: Resolver<Array<ResolversTypes['Metadata']>, ParentType, ContextType, RequireFields<QuerymetadataArgs, 'skip' | 'first' | 'subgraphError'>>;
  emote?: Resolver<Maybe<ResolversTypes['Emote']>, ParentType, ContextType, RequireFields<QueryemoteArgs, 'id' | 'subgraphError'>>;
  emotes?: Resolver<Array<ResolversTypes['Emote']>, ParentType, ContextType, RequireFields<QueryemotesArgs, 'skip' | 'first' | 'subgraphError'>>;
  rarity?: Resolver<Maybe<ResolversTypes['Rarity']>, ParentType, ContextType, RequireFields<QueryrarityArgs, 'id' | 'subgraphError'>>;
  rarities?: Resolver<Array<ResolversTypes['Rarity']>, ParentType, ContextType, RequireFields<QueryraritiesArgs, 'skip' | 'first' | 'subgraphError'>>;
  mint?: Resolver<Maybe<ResolversTypes['Mint']>, ParentType, ContextType, RequireFields<QuerymintArgs, 'id' | 'subgraphError'>>;
  mints?: Resolver<Array<ResolversTypes['Mint']>, ParentType, ContextType, RequireFields<QuerymintsArgs, 'skip' | 'first' | 'subgraphError'>>;
  curation?: Resolver<Maybe<ResolversTypes['Curation']>, ParentType, ContextType, RequireFields<QuerycurationArgs, 'id' | 'subgraphError'>>;
  curations?: Resolver<Array<ResolversTypes['Curation']>, ParentType, ContextType, RequireFields<QuerycurationsArgs, 'skip' | 'first' | 'subgraphError'>>;
  itemsDayData?: Resolver<Maybe<ResolversTypes['ItemsDayData']>, ParentType, ContextType, RequireFields<QueryitemsDayDataArgs, 'id' | 'subgraphError'>>;
  itemsDayDatas?: Resolver<Array<ResolversTypes['ItemsDayData']>, ParentType, ContextType, RequireFields<QueryitemsDayDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  accountsDayData?: Resolver<Maybe<ResolversTypes['AccountsDayData']>, ParentType, ContextType, RequireFields<QueryaccountsDayDataArgs, 'id' | 'subgraphError'>>;
  accountsDayDatas?: Resolver<Array<ResolversTypes['AccountsDayData']>, ParentType, ContextType, RequireFields<QueryaccountsDayDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  count?: SubscriptionResolver<Maybe<ResolversTypes['Count']>, "count", ParentType, ContextType, RequireFields<SubscriptioncountArgs, 'id' | 'subgraphError'>>;
  counts?: SubscriptionResolver<Array<ResolversTypes['Count']>, "counts", ParentType, ContextType, RequireFields<SubscriptioncountsArgs, 'skip' | 'first' | 'subgraphError'>>;
  order?: SubscriptionResolver<Maybe<ResolversTypes['Order']>, "order", ParentType, ContextType, RequireFields<SubscriptionorderArgs, 'id' | 'subgraphError'>>;
  orders?: SubscriptionResolver<Array<ResolversTypes['Order']>, "orders", ParentType, ContextType, RequireFields<SubscriptionordersArgs, 'skip' | 'first' | 'subgraphError'>>;
  bid?: SubscriptionResolver<Maybe<ResolversTypes['Bid']>, "bid", ParentType, ContextType, RequireFields<SubscriptionbidArgs, 'id' | 'subgraphError'>>;
  bids?: SubscriptionResolver<Array<ResolversTypes['Bid']>, "bids", ParentType, ContextType, RequireFields<SubscriptionbidsArgs, 'skip' | 'first' | 'subgraphError'>>;
  parcel?: SubscriptionResolver<Maybe<ResolversTypes['Parcel']>, "parcel", ParentType, ContextType, RequireFields<SubscriptionparcelArgs, 'id' | 'subgraphError'>>;
  parcels?: SubscriptionResolver<Array<ResolversTypes['Parcel']>, "parcels", ParentType, ContextType, RequireFields<SubscriptionparcelsArgs, 'skip' | 'first' | 'subgraphError'>>;
  estate?: SubscriptionResolver<Maybe<ResolversTypes['Estate']>, "estate", ParentType, ContextType, RequireFields<SubscriptionestateArgs, 'id' | 'subgraphError'>>;
  estates?: SubscriptionResolver<Array<ResolversTypes['Estate']>, "estates", ParentType, ContextType, RequireFields<SubscriptionestatesArgs, 'skip' | 'first' | 'subgraphError'>>;
  data?: SubscriptionResolver<Maybe<ResolversTypes['Data']>, "data", ParentType, ContextType, RequireFields<SubscriptiondataArgs, 'id' | 'subgraphError'>>;
  datas?: SubscriptionResolver<Array<ResolversTypes['Data']>, "datas", ParentType, ContextType, RequireFields<SubscriptiondatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  wearable?: SubscriptionResolver<Maybe<ResolversTypes['Wearable']>, "wearable", ParentType, ContextType, RequireFields<SubscriptionwearableArgs, 'id' | 'subgraphError'>>;
  wearables?: SubscriptionResolver<Array<ResolversTypes['Wearable']>, "wearables", ParentType, ContextType, RequireFields<SubscriptionwearablesArgs, 'skip' | 'first' | 'subgraphError'>>;
  ens?: SubscriptionResolver<Maybe<ResolversTypes['ENS']>, "ens", ParentType, ContextType, RequireFields<SubscriptionensArgs, 'id' | 'subgraphError'>>;
  enss?: SubscriptionResolver<Array<ResolversTypes['ENS']>, "enss", ParentType, ContextType, RequireFields<SubscriptionenssArgs, 'skip' | 'first' | 'subgraphError'>>;
  nft?: SubscriptionResolver<Maybe<ResolversTypes['NFT']>, "nft", ParentType, ContextType, RequireFields<SubscriptionnftArgs, 'id' | 'subgraphError'>>;
  nfts?: SubscriptionResolver<Array<ResolversTypes['NFT']>, "nfts", ParentType, ContextType, RequireFields<SubscriptionnftsArgs, 'skip' | 'first' | 'subgraphError'>>;
  account?: SubscriptionResolver<Maybe<ResolversTypes['Account']>, "account", ParentType, ContextType, RequireFields<SubscriptionaccountArgs, 'id' | 'subgraphError'>>;
  accounts?: SubscriptionResolver<Array<ResolversTypes['Account']>, "accounts", ParentType, ContextType, RequireFields<SubscriptionaccountsArgs, 'skip' | 'first' | 'subgraphError'>>;
  sale?: SubscriptionResolver<Maybe<ResolversTypes['Sale']>, "sale", ParentType, ContextType, RequireFields<SubscriptionsaleArgs, 'id' | 'subgraphError'>>;
  sales?: SubscriptionResolver<Array<ResolversTypes['Sale']>, "sales", ParentType, ContextType, RequireFields<SubscriptionsalesArgs, 'skip' | 'first' | 'subgraphError'>>;
  analyticsDayData?: SubscriptionResolver<Maybe<ResolversTypes['AnalyticsDayData']>, "analyticsDayData", ParentType, ContextType, RequireFields<SubscriptionanalyticsDayDataArgs, 'id' | 'subgraphError'>>;
  analyticsDayDatas?: SubscriptionResolver<Array<ResolversTypes['AnalyticsDayData']>, "analyticsDayDatas", ParentType, ContextType, RequireFields<SubscriptionanalyticsDayDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
  collection?: SubscriptionResolver<Maybe<ResolversTypes['Collection']>, "collection", ParentType, ContextType, RequireFields<SubscriptioncollectionArgs, 'id' | 'subgraphError'>>;
  collections?: SubscriptionResolver<Array<ResolversTypes['Collection']>, "collections", ParentType, ContextType, RequireFields<SubscriptioncollectionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  item?: SubscriptionResolver<Maybe<ResolversTypes['Item']>, "item", ParentType, ContextType, RequireFields<SubscriptionitemArgs, 'id' | 'subgraphError'>>;
  items?: SubscriptionResolver<Array<ResolversTypes['Item']>, "items", ParentType, ContextType, RequireFields<SubscriptionitemsArgs, 'skip' | 'first' | 'subgraphError'>>;
  metadata?: SubscriptionResolver<Array<ResolversTypes['Metadata']>, "metadata", ParentType, ContextType, RequireFields<SubscriptionmetadataArgs, 'skip' | 'first' | 'subgraphError'>>;
  emote?: SubscriptionResolver<Maybe<ResolversTypes['Emote']>, "emote", ParentType, ContextType, RequireFields<SubscriptionemoteArgs, 'id' | 'subgraphError'>>;
  emotes?: SubscriptionResolver<Array<ResolversTypes['Emote']>, "emotes", ParentType, ContextType, RequireFields<SubscriptionemotesArgs, 'skip' | 'first' | 'subgraphError'>>;
  rarity?: SubscriptionResolver<Maybe<ResolversTypes['Rarity']>, "rarity", ParentType, ContextType, RequireFields<SubscriptionrarityArgs, 'id' | 'subgraphError'>>;
  rarities?: SubscriptionResolver<Array<ResolversTypes['Rarity']>, "rarities", ParentType, ContextType, RequireFields<SubscriptionraritiesArgs, 'skip' | 'first' | 'subgraphError'>>;
  mint?: SubscriptionResolver<Maybe<ResolversTypes['Mint']>, "mint", ParentType, ContextType, RequireFields<SubscriptionmintArgs, 'id' | 'subgraphError'>>;
  mints?: SubscriptionResolver<Array<ResolversTypes['Mint']>, "mints", ParentType, ContextType, RequireFields<SubscriptionmintsArgs, 'skip' | 'first' | 'subgraphError'>>;
  curation?: SubscriptionResolver<Maybe<ResolversTypes['Curation']>, "curation", ParentType, ContextType, RequireFields<SubscriptioncurationArgs, 'id' | 'subgraphError'>>;
  curations?: SubscriptionResolver<Array<ResolversTypes['Curation']>, "curations", ParentType, ContextType, RequireFields<SubscriptioncurationsArgs, 'skip' | 'first' | 'subgraphError'>>;
  itemsDayData?: SubscriptionResolver<Maybe<ResolversTypes['ItemsDayData']>, "itemsDayData", ParentType, ContextType, RequireFields<SubscriptionitemsDayDataArgs, 'id' | 'subgraphError'>>;
  itemsDayDatas?: SubscriptionResolver<Array<ResolversTypes['ItemsDayData']>, "itemsDayDatas", ParentType, ContextType, RequireFields<SubscriptionitemsDayDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  accountsDayData?: SubscriptionResolver<Maybe<ResolversTypes['AccountsDayData']>, "accountsDayData", ParentType, ContextType, RequireFields<SubscriptionaccountsDayDataArgs, 'id' | 'subgraphError'>>;
  accountsDayDatas?: SubscriptionResolver<Array<ResolversTypes['AccountsDayData']>, "accountsDayDatas", ParentType, ContextType, RequireFields<SubscriptionaccountsDayDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
}>;

export type AccountResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  nfts?: Resolver<Maybe<Array<ResolversTypes['NFT']>>, ParentType, ContextType, RequireFields<AccountnftsArgs, 'skip' | 'first'>>;
  sales?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  purchases?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  spent?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  earned?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  isCommitteeMember?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  totalCurations?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  primarySales?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  primarySalesEarned?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  royalties?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  uniqueAndMythicItems?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  uniqueAndMythicItemsTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  collections?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  creatorsSupported?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  creatorsSupportedTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  uniqueCollectors?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  uniqueCollectorsTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AnalyticsDayDataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['AnalyticsDayData'] = ResolversParentTypes['AnalyticsDayData']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sales?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  volume?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  creatorsEarnings?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  daoEarnings?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BidResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Bid'] = ResolversParentTypes['Bid']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  bidAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  nft?: Resolver<Maybe<ResolversTypes['NFT']>, ParentType, ContextType>;
  nftAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  bidder?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  seller?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fingerprint?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['OrderStatus'], ParentType, ContextType>;
  blockchainId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  expiresAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type CountResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Count'] = ResolversParentTypes['Count']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  orderTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  orderParcel?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  orderEstate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  orderWearable?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  orderENS?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  parcelTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  estateTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  wearableTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ensTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  started?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  salesTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  salesManaTotal?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  creatorEarningsManaTotal?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  daoEarningsManaTotal?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  bidTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  collectionTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  itemTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  nftTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  primarySalesTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  primarySalesManaTotal?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  secondarySalesTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  secondarySalesManaTotal?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  royaltiesManaTotal?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Data'] = ResolversParentTypes['Data']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  parcel?: Resolver<Maybe<ResolversTypes['Parcel']>, ParentType, ContextType>;
  estate?: Resolver<Maybe<ResolversTypes['Estate']>, ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ipns?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ENSResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ENS'] = ResolversParentTypes['ENS']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  caller?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  beneficiary?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  labelHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  subdomain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  nft?: Resolver<Maybe<ResolversTypes['NFT']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EstateResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Estate'] = ResolversParentTypes['Estate']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  parcels?: Resolver<Array<ResolversTypes['Parcel']>, ParentType, ContextType, RequireFields<EstateparcelsArgs, 'skip' | 'first'>>;
  parcelDistances?: Resolver<Maybe<Array<ResolversTypes['Int']>>, ParentType, ContextType>;
  adjacentToRoadCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['Data']>, ParentType, ContextType>;
  rawData?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nft?: Resolver<Maybe<ResolversTypes['NFT']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NFTResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NFT'] = ResolversParentTypes['NFT']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  contractAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  tokenURI?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orders?: Resolver<Maybe<Array<ResolversTypes['Order']>>, ParentType, ContextType, RequireFields<NFTordersArgs, 'skip' | 'first'>>;
  bids?: Resolver<Maybe<Array<ResolversTypes['Bid']>>, ParentType, ContextType, RequireFields<NFTbidsArgs, 'skip' | 'first'>>;
  activeOrder?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parcel?: Resolver<Maybe<ResolversTypes['Parcel']>, ParentType, ContextType>;
  estate?: Resolver<Maybe<ResolversTypes['Estate']>, ParentType, ContextType>;
  wearable?: Resolver<Maybe<ResolversTypes['Wearable']>, ParentType, ContextType>;
  ens?: Resolver<Maybe<ResolversTypes['ENS']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  soldAt?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  transferredAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  sales?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  volume?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  searchOrderStatus?: Resolver<Maybe<ResolversTypes['OrderStatus']>, ParentType, ContextType>;
  searchOrderPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  searchOrderExpiresAt?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  searchOrderCreatedAt?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  searchIsLand?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  searchText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  searchParcelIsInBounds?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  searchParcelX?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  searchParcelY?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  searchParcelEstateId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  searchDistanceToPlaza?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  searchAdjacentToRoad?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  searchEstateSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  searchIsWearableHead?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  searchIsWearableAccessory?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  searchWearableRarity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  searchWearableCategory?: Resolver<Maybe<ResolversTypes['WearableCategory']>, ParentType, ContextType>;
  searchWearableBodyShapes?: Resolver<Maybe<Array<ResolversTypes['WearableBodyShape']>>, ParentType, ContextType>;
  itemBlockchainId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  issuedId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  itemType?: Resolver<ResolversTypes['ItemType'], ParentType, ContextType>;
  urn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  collection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType>;
  item?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['Metadata']>, ParentType, ContextType>;
  searchItemType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  searchEmoteCategory?: Resolver<Maybe<ResolversTypes['EmoteCategory']>, ParentType, ContextType>;
  searchEmoteLoop?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  searchEmoteRarity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  searchEmoteBodyShapes?: Resolver<Maybe<Array<ResolversTypes['WearableBodyShape']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OrderResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  marketplaceAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  nft?: Resolver<Maybe<ResolversTypes['NFT']>, ParentType, ContextType>;
  nftAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  buyer?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['OrderStatus'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  expiresAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ParcelResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Parcel'] = ResolversParentTypes['Parcel']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  x?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  y?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  estate?: Resolver<Maybe<ResolversTypes['Estate']>, ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['Data']>, ParentType, ContextType>;
  rawData?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nft?: Resolver<Maybe<ResolversTypes['NFT']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaleResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Sale'] = ResolversParentTypes['Sale']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SaleType'], ParentType, ContextType>;
  buyer?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  seller?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  nft?: Resolver<ResolversTypes['NFT'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  searchTokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  searchContractAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  searchCategory?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  beneficiary?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  feesCollectorCut?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  feesCollector?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  royaltiesCut?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  royaltiesCollector?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  item?: Resolver<ResolversTypes['Item'], ParentType, ContextType>;
  searchItemId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WearableResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Wearable'] = ResolversParentTypes['Wearable']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  representationId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  collection?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['WearableCategory'], ParentType, ContextType>;
  rarity?: Resolver<ResolversTypes['WearableRarity'], ParentType, ContextType>;
  bodyShapes?: Resolver<Maybe<Array<ResolversTypes['WearableBodyShape']>>, ParentType, ContextType>;
  nft?: Resolver<Maybe<ResolversTypes['NFT']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AccountsDayDataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['AccountsDayData'] = ResolversParentTypes['AccountsDayData']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sales?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  purchases?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  earned?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  spent?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  uniqueCollectionsSales?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  uniqueCollectors?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  uniqueCollectorsTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  uniqueAndMythicItems?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  uniqueAndMythicItemsTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  creatorsSupported?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  creatorsSupportedTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CollectionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Collection'] = ResolversParentTypes['Collection']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['Item']>>, ParentType, ContextType, RequireFields<CollectionitemsArgs, 'skip' | 'first'>>;
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isCompleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isApproved?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isEditable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  minters?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  managers?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  urn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  itemsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  reviewedAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  firstListedAt?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  searchIsStoreMinter?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  searchText?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CurationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Curation'] = ResolversParentTypes['Curation']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  curator?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  collection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType>;
  item?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType>;
  isApproved?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EmoteResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Emote'] = ResolversParentTypes['Emote']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  collection?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['EmoteCategory'], ParentType, ContextType>;
  loop?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  rarity?: Resolver<ResolversTypes['WearableRarity'], ParentType, ContextType>;
  bodyShapes?: Resolver<Maybe<Array<ResolversTypes['WearableBodyShape']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ItemResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  collection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType>;
  blockchainId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  itemType?: Resolver<ResolversTypes['ItemType'], ParentType, ContextType>;
  totalSupply?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  maxSupply?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  rarity?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creationFee?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  available?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  beneficiary?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contentHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  URI?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  minters?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  managers?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['Metadata']>, ParentType, ContextType>;
  rawMetadata?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  urn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nfts?: Resolver<Maybe<Array<ResolversTypes['NFT']>>, ParentType, ContextType, RequireFields<ItemnftsArgs, 'skip' | 'first'>>;
  createdAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  reviewedAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  soldAt?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  firstListedAt?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  sales?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  volume?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  searchText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  searchItemType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  searchIsCollectionApproved?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  searchIsStoreMinter?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  searchIsWearableHead?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  searchIsWearableAccessory?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  searchWearableCategory?: Resolver<Maybe<ResolversTypes['WearableCategory']>, ParentType, ContextType>;
  searchWearableRarity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  searchWearableBodyShapes?: Resolver<Maybe<Array<ResolversTypes['WearableBodyShape']>>, ParentType, ContextType>;
  searchEmoteCategory?: Resolver<Maybe<ResolversTypes['EmoteCategory']>, ParentType, ContextType>;
  searchEmoteLoop?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  searchEmoteRarity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  searchEmoteBodyShapes?: Resolver<Maybe<Array<ResolversTypes['WearableBodyShape']>>, ParentType, ContextType>;
  uniqueCollectors?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  uniqueCollectorsTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ItemsDayDataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ItemsDayData'] = ResolversParentTypes['ItemsDayData']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sales?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  volume?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  searchEmoteCategory?: Resolver<Maybe<ResolversTypes['EmoteCategory']>, ParentType, ContextType>;
  searchWearableCategory?: Resolver<Maybe<ResolversTypes['WearableCategory']>, ParentType, ContextType>;
  searchRarity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MetadataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Metadata'] = ResolversParentTypes['Metadata']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  itemType?: Resolver<ResolversTypes['ItemType'], ParentType, ContextType>;
  wearable?: Resolver<Maybe<ResolversTypes['Wearable']>, ParentType, ContextType>;
  emote?: Resolver<Maybe<ResolversTypes['Emote']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MintResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Mint'] = ResolversParentTypes['Mint']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  item?: Resolver<ResolversTypes['Item'], ParentType, ContextType>;
  nft?: Resolver<ResolversTypes['NFT'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  beneficiary?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  minter?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  searchPrimarySalePrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  searchContractAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  searchItemId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  searchTokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  searchIssuedId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  searchIsStoreMinter?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RarityResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Rarity'] = ResolversParentTypes['Rarity']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  maxSupply?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Currency'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Account?: AccountResolvers<ContextType>;
  AnalyticsDayData?: AnalyticsDayDataResolvers<ContextType>;
  Bid?: BidResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Count?: CountResolvers<ContextType>;
  Data?: DataResolvers<ContextType>;
  ENS?: ENSResolvers<ContextType>;
  Estate?: EstateResolvers<ContextType>;
  NFT?: NFTResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  Parcel?: ParcelResolvers<ContextType>;
  Sale?: SaleResolvers<ContextType>;
  Wearable?: WearableResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
  AccountsDayData?: AccountsDayDataResolvers<ContextType>;
  Collection?: CollectionResolvers<ContextType>;
  Curation?: CurationResolvers<ContextType>;
  Emote?: EmoteResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  ItemsDayData?: ItemsDayDataResolvers<ContextType>;
  Metadata?: MetadataResolvers<ContextType>;
  Mint?: MintResolvers<ContextType>;
  Rarity?: RarityResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = MarketplaceTypes.Context & CollectionsMaticTypes.Context & CollectionsEthereumTypes.Context & BaseMeshContext;


const baseDir = pathModule.join(typeof __dirname === 'string' ? __dirname : '/', '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/marketplace/introspectionSchema":
      return import("./sources/marketplace/introspectionSchema") as T;
    
    case ".graphclient/sources/collections-matic/introspectionSchema":
      return import("./sources/collections-matic/introspectionSchema") as T;
    
    case ".graphclient/sources/collections-ethereum/introspectionSchema":
      return import("./sources/collections-ethereum/introspectionSchema") as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const collectionsMaticTransforms = [];
const collectionsEthereumTransforms = [];
const marketplaceTransforms = [];
const additionalTypeDefs = [] as any[];
const collectionsMaticHandler = new GraphqlHandler({
              name: "collections-matic",
              config: {"endpoint":"https://api.thegraph.com/subgraphs/name/decentraland/collections-matic-mumbai"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("collections-matic"),
              logger: logger.child("collections-matic"),
              importFn,
            });
const collectionsEthereumHandler = new GraphqlHandler({
              name: "collections-ethereum",
              config: {"endpoint":"https://api.thegraph.com/subgraphs/name/decentraland/collections-ethereum-goerli"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("collections-ethereum"),
              logger: logger.child("collections-ethereum"),
              importFn,
            });
const marketplaceHandler = new GraphqlHandler({
              name: "marketplace",
              config: {"endpoint":"https://api.thegraph.com/subgraphs/name/decentraland/marketplace-goerli"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("marketplace"),
              logger: logger.child("marketplace"),
              importFn,
            });
sources[0] = {
          name: 'collections-matic',
          handler: collectionsMaticHandler,
          transforms: collectionsMaticTransforms
        }
sources[1] = {
          name: 'collections-ethereum',
          handler: collectionsEthereumHandler,
          transforms: collectionsEthereumTransforms
        }
marketplaceTransforms[0] = new RenameTransform({
                  apiName: "marketplace",
                  config: [{"from":{"type":"Query","field":"nfts"},"to":{"type":"Query","field":"legacyNFTs"}}],
                  baseDir,
                  cache,
                  pubsub,
                  importFn,
                  logger,
                });
sources[2] = {
          name: 'marketplace',
          handler: marketplaceHandler,
          transforms: marketplaceTransforms
        }
const additionalResolvers = await Promise.all([
        import("../resolvers")
            .then(m => m.resolvers || m.default || m)
      ]);
const merger = new(StitchingMerger as any)({
        cache,
        pubsub,
        logger: logger.child('stitchingMerger'),
        store: rootStore.child('stitchingMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: GetCatalogDocument,
        get rawSDL() {
          return printWithCache(GetCatalogDocument);
        },
        location: 'GetCatalogDocument.graphql'
      },{
        document: GetLegacyNfTsCatalogDocument,
        get rawSDL() {
          return printWithCache(GetLegacyNfTsCatalogDocument);
        },
        location: 'GetLegacyNfTsCatalogDocument.graphql'
      },{
        document: GetNfTsDocument,
        get rawSDL() {
          return printWithCache(GetNfTsDocument);
        },
        location: 'GetNfTsDocument.graphql'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type ItemFieldsFragment = (
  Pick<Item, 'id' | 'price' | 'blockchainId' | 'image' | 'rarity' | 'available' | 'itemType' | 'searchWearableBodyShapes' | 'searchEmoteBodyShapes' | 'searchIsStoreMinter' | 'createdAt' | 'updatedAt' | 'firstListedAt'>
  & { collection: Pick<Collection, 'id' | 'creator'>, metadata?: Maybe<{ wearable?: Maybe<Pick<Wearable, 'bodyShapes' | 'name' | 'description' | 'category' | 'rarity'>>, emote?: Maybe<Pick<Emote, 'bodyShapes' | 'name' | 'description' | 'category' | 'loop' | 'rarity'>> }>, nfts?: Maybe<Array<{ orders?: Maybe<Array<Pick<Order, 'price'>>> }>> }
);

export type GetCatalogQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Item_orderBy>;
}>;


export type GetCatalogQuery = { items: Array<(
    Pick<Item, 'id' | 'price' | 'blockchainId' | 'image' | 'rarity' | 'available' | 'itemType' | 'searchWearableBodyShapes' | 'searchEmoteBodyShapes' | 'searchIsStoreMinter' | 'createdAt' | 'updatedAt' | 'firstListedAt'>
    & { collection: Pick<Collection, 'id' | 'creator'>, metadata?: Maybe<{ wearable?: Maybe<Pick<Wearable, 'bodyShapes' | 'name' | 'description' | 'category' | 'rarity'>>, emote?: Maybe<Pick<Emote, 'bodyShapes' | 'name' | 'description' | 'category' | 'loop' | 'rarity'>> }>, nfts?: Maybe<Array<{ orders?: Maybe<Array<Pick<Order, 'price'>>> }>> }
  )> };

export type LegacyNFTFieldsFragment = (
  Pick<NFT, 'id' | 'searchOrderPrice' | 'tokenId' | 'image' | 'searchWearableRarity' | 'category' | 'searchWearableBodyShapes' | 'createdAt' | 'updatedAt' | 'name' | 'contractAddress'>
  & { wearable?: Maybe<Pick<Wearable, 'bodyShapes' | 'category' | 'description' | 'rarity'>>, orders?: Maybe<Array<Pick<Order, 'price'>>> }
);

export type getLegacyNFTsCatalogQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
}>;


export type getLegacyNFTsCatalogQuery = { legacyNFTs: Array<(
    Pick<NFT, 'id' | 'searchOrderPrice' | 'tokenId' | 'image' | 'searchWearableRarity' | 'category' | 'searchWearableBodyShapes' | 'createdAt' | 'updatedAt' | 'name' | 'contractAddress'>
    & { wearable?: Maybe<Pick<Wearable, 'bodyShapes' | 'category' | 'description' | 'rarity'>>, orders?: Maybe<Array<Pick<Order, 'price'>>> }
  )> };

export type LegacyNFTFields2Fragment = (
  Pick<NFT, 'tokenId'>
  & { owner: Pick<Account, 'id'> }
);

export type GetNFTsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  owner?: InputMaybe<Scalars['String']>;
}>;


export type GetNFTsQuery = { nfts: Array<(
    Pick<NFT, 'id' | 'tokenId'>
    & { owner: Pick<Account, 'id'> }
  )> };

export const ItemFieldsFragmentDoc = gql`
    fragment ItemFields on Item {
  id
  price
  blockchainId
  image
  rarity
  available
  itemType
  collection {
    id
    creator
  }
  metadata {
    wearable {
      bodyShapes
      name
      description
      category
      rarity
    }
    emote {
      bodyShapes
      name
      description
      category
      loop
      rarity
    }
  }
  nfts(where: {orders_: {price_gt: 0, status: open}}) {
    orders(orderBy: price, where: {status: open}) {
      price
    }
  }
  searchWearableBodyShapes
  searchEmoteBodyShapes
  searchIsStoreMinter
  createdAt
  updatedAt
  firstListedAt
}
    ` as unknown as DocumentNode<ItemFieldsFragment, unknown>;
export const LegacyNFTFieldsFragmentDoc = gql`
    fragment LegacyNFTFields on NFT {
  id
  searchOrderPrice
  tokenId
  image
  searchWearableRarity
  category
  searchWearableBodyShapes
  createdAt
  updatedAt
  name
  contractAddress
  wearable {
    bodyShapes
    category
    description
    rarity
  }
  orders(orderBy: price, where: {status: open}) {
    price
  }
}
    ` as unknown as DocumentNode<LegacyNFTFieldsFragment, unknown>;
export const LegacyNFTFields2FragmentDoc = gql`
    fragment LegacyNFTFields2 on NFT {
  tokenId
  owner {
    id
  }
}
    ` as unknown as DocumentNode<LegacyNFTFields2Fragment, unknown>;
export const GetCatalogDocument = gql`
    query GetCatalog($first: Int, $orderBy: Item_orderBy) {
  items(first: $first, where: {}, orderBy: $orderBy) {
    ...ItemFields
  }
}
    ${ItemFieldsFragmentDoc}` as unknown as DocumentNode<GetCatalogQuery, GetCatalogQueryVariables>;
export const getLegacyNFTsCatalogDocument = gql`
    query getLegacyNFTsCatalog($first: Int) {
  legacyNFTs(first: $first) {
    ...LegacyNFTFields
  }
}
    ${LegacyNFTFieldsFragmentDoc}` as unknown as DocumentNode<getLegacyNFTsCatalogQuery, getLegacyNFTsCatalogQueryVariables>;
export const GetNFTsDocument = gql`
    query GetNFTs($first: Int, $owner: String) {
  nfts(first: $first, where: {owner: $owner}) {
    id
    tokenId
    owner {
      id
    }
  }
  nfts(first: $first, where: {owner: $owner}) {
    ...LegacyNFTFields2
  }
}
    ${LegacyNFTFields2FragmentDoc}` as unknown as DocumentNode<GetNFTsQuery, GetNFTsQueryVariables>;




export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    GetCatalog(variables?: GetCatalogQueryVariables, options?: C): Promise<GetCatalogQuery> {
      return requester<GetCatalogQuery, GetCatalogQueryVariables>(GetCatalogDocument, variables, options) as Promise<GetCatalogQuery>;
    },
    getLegacyNFTsCatalog(variables?: getLegacyNFTsCatalogQueryVariables, options?: C): Promise<getLegacyNFTsCatalogQuery> {
      return requester<getLegacyNFTsCatalogQuery, getLegacyNFTsCatalogQueryVariables>(getLegacyNFTsCatalogDocument, variables, options) as Promise<getLegacyNFTsCatalogQuery>;
    },
    GetNFTs(variables?: GetNFTsQueryVariables, options?: C): Promise<GetNFTsQuery> {
      return requester<GetNFTsQuery, GetNFTsQueryVariables>(GetNFTsDocument, variables, options) as Promise<GetNFTsQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;