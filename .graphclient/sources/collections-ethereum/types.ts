// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace CollectionsEthereumTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export type Account = {
  id: Scalars['ID'];
  address: Scalars['Bytes'];
  nfts?: Maybe<Array<NFT>>;
  isCommitteeMember?: Maybe<Scalars['Boolean']>;
  totalCurations?: Maybe<Scalars['Int']>;
  sales: Scalars['Int'];
  primarySales: Scalars['Int'];
  purchases: Scalars['Int'];
  spent: Scalars['BigInt'];
  earned: Scalars['BigInt'];
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
  sales?: InputMaybe<Scalars['Int']>;
  sales_not?: InputMaybe<Scalars['Int']>;
  sales_gt?: InputMaybe<Scalars['Int']>;
  sales_lt?: InputMaybe<Scalars['Int']>;
  sales_gte?: InputMaybe<Scalars['Int']>;
  sales_lte?: InputMaybe<Scalars['Int']>;
  sales_in?: InputMaybe<Array<Scalars['Int']>>;
  sales_not_in?: InputMaybe<Array<Scalars['Int']>>;
  primarySales?: InputMaybe<Scalars['Int']>;
  primarySales_not?: InputMaybe<Scalars['Int']>;
  primarySales_gt?: InputMaybe<Scalars['Int']>;
  primarySales_lt?: InputMaybe<Scalars['Int']>;
  primarySales_gte?: InputMaybe<Scalars['Int']>;
  primarySales_lte?: InputMaybe<Scalars['Int']>;
  primarySales_in?: InputMaybe<Array<Scalars['Int']>>;
  primarySales_not_in?: InputMaybe<Array<Scalars['Int']>>;
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Account_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Account_filter>>>;
};

export type Account_orderBy =
  | 'id'
  | 'address'
  | 'nfts'
  | 'isCommitteeMember'
  | 'totalCurations'
  | 'sales'
  | 'primarySales'
  | 'purchases'
  | 'spent'
  | 'earned'
  | 'primarySalesEarned'
  | 'royalties'
  | 'uniqueAndMythicItems'
  | 'uniqueAndMythicItemsTotal'
  | 'collections'
  | 'creatorsSupported'
  | 'creatorsSupportedTotal'
  | 'uniqueCollectors'
  | 'uniqueCollectorsTotal';

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
  nft?: Maybe<NFT>;
  nftAddress: Scalars['Bytes'];
  tokenId: Scalars['BigInt'];
  blockchainId: Scalars['String'];
  bidder?: Maybe<Scalars['Bytes']>;
  seller?: Maybe<Scalars['Bytes']>;
  price: Scalars['BigInt'];
  status: OrderStatus;
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
  and?: InputMaybe<Array<InputMaybe<Bid_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Bid_filter>>>;
};

export type Bid_orderBy =
  | 'id'
  | 'bidAddress'
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
  | 'nftAddress'
  | 'tokenId'
  | 'blockchainId'
  | 'bidder'
  | 'seller'
  | 'price'
  | 'status'
  | 'blockNumber'
  | 'expiresAt'
  | 'createdAt'
  | 'updatedAt';

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

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
  | 'searchIsStoreMinter'
  | 'searchText';

export type Count = {
  id: Scalars['ID'];
  orderTotal: Scalars['Int'];
  bidTotal: Scalars['Int'];
  collectionTotal: Scalars['Int'];
  itemTotal: Scalars['Int'];
  nftTotal: Scalars['Int'];
  salesTotal: Scalars['Int'];
  salesManaTotal: Scalars['BigInt'];
  primarySalesTotal: Scalars['Int'];
  primarySalesManaTotal: Scalars['BigInt'];
  secondarySalesTotal: Scalars['Int'];
  secondarySalesManaTotal: Scalars['BigInt'];
  royaltiesManaTotal: Scalars['BigInt'];
  started: Scalars['Int'];
  creatorEarningsManaTotal: Scalars['BigInt'];
  daoEarningsManaTotal: Scalars['BigInt'];
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
  started?: InputMaybe<Scalars['Int']>;
  started_not?: InputMaybe<Scalars['Int']>;
  started_gt?: InputMaybe<Scalars['Int']>;
  started_lt?: InputMaybe<Scalars['Int']>;
  started_gte?: InputMaybe<Scalars['Int']>;
  started_lte?: InputMaybe<Scalars['Int']>;
  started_in?: InputMaybe<Array<Scalars['Int']>>;
  started_not_in?: InputMaybe<Array<Scalars['Int']>>;
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
};

