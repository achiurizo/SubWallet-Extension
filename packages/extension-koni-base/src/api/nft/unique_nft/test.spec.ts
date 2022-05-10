import {AccountInfo} from "@polkadot/types/interfaces";
import {UniqueNftApiV2} from "@polkadot/extension-koni-base/api/nft/unique_nft/uniqueNftV2";

jest.setTimeout(50000);

describe('test DotSama APIs', () => {
  test('test get Balances', async () => {
    const nftApi = new UniqueNftApiV2();

    nftApi.setChain('uniqueNft');
    nftApi.setAddresses(['5HdwtP77HPPVzCVqEu38GGCHf1g9eQXCMZV5aPhZttN3sKF4']);

    nftApi.fetchNfts(
      (data) => {
        console.log(data);
      },
      (data) => {
        console.log(data);
      },
      (ready) => {
        console.log(ready);
      })
  });
});