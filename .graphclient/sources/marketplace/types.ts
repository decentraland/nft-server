// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace MarketplaceTypes {
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
  sales: Scalars['Int'];
  purchases: Scalars['Int'];
  spent: Scalars['BigInt'];
  earned: Scalars['BigInt'];
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
};

export type Account_orderBy =
  | 'id'
  | 'address'
  | 'nfts'
  | 'sales'
  | 'purchases'
  | 'spent'
  | 'earned';

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
  | 'updatedAt';

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
  | 'daoEarningsManaTotal';

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
  contractAddress: Scalars['Bytes'];
  category: Category;
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
  contractAddress?: InputMaybe<Scalars['Bytes']>;
  contractAddress_not?: InputMaybe<Scalars['Bytes']>;
  contractAddress_gt?: InputMaybe<Scalars['Bytes']>;
  contractAddress_lt?: InputMaybe<Scalars['Bytes']>;
  contractAddress_gte?: InputMaybe<Scalars['Bytes']>;
  contractAddress_lte?: InputMaybe<Scalars['Bytes']>;
  contractAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  contractAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  contractAddress_contains?: InputMaybe<Scalars['Bytes']>;
  contractAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  category?: InputMaybe<Category>;
  category_not?: InputMaybe<Category>;
  category_in?: InputMaybe<Array<Category>>;
  category_not_in?: InputMaybe<Array<Category>>;
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
  | 'searchWearableBodyShapes';

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
  | 'updatedAt';

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
  searchContractAddress: Scalars['Bytes'];
  searchCategory: Scalars['String'];
};