export type Count_orderBy =
  | 'id'
  | 'orderTotal'
  | 'bidTotal'
  | 'collectionTotal'
  | 'itemTotal'
  | 'nftTotal'
  | 'salesTotal'
  | 'salesManaTotal'
  | 'primarySalesTotal'
  | 'primarySalesManaTotal'
  | 'secondarySalesTotal'
  | 'secondarySalesManaTotal'
  | 'royaltiesManaTotal'
  | 'started'
  | 'creatorEarningsManaTotal'
  | 'daoEarningsManaTotal';

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

export type NFT = {
  id: Scalars['ID'];
  tokenId: Scalars['BigInt'];
  category: Scalars['String'];
  contractAddress: Scalars['String'];
  itemBlockchainId?: Maybe<Scalars['BigInt']>;
  issuedId?: Maybe<Scalars['BigInt']>;
  itemType: ItemType;
  owner: Account;
  tokenURI?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  urn: Scalars['String'];
  orders?: Maybe<Array<Order>>;
  bids?: Maybe<Array<Bid>>;
  activeOrder?: Maybe<Order>;
  collection: Collection;
  item?: Maybe<Item>;
  metadata?: Maybe<Metadata>;
  createdAt: Scalars['BigInt'];
  updatedAt: Scalars['BigInt'];
  soldAt?: Maybe<Scalars['BigInt']>;
  transferredAt: Scalars['BigInt'];
  sales: Scalars['Int'];
  volume: Scalars['BigInt'];
  searchText?: Maybe<Scalars['String']>;
  searchItemType?: Maybe<Scalars['String']>;
  searchIsWearableHead?: Maybe<Scalars['Boolean']>;
  searchIsWearableAccessory?: Maybe<Scalars['Boolean']>;
  searchWearableCategory?: Maybe<WearableCategory>;
  searchWearableRarity?: Maybe<Scalars['String']>;
  searchWearableBodyShapes?: Maybe<Array<WearableBodyShape>>;
  searchEmoteCategory?: Maybe<EmoteCategory>;
  searchEmoteLoop?: Maybe<Scalars['Boolean']>;
  searchEmoteRarity?: Maybe<Scalars['String']>;
  searchEmoteBodyShapes?: Maybe<Array<WearableBodyShape>>;
  searchOrderStatus?: Maybe<OrderStatus>;
  searchOrderPrice?: Maybe<Scalars['BigInt']>;
  searchOrderExpiresAt?: Maybe<Scalars['BigInt']>;
  searchOrderCreatedAt?: Maybe<Scalars['BigInt']>;
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
  category?: InputMaybe<Scalars['String']>;
  category_not?: InputMaybe<Scalars['String']>;
  category_gt?: InputMaybe<Scalars['String']>;
  category_lt?: InputMaybe<Scalars['String']>;
  category_gte?: InputMaybe<Scalars['String']>;
  category_lte?: InputMaybe<Scalars['String']>;
  category_in?: InputMaybe<Array<Scalars['String']>>;
  category_not_in?: InputMaybe<Array<Scalars['String']>>;
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
  contractAddress?: InputMaybe<Scalars['String']>;
  contractAddress_not?: InputMaybe<Scalars['String']>;
  contractAddress_gt?: InputMaybe<Scalars['String']>;
  contractAddress_lt?: InputMaybe<Scalars['String']>;
  contractAddress_gte?: InputMaybe<Scalars['String']>;
  contractAddress_lte?: InputMaybe<Scalars['String']>;
  contractAddress_in?: InputMaybe<Array<Scalars['String']>>;
  contractAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  contractAddress_contains?: InputMaybe<Scalars['String']>;
  contractAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_not_contains?: InputMaybe<Scalars['String']>;
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NFT_filter>>>;
  or?: InputMaybe<Array<InputMaybe<NFT_filter>>>;
};

