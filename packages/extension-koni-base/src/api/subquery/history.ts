// Copyright 2019-2022 @polkadot/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { gql } from '@apollo/client';

import { TransactionHistoryItemType } from '@polkadot/extension-base/background/KoniTypes';
import NETWORKS from '@polkadot/extension-koni-base/api/endpoints';
// eslint-disable-next-line import-newlines/enforce
import { DotSamaHistory,
// eslint-disable-next-line camelcase
  DotSamaHistory_historyElements_nodes,
  DotSamaHistoryVariables } from '@polkadot/extension-koni-base/api/subquery/__generated__/DotSamaHistory';
import { newApolloClient } from '@polkadot/extension-koni-base/api/subquery/subquery';
import { state } from '@polkadot/extension-koni-base/background/handlers';
import { isAccountAll, reformatAddress } from '@polkadot/extension-koni-base/utils/utils';

export const HistoryApiMap: Record<string, string> = {
  polkadot: 'https://api.subquery.network/sq/nova-wallet/nova-westend',
  kusama: 'https://api.subquery.network/sq/nova-wallet/nova-kusama',
  westend: 'https://api.subquery.network/sq/nova-wallet/nova-westend'
};

function getApolloClient (networkKey: string) {
  return newApolloClient(HistoryApiMap[networkKey]);
}

export const DOTSAMA_HISTORY_QUERY = gql`
    query DotSamaHistory($first: Int = 100, $address: String = null) {
        historyElements (first: $first, filter: {address: {equalTo: $address}}) {
            nodes {
                id
                blockNumber
                extrinsicIdx
                extrinsicHash
                timestamp
                address
                reward
                extrinsic
                transfer
            }
        }
    }
`;

// eslint-disable-next-line camelcase
function getHistoryAction (address: string, node: DotSamaHistory_historyElements_nodes): 'send' | 'received' {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return address === node?.transfer.from ? 'send' : 'received';
}

function isHistoryChange (networkKey: string, items: TransactionHistoryItemType[]): boolean {
  const historyMap = state.getHistoryMap();
  const originLength = (!!historyMap[networkKey] && historyMap[networkKey].length) || 0;

  return originLength !== items.length;
}

export const fetchDotSamaHistory = (address: string, callBack: (historyMap: Record<string, TransactionHistoryItemType[]>) => void) => {
  if (isAccountAll(address)) {
    callBack({});

    return;
  }

  const historyMap: Record<string, TransactionHistoryItemType[]> = {};

  Object.entries(NETWORKS).forEach(([networkKey, networkInfo]) => {
    if (!HistoryApiMap[networkKey]) {
      state.getTransactionHistory(address, networkKey, (items) => {
        if (isHistoryChange(networkKey, items)) {
          historyMap[networkKey] = items;
          callBack(historyMap);
        }
      });

      return;
    }

    const formattedAddress = reformatAddress(address, networkInfo.ss58Format, networkInfo.isEthereum);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    // @ts-ignore
    getApolloClient(networkKey).query<DotSamaHistory, DotSamaHistoryVariables>({
      query: DOTSAMA_HISTORY_QUERY,
      variables: {
        first: 0,
        address: formattedAddress
      }
    }).then((rs) => {
      if (!rs?.data?.historyElements?.nodes) {
        return;
      }

      const items: TransactionHistoryItemType[] = [];

      rs?.data?.historyElements?.nodes.filter((n) => !!n).forEach((n) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (!n?.transfer || !n.extrinsicHash) {
          console.log(`Can not get history item of ${networkKey}`, n);

          return;
        }

        items.push({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          action: getHistoryAction(formattedAddress, n),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
          change: n.transfer.success ? n.transfer.amount : '0',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
          extrinsicHash: n.extrinsicHash,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
          fee: n.transfer.fee,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
          isSuccess: n.transfer.success,
          networkKey,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
          time: (+n.timestamp) * 1000
        });
      });

      if (isHistoryChange(networkKey, items)) {
        historyMap[networkKey] = items;
        callBack(historyMap);
      }
    }).catch((e: any) => {
      console.log(`History API of ${networkKey} is error`, e);
    });
  });
};