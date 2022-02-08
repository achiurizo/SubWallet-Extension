// Copyright 2019-2022 @polkadot/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ApiPromise } from '@polkadot/api';
import { SubmittableExtrinsicFunction } from '@polkadot/api/promise/types';
import { AccountJson, RequestAccountSubscribe } from '@polkadot/extension-base/background/types';
import { MetadataDefBase } from '@polkadot/extension-inject/types';
import { u128 } from '@polkadot/types';
import { Registry } from '@polkadot/types/types';
import { Keyring } from '@polkadot/ui-keyring';
import { ApiInitStatus } from '@polkadot/extension-koni-base/api/dotsama';

export interface StakingItem {
  name: string,
  chainId: string,
  paraId: string,
  balance: string,
  nativeToken: string,
  unit: string,
}

export interface StakingJson {
  ready?: boolean,
  details: Array<StakingItem>
}

export interface NftItem {
  id: string;
  name: string;
  image: string;
  external_url: string;
  rarity: string;
  collectionId: string;
  properties: Record<any, any>;
}

export interface NftCollection {
  collectionId: string;
  collectionName: string;
  image: string;
  nftItems: Array<NftItem>;
}

export interface NftJson {
  ready?: boolean;
  total: number;
  nftList: Array<NftCollection>;
}


export interface PriceJson {
  ready?: boolean,
  currency: string,
  priceMap: Record<string, number>
}

export enum APIItemState {
  PENDING = 'pending',
  READY = 'ready',
  CACHED = 'cached',
  ERROR = 'error',
  NOT_SUPPORT = 'not_support'
}

export enum CrowdloanParaState {
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export interface NftItem {
  id: string;
  name: string;
  image: string;
  external_url: string;
  rarity: string;
  collectionId: string;
  properties: Record<any, any>;
}

export interface NftCollection {
  collectionId: string;
  collectionName: string;
  image: string;
  nftItems: Array<NftItem>;
}

export interface NftJson {
  ready?: boolean;
  total: number;
  nftList: Array<NftCollection>;
}

export interface BalanceItem {
  state: APIItemState,
  free: string,
  reserved: string,
  miscFrozen: string,
  feeFrozen: string
}

export interface BalanceJson {
  details: Record<string, BalanceItem>
}

export interface CrowdloanItem {
  state: APIItemState,
  paraState?: CrowdloanParaState,
  contribute: string
}

export interface CrowdloanJson {
  details: Record<string, CrowdloanItem>
}

export interface ChainRegistry {
  chainDecimals: number[];
  chainTokens: string[];
}

export interface BalanceRPCItem {
  free: u128,
  reserved: u128,
  miscFrozen: u128,
  feeFrozen: u128
}

export interface BalanceRPCResponse {
  data: BalanceRPCItem
}

export interface DefaultFormatBalance {
  decimals?: number[] | number;
  unit?: string[] | string;
}

export interface ApiState {
  apiDefaultTx: SubmittableExtrinsicFunction;
  apiDefaultTxSudo: SubmittableExtrinsicFunction;
  isApiReady: boolean;
  isApiReadyOnce: boolean;
  isDevelopment?: boolean;
  isEthereum?: boolean;
  specName: string;
  specVersion: string;
  systemChain: string;
  systemName: string;
  systemVersion: string;
  registry: Registry;
  defaultFormatBalance: DefaultFormatBalance;
}

export interface ApiProps extends ApiState {
  api: ApiPromise;
  apiError?: string;
  apiUrl: string;
  isNotSupport?: boolean;
  isApiReadyOnce: boolean;
  isApiConnected: boolean;
  isEthereum: boolean;
  isApiInitialized: boolean;
  isReady: Promise<ApiProps>;
}

export type NetWorkGroup = 'RELAY_CHAIN' | 'POLKADOT_PARACHAIN'| 'KUSAMA_PARACHAIN' | 'UNKNOWN' | 'NOT_SURE';

export interface NetWorkInfo {
  chain: string;
  genesisHash: string;
  icon?: string;
  ss58Format: number;
  chainType?: 'substrate' | 'ethereum';
  provider: string;
  group: NetWorkGroup;
  paraId?: number;
  isEthereum?: boolean;
}

export interface NetWorkMetadataDef extends MetadataDefBase {
  networkKey: string;
  group: NetWorkGroup
  isEthereum: boolean;
  paraId?: number;
  isAvailable: boolean;
}

export type CurrentNetworkInfo = {
  networkKey: string;
  networkPrefix: number;
  icon: string;
  genesisHash: string;
  isEthereum: boolean;
}

// all Accounts and the address of the current Account
export interface AccountsWithCurrentAddress {
  accounts: AccountJson[];
  currentAddress?: string;
}

export interface CurrentAccountInfo {
  address: string;
}

export interface RandomTestRequest {
  start: number;
  end: number;
}

export type PdotApi = {
  keyring: Keyring;
  apisMap: Record<string, ApiProps>;
}

export interface BackgroundWindow extends Window {
  pdotApi: PdotApi;
}

export interface TransactionHistoryItemType {
  time: number;
  networkKey: string;
  change: string;
  fee?: string;
  isSuccess: boolean;
  action: 'send' | 'received';
  extrinsicHash: string
}

export interface RequestTransactionHistoryGet {
  address: string;
  networkKey: string;
}

export interface RequestTransactionHistoryGetByMultiNetworks {
  address: string;
  networkKeys: string[];
}

export interface RequestTransactionHistoryAdd {
  address: string;
  networkKey: string;
  item: TransactionHistoryItemType;
}

export interface RequestApi {
  networkKey: string;
}

export type RequestPrice = null
export type RequestSubscribePrice = null
export type RequestBalance = null
export type RequestSubscribeBalance = null
export type RequestCrowdloan = null
export type RequestSubscribeCrowdloan = null
export type RequestSubscribeNft = null

export interface KoniRequestSignatures {
  'pri(api.init)': [RequestApi, ApiInitStatus];
  'pri(staking.getStaking)': [string, StakingJson]
  'pri(staking.getSubscription)': [string, StakingJson, StakingJson]
  'pri(nft.getNft)': [string, NftJson],
  'pri(nft.getSubscription)': [RequestSubscribeNft, NftJson, NftJson]
  'pri(price.getPrice)': [RequestPrice, PriceJson]
  'pri(price.getSubscription)': [RequestSubscribePrice, PriceJson, PriceJson],
  'pri(balance.getBalance)': [RequestBalance, BalanceJson],
  'pri(balance.getSubscription)': [RequestSubscribeBalance, BalanceJson, BalanceJson],
  'pri(crowdloan.getCrowdloan)': [RequestCrowdloan, CrowdloanJson],
  'pri(crowdloan.getSubscription)': [RequestSubscribeCrowdloan, CrowdloanJson, CrowdloanJson],
  'pri(accounts.getAllWithCurrentAddress)': [RequestAccountSubscribe, boolean, AccountsWithCurrentAddress];
  'pri(networkMetadata.list)': [null, NetWorkMetadataDef[]],
  'pri(chainRegistry.getSubscription)': [null, Record<string, ChainRegistry>, Record<string, ChainRegistry>],
  'pri(transaction.history.get)': [RequestTransactionHistoryGet, boolean, TransactionHistoryItemType[]];
  'pri(transaction.history.getByMultiNetwork)': [RequestTransactionHistoryGetByMultiNetworks, boolean, TransactionHistoryItemType[]];
  'pri(transaction.history.add)': [RequestTransactionHistoryAdd, boolean, TransactionHistoryItemType[]];
  'pub(utils.getRandom)': [RandomTestRequest, number]
}