export type NFT_orderBy =
  | 'id'
  | 'tokenId'
  | 'category'
  | 'contractAddress'
  | 'itemBlockchainId'
  | 'issuedId'
  | 'itemType'
  | 'owner'
  | 'owner__id'
  | 'owner__address'
  | 'owner__isCommitteeMember'
  | 'owner__totalCurations'
  | 'owner__sales'
  | 'owner__primarySales'
  | 'owner__purchases'
  | 'owner__spent'
  | 'owner__earned'
  | 'owner__primarySalesEarned'
  | 'owner__royalties'
  | 'owner__uniqueAndMythicItemsTotal'
  | 'owner__collections'
  | 'owner__creatorsSupportedTotal'
  | 'owner__uniqueCollectorsTotal'
  | 'tokenURI'
  | 'image'
  | 'urn'
  | 'orders'
  | 'bids'
  | 'activeOrder'
  | 'activeOrder__id'
  | 'activeOrder__marketplaceAddress'
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
  | 'createdAt'
  | 'updatedAt'
  | 'soldAt'
  | 'transferredAt'
  | 'sales'
  | 'volume'
  | 'searchText'
  | 'searchItemType'
  | 'searchIsWearableHead'
  | 'searchIsWearableAccessory'
  | 'searchWearableCategory'
  | 'searchWearableRarity'
  | 'searchWearableBodyShapes'
  | 'searchEmoteCategory'
  | 'searchEmoteLoop'
  | 'searchEmoteRarity'
  | 'searchEmoteBodyShapes'
  | 'searchOrderStatus'
  | 'searchOrderPrice'
  | 'searchOrderExpiresAt'
  | 'searchOrderCreatedAt';

