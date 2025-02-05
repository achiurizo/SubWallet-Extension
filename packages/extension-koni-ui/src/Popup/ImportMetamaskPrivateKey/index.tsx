// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Header } from '@subwallet/extension-koni-ui/partials';
import { EVM_ACCOUNT_TYPE } from '@subwallet/extension-koni-ui/Popup/CreateAccount';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { KeypairType } from '@polkadot/util-crypto/types';

import { AccountContext, ActionContext } from '../../components';
import useTranslation from '../../hooks/useTranslation';
import { createAccountSuriV2 } from '../../messaging';
import { DEFAULT_TYPE } from '../../util/defaultType';
import MetamaskPrivateKeyImport from '../ImportMetamaskPrivateKey/MetamaskPrivateKeyImport';

export interface AccountInfo {
  address: string;
  genesis?: string;
  suri: string;
}

interface Props extends ThemeProps {
  className?: string;
}

const KEYTYPES: KeypairType[] = [EVM_ACCOUNT_TYPE];

function ImportMetamaskPrivateKey ({ className = '' }: Props): React.ReactElement {
  const { t } = useTranslation();
  const { accounts } = useContext(AccountContext);
  const onAction = useContext(ActionContext);
  const [isBusy, setIsBusy] = useState(false);
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [isConnectWhenImport, setIsConnectWhenImport] = useState<boolean>(true);
  const accountsWithoutAll = accounts.filter((acc: { address: string; }) => acc.address !== 'ALL');
  const name = `Account ${accountsWithoutAll.length + 1}`;
  const type = DEFAULT_TYPE;

  useEffect((): void => {
    !accounts.length && onAction();
  }, [accounts, onAction]);

  const _onCreate = useCallback((name: string, password: string): void => {
    if (name && password && account) {
      setIsBusy(true);

      createAccountSuriV2(name, password, account.suri, isConnectWhenImport, KEYTYPES)
        .then(() => {
          window.localStorage.setItem('popupNavigation', '/');
          onAction('/');
        })
        .catch((error): void => {
          setIsBusy(false);
          console.error(error);
        });
    }
  }, [account, isConnectWhenImport, onAction]);

  return (
    <>
      <Header
        isBusy={isBusy}
        showCancelButton
        showSubHeader
        subHeaderName={t<string>('Import Private Key')}
      />
      <MetamaskPrivateKeyImport
        account={account}
        changeConnectWhenImport={setIsConnectWhenImport}
        className='import-seed-content-wrapper'
        isBusy={isBusy}
        isConnectWhenImport={isConnectWhenImport}
        keyTypes={KEYTYPES}
        name={name}
        onAccountChange={setAccount}
        onCreate={_onCreate}
        type={type}
      />

    </>
  );
}

export default styled(ImportMetamaskPrivateKey)`
`;