export type SaleType =
  | 'bid'
  | 'order';

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
  searchContractAddress?: InputMaybe<Scalars['Bytes']>;
  searchContractAddress_not?: InputMaybe<Scalars['Bytes']>;
  searchContractAddress_gt?: InputMaybe<Scalars['Bytes']>;
  searchContractAddress_lt?: InputMaybe<Scalars['Bytes']>;
  searchContractAddress_gte?: InputMaybe<Scalars['Bytes']>;
  searchContractAddress_lte?: InputMaybe<Scalars['Bytes']>;
  searchContractAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  searchContractAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  searchContractAddress_contains?: InputMaybe<Scalars['Bytes']>;
  searchContractAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
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
  | 'searchCategory';

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

  export type QuerySdk = {
      /** null **/
  count: InContextSdkMethod<Query['count'], QuerycountArgs, MeshContext>,
  /** null **/
  counts: InContextSdkMethod<Query['counts'], QuerycountsArgs, MeshContext>,
  /** null **/
  order: InContextSdkMethod<Query['order'], QueryorderArgs, MeshContext>,
  /** null **/
  orders: InContextSdkMethod<Query['orders'], QueryordersArgs, MeshContext>,
  /** null **/
  bid: InContextSdkMethod<Query['bid'], QuerybidArgs, MeshContext>,
  /** null **/
  bids: InContextSdkMethod<Query['bids'], QuerybidsArgs, MeshContext>,
  /** null **/
  parcel: InContextSdkMethod<Query['parcel'], QueryparcelArgs, MeshContext>,
  /** null **/
  parcels: InContextSdkMethod<Query['parcels'], QueryparcelsArgs, MeshContext>,
  /** null **/
  estate: InContextSdkMethod<Query['estate'], QueryestateArgs, MeshContext>,
  /** null **/
  estates: InContextSdkMethod<Query['estates'], QueryestatesArgs, MeshContext>,
  /** null **/
  data: InContextSdkMethod<Query['data'], QuerydataArgs, MeshContext>,
  /** null **/
  datas: InContextSdkMethod<Query['datas'], QuerydatasArgs, MeshContext>,
  /** null **/
  wearable: InContextSdkMethod<Query['wearable'], QuerywearableArgs, MeshContext>,
  /** null **/
  wearables: InContextSdkMethod<Query['wearables'], QuerywearablesArgs, MeshContext>,
  /** null **/
  ens: InContextSdkMethod<Query['ens'], QueryensArgs, MeshContext>,
  /** null **/
  enss: InContextSdkMethod<Query['enss'], QueryenssArgs, MeshContext>,
  /** null **/
  nft: InContextSdkMethod<Query['nft'], QuerynftArgs, MeshContext>,
  /** null **/
  legacyNFTs: InContextSdkMethod<Query['legacyNFTs'], QuerylegacyNFTsArgs, MeshContext>,
  /** null **/
  account: InContextSdkMethod<Query['account'], QueryaccountArgs, MeshContext>,
  /** null **/
  accounts: InContextSdkMethod<Query['accounts'], QueryaccountsArgs, MeshContext>,
  /** null **/
  sale: InContextSdkMethod<Query['sale'], QuerysaleArgs, MeshContext>,
  /** null **/
  sales: InContextSdkMethod<Query['sales'], QuerysalesArgs, MeshContext>,
  /** null **/
  analyticsDayData: InContextSdkMethod<Query['analyticsDayData'], QueryanalyticsDayDataArgs, MeshContext>,
  /** null **/
  analyticsDayDatas: InContextSdkMethod<Query['analyticsDayDatas'], QueryanalyticsDayDatasArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  count: InContextSdkMethod<Subscription['count'], SubscriptioncountArgs, MeshContext>,
  /** null **/
  counts: InContextSdkMethod<Subscription['counts'], SubscriptioncountsArgs, MeshContext>,
  /** null **/
  order: InContextSdkMethod<Subscription['order'], SubscriptionorderArgs, MeshContext>,
  /** null **/
  orders: InContextSdkMethod<Subscription['orders'], SubscriptionordersArgs, MeshContext>,
  /** null **/
  bid: InContextSdkMethod<Subscription['bid'], SubscriptionbidArgs, MeshContext>,
  /** null **/
  bids: InContextSdkMethod<Subscription['bids'], SubscriptionbidsArgs, MeshContext>,
  /** null **/
  parcel: InContextSdkMethod<Subscription['parcel'], SubscriptionparcelArgs, MeshContext>,
  /** null **/
  parcels: InContextSdkMethod<Subscription['parcels'], SubscriptionparcelsArgs, MeshContext>,
  /** null **/
  estate: InContextSdkMethod<Subscription['estate'], SubscriptionestateArgs, MeshContext>,
  /** null **/
  estates: InContextSdkMethod<Subscription['estates'], SubscriptionestatesArgs, MeshContext>,
  /** null **/
  data: InContextSdkMethod<Subscription['data'], SubscriptiondataArgs, MeshContext>,
  /** null **/
  datas: InContextSdkMethod<Subscription['datas'], SubscriptiondatasArgs, MeshContext>,
  /** null **/
  wearable: InContextSdkMethod<Subscription['wearable'], SubscriptionwearableArgs, MeshContext>,
  /** null **/
  wearables: InContextSdkMethod<Subscription['wearables'], SubscriptionwearablesArgs, MeshContext>,
  /** null **/
  ens: InContextSdkMethod<Subscription['ens'], SubscriptionensArgs, MeshContext>,
  /** null **/
  enss: InContextSdkMethod<Subscription['enss'], SubscriptionenssArgs, MeshContext>,
  /** null **/
  nft: InContextSdkMethod<Subscription['nft'], SubscriptionnftArgs, MeshContext>,
  /** null **/
  nfts: InContextSdkMethod<Subscription['nfts'], SubscriptionnftsArgs, MeshContext>,
  /** null **/
  account: InContextSdkMethod<Subscription['account'], SubscriptionaccountArgs, MeshContext>,
  /** null **/
  accounts: InContextSdkMethod<Subscription['accounts'], SubscriptionaccountsArgs, MeshContext>,
  /** null **/
  sale: InContextSdkMethod<Subscription['sale'], SubscriptionsaleArgs, MeshContext>,
  /** null **/
  sales: InContextSdkMethod<Subscription['sales'], SubscriptionsalesArgs, MeshContext>,
  /** null **/
  analyticsDayData: InContextSdkMethod<Subscription['analyticsDayData'], SubscriptionanalyticsDayDataArgs, MeshContext>,
  /** null **/
  analyticsDayDatas: InContextSdkMethod<Subscription['analyticsDayDatas'], SubscriptionanalyticsDayDatasArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["marketplace"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