export type Order = {
  id: Scalars['ID'];
  marketplaceAddress: Scalars['Bytes'];
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
  | 'updatedAt';

export type Query = {
  collection?: Maybe<Collection>;
  collections: Array<Collection>;
  item?: Maybe<Item>;
  items: Array<Item>;
  nft?: Maybe<NFT>;
  nfts: Array<NFT>;
  metadata: Array<Metadata>;
  wearable?: Maybe<Wearable>;
  wearables: Array<Wearable>;
  emote?: Maybe<Emote>;
  emotes: Array<Emote>;
  rarity?: Maybe<Rarity>;
  rarities: Array<Rarity>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  order?: Maybe<Order>;
  orders: Array<Order>;
  bid?: Maybe<Bid>;
  bids: Array<Bid>;
  count?: Maybe<Count>;
  counts: Array<Count>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  curation?: Maybe<Curation>;
  curations: Array<Curation>;
  sale?: Maybe<Sale>;
  sales: Array<Sale>;
  analyticsDayData?: Maybe<AnalyticsDayData>;
  analyticsDayDatas: Array<AnalyticsDayData>;
  itemsDayData?: Maybe<ItemsDayData>;
  itemsDayDatas: Array<ItemsDayData>;
  accountsDayData?: Maybe<AccountsDayData>;
  accountsDayDatas: Array<AccountsDayData>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
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


export type QuerynftArgs = {
  id: Scalars['ID'];
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


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

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

export type Sale = {
  id: Scalars['ID'];
  type: SaleType;
  buyer: Scalars['Bytes'];
  seller: Scalars['Bytes'];
  beneficiary: Scalars['Bytes'];
  price: Scalars['BigInt'];
  feesCollectorCut: Scalars['BigInt'];
  feesCollector: Scalars['Bytes'];
  royaltiesCut: Scalars['BigInt'];
  royaltiesCollector: Scalars['Bytes'];
  item: Item;
  nft: NFT;
  timestamp: Scalars['BigInt'];
  txHash: Scalars['Bytes'];
  searchTokenId: Scalars['BigInt'];
  searchItemId: Scalars['BigInt'];
  searchCategory: Scalars['String'];
  searchContractAddress: Scalars['String'];
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
  price?: InputMaybe<Scalars['BigInt']>;
  price_not?: InputMaybe<Scalars['BigInt']>;
  price_gt?: InputMaybe<Scalars['BigInt']>;
  price_lt?: InputMaybe<Scalars['BigInt']>;
  price_gte?: InputMaybe<Scalars['BigInt']>;
  price_lte?: InputMaybe<Scalars['BigInt']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  searchItemId?: InputMaybe<Scalars['BigInt']>;
  searchItemId_not?: InputMaybe<Scalars['BigInt']>;
  searchItemId_gt?: InputMaybe<Scalars['BigInt']>;
  searchItemId_lt?: InputMaybe<Scalars['BigInt']>;
  searchItemId_gte?: InputMaybe<Scalars['BigInt']>;
  searchItemId_lte?: InputMaybe<Scalars['BigInt']>;
  searchItemId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  searchItemId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Sale_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Sale_filter>>>;
};

export type Sale_orderBy =
  | 'id'
  | 'type'
  | 'buyer'
  | 'seller'
  | 'beneficiary'
  | 'price'
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
  | 'timestamp'
  | 'txHash'
  | 'searchTokenId'
  | 'searchItemId'
  | 'searchCategory'
  | 'searchContractAddress';

export type Subscription = {
  collection?: Maybe<Collection>;
  collections: Array<Collection>;
  item?: Maybe<Item>;
  items: Array<Item>;
  nft?: Maybe<NFT>;
  nfts: Array<NFT>;
  metadata: Array<Metadata>;
  wearable?: Maybe<Wearable>;
  wearables: Array<Wearable>;
  emote?: Maybe<Emote>;
  emotes: Array<Emote>;
  rarity?: Maybe<Rarity>;
  rarities: Array<Rarity>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  order?: Maybe<Order>;
  orders: Array<Order>;
  bid?: Maybe<Bid>;
  bids: Array<Bid>;
  count?: Maybe<Count>;
  counts: Array<Count>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  curation?: Maybe<Curation>;
  curations: Array<Curation>;
  sale?: Maybe<Sale>;
  sales: Array<Sale>;
  analyticsDayData?: Maybe<AnalyticsDayData>;
  analyticsDayDatas: Array<AnalyticsDayData>;
  itemsDayData?: Maybe<ItemsDayData>;
  itemsDayDatas: Array<ItemsDayData>;
  accountsDayData?: Maybe<AccountsDayData>;
  accountsDayDatas: Array<AccountsDayData>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
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


export type SubscriptionmetadataArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Metadata_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Metadata_filter>;
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


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Wearable = {
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  collection: Scalars['String'];
  category: WearableCategory;
  rarity: WearableRarity;
  bodyShapes?: Maybe<Array<WearableBodyShape>>;
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Wearable_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Wearable_filter>>>;
};

export type Wearable_orderBy =
  | 'id'
  | 'name'
  | 'description'
  | 'collection'
  | 'category'
  | 'rarity'
  | 'bodyShapes';

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

  export type QuerySdk = {
      /** null **/
  collection: InContextSdkMethod<Query['collection'], QuerycollectionArgs, MeshContext>,
  /** null **/
  collections: InContextSdkMethod<Query['collections'], QuerycollectionsArgs, MeshContext>,
  /** null **/
  item: InContextSdkMethod<Query['item'], QueryitemArgs, MeshContext>,
  /** null **/
  items: InContextSdkMethod<Query['items'], QueryitemsArgs, MeshContext>,
  /** null **/
  nft: InContextSdkMethod<Query['nft'], QuerynftArgs, MeshContext>,
  /** null **/
  nfts: InContextSdkMethod<Query['nfts'], QuerynftsArgs, MeshContext>,
  /** null **/
  metadata: InContextSdkMethod<Query['metadata'], QuerymetadataArgs, MeshContext>,
  /** null **/
  wearable: InContextSdkMethod<Query['wearable'], QuerywearableArgs, MeshContext>,
  /** null **/
  wearables: InContextSdkMethod<Query['wearables'], QuerywearablesArgs, MeshContext>,
  /** null **/
  emote: InContextSdkMethod<Query['emote'], QueryemoteArgs, MeshContext>,
  /** null **/
  emotes: InContextSdkMethod<Query['emotes'], QueryemotesArgs, MeshContext>,
  /** null **/
  rarity: InContextSdkMethod<Query['rarity'], QueryrarityArgs, MeshContext>,
  /** null **/
  rarities: InContextSdkMethod<Query['rarities'], QueryraritiesArgs, MeshContext>,
  /** null **/
  account: InContextSdkMethod<Query['account'], QueryaccountArgs, MeshContext>,
  /** null **/
  accounts: InContextSdkMethod<Query['accounts'], QueryaccountsArgs, MeshContext>,
  /** null **/
  order: InContextSdkMethod<Query['order'], QueryorderArgs, MeshContext>,
  /** null **/
  orders: InContextSdkMethod<Query['orders'], QueryordersArgs, MeshContext>,
  /** null **/
  bid: InContextSdkMethod<Query['bid'], QuerybidArgs, MeshContext>,
  /** null **/
  bids: InContextSdkMethod<Query['bids'], QuerybidsArgs, MeshContext>,
  /** null **/
  count: InContextSdkMethod<Query['count'], QuerycountArgs, MeshContext>,
  /** null **/
  counts: InContextSdkMethod<Query['counts'], QuerycountsArgs, MeshContext>,
  /** null **/
  mint: InContextSdkMethod<Query['mint'], QuerymintArgs, MeshContext>,
  /** null **/
  mints: InContextSdkMethod<Query['mints'], QuerymintsArgs, MeshContext>,
  /** null **/
  curation: InContextSdkMethod<Query['curation'], QuerycurationArgs, MeshContext>,
  /** null **/
  curations: InContextSdkMethod<Query['curations'], QuerycurationsArgs, MeshContext>,
  /** null **/
  sale: InContextSdkMethod<Query['sale'], QuerysaleArgs, MeshContext>,
  /** null **/
  sales: InContextSdkMethod<Query['sales'], QuerysalesArgs, MeshContext>,
  /** null **/
  analyticsDayData: InContextSdkMethod<Query['analyticsDayData'], QueryanalyticsDayDataArgs, MeshContext>,
  /** null **/
  analyticsDayDatas: InContextSdkMethod<Query['analyticsDayDatas'], QueryanalyticsDayDatasArgs, MeshContext>,
  /** null **/
  itemsDayData: InContextSdkMethod<Query['itemsDayData'], QueryitemsDayDataArgs, MeshContext>,
  /** null **/
  itemsDayDatas: InContextSdkMethod<Query['itemsDayDatas'], QueryitemsDayDatasArgs, MeshContext>,
  /** null **/
  accountsDayData: InContextSdkMethod<Query['accountsDayData'], QueryaccountsDayDataArgs, MeshContext>,
  /** null **/
  accountsDayDatas: InContextSdkMethod<Query['accountsDayDatas'], QueryaccountsDayDatasArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  collection: InContextSdkMethod<Subscription['collection'], SubscriptioncollectionArgs, MeshContext>,
  /** null **/
  collections: InContextSdkMethod<Subscription['collections'], SubscriptioncollectionsArgs, MeshContext>,
  /** null **/
  item: InContextSdkMethod<Subscription['item'], SubscriptionitemArgs, MeshContext>,
  /** null **/
  items: InContextSdkMethod<Subscription['items'], SubscriptionitemsArgs, MeshContext>,
  /** null **/
  nft: InContextSdkMethod<Subscription['nft'], SubscriptionnftArgs, MeshContext>,
  /** null **/
  nfts: InContextSdkMethod<Subscription['nfts'], SubscriptionnftsArgs, MeshContext>,
  /** null **/
  metadata: InContextSdkMethod<Subscription['metadata'], SubscriptionmetadataArgs, MeshContext>,
  /** null **/
  wearable: InContextSdkMethod<Subscription['wearable'], SubscriptionwearableArgs, MeshContext>,
  /** null **/
  wearables: InContextSdkMethod<Subscription['wearables'], SubscriptionwearablesArgs, MeshContext>,
  /** null **/
  emote: InContextSdkMethod<Subscription['emote'], SubscriptionemoteArgs, MeshContext>,
  /** null **/
  emotes: InContextSdkMethod<Subscription['emotes'], SubscriptionemotesArgs, MeshContext>,
  /** null **/
  rarity: InContextSdkMethod<Subscription['rarity'], SubscriptionrarityArgs, MeshContext>,
  /** null **/
  rarities: InContextSdkMethod<Subscription['rarities'], SubscriptionraritiesArgs, MeshContext>,
  /** null **/
  account: InContextSdkMethod<Subscription['account'], SubscriptionaccountArgs, MeshContext>,
  /** null **/
  accounts: InContextSdkMethod<Subscription['accounts'], SubscriptionaccountsArgs, MeshContext>,
  /** null **/
  order: InContextSdkMethod<Subscription['order'], SubscriptionorderArgs, MeshContext>,
  /** null **/
  orders: InContextSdkMethod<Subscription['orders'], SubscriptionordersArgs, MeshContext>,
  /** null **/
  bid: InContextSdkMethod<Subscription['bid'], SubscriptionbidArgs, MeshContext>,
  /** null **/
  bids: InContextSdkMethod<Subscription['bids'], SubscriptionbidsArgs, MeshContext>,
  /** null **/
  count: InContextSdkMethod<Subscription['count'], SubscriptioncountArgs, MeshContext>,
  /** null **/
  counts: InContextSdkMethod<Subscription['counts'], SubscriptioncountsArgs, MeshContext>,
  /** null **/
  mint: InContextSdkMethod<Subscription['mint'], SubscriptionmintArgs, MeshContext>,
  /** null **/
  mints: InContextSdkMethod<Subscription['mints'], SubscriptionmintsArgs, MeshContext>,
  /** null **/
  curation: InContextSdkMethod<Subscription['curation'], SubscriptioncurationArgs, MeshContext>,
  /** null **/
  curations: InContextSdkMethod<Subscription['curations'], SubscriptioncurationsArgs, MeshContext>,
  /** null **/
  sale: InContextSdkMethod<Subscription['sale'], SubscriptionsaleArgs, MeshContext>,
  /** null **/
  sales: InContextSdkMethod<Subscription['sales'], SubscriptionsalesArgs, MeshContext>,
  /** null **/
  analyticsDayData: InContextSdkMethod<Subscription['analyticsDayData'], SubscriptionanalyticsDayDataArgs, MeshContext>,
  /** null **/
  analyticsDayDatas: InContextSdkMethod<Subscription['analyticsDayDatas'], SubscriptionanalyticsDayDatasArgs, MeshContext>,
  /** null **/
  itemsDayData: InContextSdkMethod<Subscription['itemsDayData'], SubscriptionitemsDayDataArgs, MeshContext>,
  /** null **/
  itemsDayDatas: InContextSdkMethod<Subscription['itemsDayDatas'], SubscriptionitemsDayDatasArgs, MeshContext>,
  /** null **/
  accountsDayData: InContextSdkMethod<Subscription['accountsDayData'], SubscriptionaccountsDayDataArgs, MeshContext>,
  /** null **/
  accountsDayDatas: InContextSdkMethod<Subscription['accountsDayDatas'], SubscriptionaccountsDayDatasArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["collections-ethereum"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
