// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { APIItemState, StakingRewardItem, StakingRewardJson } from '@subwallet/extension-base/background/KoniTypes';
import { PREDEFINED_NETWORKS } from '@subwallet/extension-koni-base/api/predefinedNetworks';
import { SUBSQUID_ENDPOINTS, SUPPORTED_STAKING_CHAINS } from '@subwallet/extension-koni-base/api/staking/config';
import { reformatAddress, toUnit } from '@subwallet/extension-koni-base/utils';
import axios from 'axios';

interface RewardResponseItem {
  smartContract: string;
  amount: string,
  blockNumber: string
}

interface StakingResponseItem {
  totalReward: string,
  totalSlash: string,
  totalBond: string,
  rewards: RewardResponseItem[]
}

interface StakingAmount {
  smartContract?: string;
  totalReward?: number,
  totalSlash?: number,
  totalBond?: number,
  latestReward?: number
}

const getSubsquidQuery = (account: string, chain: string) => {
  if (chain === 'astar') {
    return `
    query MyQuery {
      accountById(id: "${account}") {
        totalReward
        totalBond
        rewards(limit: 1, orderBy: blockNumber_DESC) {
          amount
          smartContract
        }
      }
    }`;
  }

  if (chain === 'moonbeam' || chain === 'moonriver') {
    return `
    query MyQuery {
      accountById(id: "${account}") {
        totalReward
        totalBond
        rewards(limit: 1, orderBy: blockNumber_DESC) {
          amount
        }
      }
    }`;
  }

  return `
  query MyQuery {
    accountById(id: "${account}") {
      totalReward
      totalSlash
      totalBond
      rewards(limit: 1, orderBy: blockNumber_DESC) {
        amount
      }
    }
  }`;
};

const getSubsquidStaking = async (accounts: string[], chain: string): Promise<StakingRewardItem> => {
  try {
    const parsedResult: StakingAmount = {};

    const rewards = await Promise.all(accounts.map(async (account) => {
      const parsedAccount = reformatAddress(account, PREDEFINED_NETWORKS[chain].ss58Format);
      const result: Record<string, any> = {};

      const resp = await axios({ url: SUBSQUID_ENDPOINTS[chain],
        method: 'post',
        data: { query: getSubsquidQuery(parsedAccount, chain) } });

      if (resp.status === 200) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const respData = resp.data.data as Record<string, any>;
        const rewardItem = respData.accountById as StakingResponseItem;

        if (rewardItem) {
          const latestReward = rewardItem.rewards[0];

          if (rewardItem.totalReward) {
            result.totalReward = parseFloat(rewardItem.totalReward);
          }

          if (rewardItem.totalSlash) {
            result.totalSlash = parseFloat(rewardItem.totalSlash);
          }

          if (rewardItem.totalBond) {
            result.totalBond = parseFloat(rewardItem.totalBond);
          }

          if (latestReward && latestReward.amount) {
            result.latestReward = parseFloat(latestReward.amount);
          }

          if (latestReward && latestReward.smartContract) {
            result.smartContract = latestReward.smartContract;
          }
        }
      }

      return result as StakingAmount;
    }));

    for (const reward of rewards) {
      if (reward.smartContract) {
        parsedResult.smartContract = reward.smartContract;
      }

      if (reward.totalReward) {
        if (parsedResult.totalReward) {
          parsedResult.totalReward += toUnit(reward.totalReward, PREDEFINED_NETWORKS[chain].decimals as number);
        } else {
          parsedResult.totalReward = toUnit(reward.totalReward, PREDEFINED_NETWORKS[chain].decimals as number);
        }
      }

      if (reward.totalSlash) {
        if (parsedResult.totalSlash) {
          parsedResult.totalSlash += toUnit(reward.totalSlash, PREDEFINED_NETWORKS[chain].decimals as number);
        } else {
          parsedResult.totalSlash = toUnit(reward.totalSlash, PREDEFINED_NETWORKS[chain].decimals as number);
        }
      }

      if (reward.totalBond) {
        if (parsedResult.totalBond) {
          parsedResult.totalBond += toUnit(reward.totalBond, PREDEFINED_NETWORKS[chain].decimals as number);
        } else {
          parsedResult.totalBond = toUnit(reward.totalBond, PREDEFINED_NETWORKS[chain].decimals as number);
        }
      }

      if (reward.latestReward) {
        if (parsedResult.latestReward) {
          parsedResult.latestReward += toUnit(reward.latestReward, PREDEFINED_NETWORKS[chain].decimals as number);
        } else {
          parsedResult.latestReward = toUnit(reward.latestReward, PREDEFINED_NETWORKS[chain].decimals as number);
        }
      }
    }

    // callback(chain, {
    //   name: PREDEFINED_NETWORKS[chain].chain,
    //   chainId: chain,
    //   balance: parsedResult.totalBond ? parsedResult.totalBond.toString() : '0',
    //   nativeToken: PREDEFINED_NETWORKS[chain].nativeToken,
    //   unit: PREDEFINED_NETWORKS[chain].nativeToken,
    //   state: APIItemState.READY
    // } as StakingItem);

    return {
      name: PREDEFINED_NETWORKS[chain].chain,
      chainId: chain,
      totalReward: parsedResult.totalReward ? parsedResult.totalReward.toString() : '0',
      latestReward: parsedResult.latestReward ? parsedResult.latestReward.toString() : '0',
      totalSlash: parsedResult.totalSlash ? parsedResult.totalSlash.toString() : '0',
      smartContract: parsedResult.smartContract,
      state: APIItemState.READY
    } as StakingRewardItem;
  } catch (e) {
    console.log(`error getting ${chain} staking reward from subsquid`, e);

    return {
      name: PREDEFINED_NETWORKS[chain].chain,
      chainId: chain,
      totalReward: '0',
      latestReward: '0',
      totalSlash: '0',
      state: APIItemState.READY
    } as StakingRewardItem;
  }
};

export const getAllSubsquidStaking = async (accounts: string[], activeNetworks: string[]): Promise<StakingRewardJson> => {
  let rewardList: StakingRewardItem[] = [];

  const filteredNetworks: string[] = [];

  activeNetworks.forEach((network) => {
    if (SUPPORTED_STAKING_CHAINS.includes(network)) {
      filteredNetworks.push(network);
    }
  });

  const rewardItems = await Promise.all(filteredNetworks.map(async (network) => {
    return await getSubsquidStaking(accounts, network);
  }));

  rewardList = rewardList.concat(rewardItems);

  return {
    ready: true,
    details: rewardList
  } as StakingRewardJson;
};
