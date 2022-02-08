// Copyright 2019-2022 @polkadot/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NetWorkInfo } from '@polkadot/extension-base/background/KoniTypes';

const NETWORKS: Record<string, NetWorkInfo> = {
  polkadot: {
    chain: 'Polkadot Relay Chain',
    genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
    icon: 'polkadot',
    ss58Format: 0,
    provider: 'wss://polkadot.api.onfinality.io/public-ws',
    group: 'RELAY_CHAIN'
  },
  kusama: {
    chain: 'Kusama Relay Chain',
    genesisHash: '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe',
    icon: 'polkadot',
    ss58Format: 2,
    provider: 'wss://kusama.api.onfinality.io/public-ws',
    group: 'RELAY_CHAIN'
  },
  westend: {
    chain: 'Westend Relay Chain',
    genesisHash: '0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e',
    icon: 'polkadot',
    ss58Format: 42,
    provider: 'wss://westend.api.onfinality.io/public-ws',
    group: 'RELAY_CHAIN'
  },
  rococo: {
    chain: 'Rococo Relay Chain',
    genesisHash: '0x037f5f3c8e67b314062025fc886fcd6238ea25a4a9b45dce8d246815c9ebe770',
    icon: 'polkadot',
    ss58Format: 42,
    provider: 'wss://rococo-rpc.polkadot.io',
    group: 'RELAY_CHAIN'
  },
  koni: {
    chain: 'Koni test',
    genesisHash: '0x7a48390870728092c951aaf4e1632c849a74489d9cee0bf51d3527b33983fc0a',
    icon: 'polkadot',
    ss58Format: 42,
    provider: 'wss://rpc.koniverse.com',
    group: 'POLKADOT_PARACHAIN'
  },
  statemint: {
    chain: 'Statemint',
    genesisHash: '0x68d56f15f85d3136970ec16946040bc1752654e906147f7e43e9d539d7c3de2f',
    icon: 'polkadot',
    ss58Format: 0,
    provider: 'wss://statemint.api.onfinality.io/public-ws',
    group: 'POLKADOT_PARACHAIN',
    paraId: 1000
  },
  acala: {
    chain: 'Acala',
    genesisHash: '0xfc41b9bd8ef8fe53d58c7ea67c794c7ec9a73daf05e6d54b14ff6342c99ba64c',
    ss58Format: 10,
    provider: 'wss://acala-polkadot.api.onfinality.io/public-ws',
    group: 'POLKADOT_PARACHAIN',
    paraId: 2000
  },
  moonbeam: {
    chain: 'Moonbeam',
    genesisHash: '0xfe58ea77779b7abda7da4ec526d14db9b1e9cd40a217c34892af80a9b332b76d',
    ss58Format: 1284,
    provider: 'wss://moonbeam.api.onfinality.io/public-ws',
    group: 'POLKADOT_PARACHAIN',
    paraId: 2004,
    isEthereum: true
  },
  astar: {
    chain: 'Astar',
    genesisHash: '0x9eb76c5184c4ab8679d2d5d819fdf90b9c001403e9e17da2e14b6d8aec4029c6',
    ss58Format: 5,
    provider: 'wss://astar.api.onfinality.io/public-ws',
    group: 'POLKADOT_PARACHAIN',
    paraId: 2006
  },
  parallel: {
    chain: 'Parallel',
    genesisHash: '0xe61a41c53f5dcd0beb09df93b34402aada44cb05117b71059cce40a2723a4e97',
    ss58Format: 172,
    provider: 'wss://parallel.api.onfinality.io/public-ws',
    group: 'POLKADOT_PARACHAIN',
    paraId: 2012
  },
  clover: {
    chain: 'Clover',
    genesisHash: '0x5c7bd13edf349b33eb175ffae85210299e324d852916336027391536e686f267',
    ss58Format: 128,
    provider: 'wss://clover.api.onfinality.io/public-ws',
    group: 'POLKADOT_PARACHAIN',
    paraId: 2002
  },
  hydradx: {
    chain: 'HydraDX',
    genesisHash: '0xd2a620c27ec5cbc5621ff9a522689895074f7cca0d08e7134a7804e1a3ba86fc',
    ss58Format: 63,
    provider: 'wss://rpc-01.snakenet.hydradx.io',
    group: 'POLKADOT_PARACHAIN',
    paraId: 2034
  },
  edgeware: {
    chain: 'Edgeware',
    genesisHash: '0x742a2ca70c2fda6cee4f8df98d64c4c670a052d9568058982dad9d5a7a135c5b',
    ss58Format: 7,
    provider: 'wss://edgeware.api.onfinality.io/public-ws',
    group: 'POLKADOT_PARACHAIN'
  },
  centrifuge: {
    chain: 'Centrifuge',
    genesisHash: '0x67dddf2673b69e5f875f6f25277495834398eafd67f492e09f3f3345e003d1b5',
    ss58Format: 36,
    provider: 'wss://fullnode.centrifuge.io',
    group: 'POLKADOT_PARACHAIN',
    paraId: 2031
  },
  interlay: {
    chain: 'Interlay',
    genesisHash: '0xed86d448b84db333cdbe07362ddc79530343b907bd88712557c024d7a94296bb',
    ss58Format: 42,
    provider: 'wss://api.interlay.io/parachain',
    group: 'POLKADOT_PARACHAIN',
    paraId: 2032
  },
  equilibrium: {
    chain: 'Equilibrium',
    genesisHash: '0x6f1a800de3daff7f5e037ddf66ab22ce03ab91874debeddb1086f5f7dbd48925',
    ss58Format: 68,
    provider: 'wss://node.equilibrium.io',
    group: 'POLKADOT_PARACHAIN',
    paraId: 2011
  },
  nodle: {
    chain: 'Nodle',
    genesisHash: '0xa3d114c2b8d0627c1aa9b134eafcf7d05ca561fdc19fb388bb9457f81809fb23',
    ss58Format: 37,
    provider: 'wss://main3.nodleprotocol.io',
    group: 'POLKADOT_PARACHAIN',
    paraId: 2026
  },
  darwinia: {
    chain: 'Darwinia',
    genesisHash: '0x729cb8f2cf428adcf81fe69610edda32c5711b2ff17de747e8604a3587021db8',
    ss58Format: 18,
    provider: 'wss://rpc.darwinia.network',
    group: 'POLKADOT_PARACHAIN',
    paraId: 2003
  },
  manta: {
    chain: 'Manta',
    genesisHash: '0x7822fe86be209e140e1bdb80fb09539d1825e3d1dfee79ce37c336a832a26d48',
    ss58Format: 77,
    provider: 'wss://pectinata.manta.systems',
    group: 'POLKADOT_PARACHAIN',
    paraId: 2015
  },
  'sora-substrate': {
    chain: 'SORA',
    genesisHash: '0x7e4e32d0feafd4f9c9414b0be86373f9a1efa904809b683453a9af6856d38ad5',
    ss58Format: 69,
    provider: 'wss://sora.api.onfinality.io/public-ws',
    group: 'POLKADOT_PARACHAIN'
  },
  subgame: {
    chain: 'SubGame',
    genesisHash: '0xe6343cef9167c43305c6f197bbd90d55bf93efc561b3d698845398cd864f6eb3',
    ss58Format: 27,
    provider: 'wss://mainnet.subgame.org',
    group: 'POLKADOT_PARACHAIN',
    paraId: 2017
  },
  efinity: {
    chain: 'Efinity',
    genesisHash: 'UNKNOWN',
    ss58Format: -1,
    provider: 'PROVIDER',
    group: 'POLKADOT_PARACHAIN',
    paraId: 2021
  },
  composableFinance: {
    chain: 'Composable Finance',
    genesisHash: 'UNKNOWN',
    ss58Format: -1,
    provider: 'PROVIDER',
    group: 'POLKADOT_PARACHAIN',
    paraId: 2019
  },
  litentry: {
    chain: 'Litentry',
    genesisHash: 'UNKNOWN',
    ss58Format: -1,
    provider: 'PROVIDER',
    group: 'POLKADOT_PARACHAIN',
    paraId: 2013
  },
  phala: {
    chain: 'Phala Network',
    genesisHash: 'UNKNOWN',
    ss58Format: -1,
    provider: 'PROVIDER',
    group: 'POLKADOT_PARACHAIN',
    paraId: 2035
  },
  crust: {
    chain: 'Crust Network',
    genesisHash: '0x8b404e7ed8789d813982b9cb4c8b664c05b3fbf433309f603af014ec9ce56a8c',
    ss58Format: 66,
    provider: 'wss://rpc.crust.network',
    group: 'POLKADOT_PARACHAIN',
    paraId: 2008
  },
  coinversation: {
    chain: 'Coinversation',
    genesisHash: 'UNKNOWN',
    ss58Format: -1,
    provider: 'PROVIDER',
    group: 'POLKADOT_PARACHAIN',
    paraId: 2027
  },
  statemine: {
    chain: 'Statemine',
    genesisHash: '0x48239ef607d7928874027a43a67689209727dfb3d3dc5e5b03a39bdc2eda771a',
    icon: 'polkadot',
    ss58Format: 2,
    provider: 'wss://statemine.api.onfinality.io/public-ws',
    group: 'KUSAMA_PARACHAIN',
    paraId: 1000
  },
  karura: {
    chain: 'Karura',
    genesisHash: '0xbaf5aabe40646d11f0ee8abbdc64f4a4b7674925cba08e4a05ff9ebed6e2126b',
    ss58Format: 8,
    provider: 'wss://karura.api.onfinality.io/public-ws',
    group: 'KUSAMA_PARACHAIN',
    paraId: 2000
  },
  moonriver: {
    chain: 'Moonriver',
    genesisHash: '0x401a1f9dca3da46f5c4091016c8a2f26dcea05865116b286f60f668207d1474b',
    ss58Format: 1285,
    provider: 'wss://moonriver.api.onfinality.io/public-ws',
    group: 'KUSAMA_PARACHAIN',
    paraId: 2023,
    isEthereum: true
  },
  shiden: {
    chain: 'Shiden',
    genesisHash: '0xf1cf9022c7ebb34b162d5b5e34e705a5a740b2d0ecc1009fb89023e62a488108',
    ss58Format: 5,
    provider: 'wss://shiden.api.onfinality.io/public-ws',
    group: 'KUSAMA_PARACHAIN',
    paraId: 2007
  },
  khala: {
    chain: 'Khala',
    genesisHash: '0xd43540ba6d3eb4897c28a77d48cb5b729fea37603cbbfc7a86a73b72adb3be8d',
    ss58Format: 30,
    provider: 'wss://khala.api.onfinality.io/public-ws',
    group: 'KUSAMA_PARACHAIN',
    paraId: 2004
  },
  bifrost: {
    chain: 'Bifrost',
    genesisHash: '0x9f28c6a68e0fc9646eff64935684f6eeeece527e37bbe1f213d22caa1d9d6bed',
    ss58Format: 6,
    provider: 'wss://bifrost-parachain.api.onfinality.io/public-ws',
    group: 'KUSAMA_PARACHAIN',
    paraId: 2001
  },
  kilt: {
    chain: 'KILT Spiritnet',
    genesisHash: '0x411f057b9107718c9624d6aa4a3f23c1653898297f3d4d529d9bb6511a39dd21',
    ss58Format: 38,
    provider: 'wss://spiritnet.api.onfinality.io/public-ws',
    group: 'KUSAMA_PARACHAIN',
    paraId: 2086
  },
  calamari: {
    chain: 'Calamari Parachain',
    genesisHash: '0x4ac80c99289841dd946ef92765bf659a307d39189b3ce374a92b5f0415ee17a1',
    ss58Format: 78,
    provider: 'wss://calamari.api.onfinality.io/public-ws',
    group: 'KUSAMA_PARACHAIN',
    paraId: 2084
  },
  basilisk: {
    chain: 'Basilisk',
    genesisHash: '0xa85cfb9b9fd4d622a5b28289a02347af987d8f73fa3108450e2b4a11c1ce5755',
    ss58Format: 10041,
    provider: 'wss://basilisk.api.onfinality.io/public-ws',
    group: 'KUSAMA_PARACHAIN',
    paraId: 2090
  },
  altair: {
    chain: 'Altair',
    genesisHash: '0xaa3876c1dc8a1afcc2e9a685a49ff7704cfd36ad8c90bf2702b9d1b00cc40011',
    ss58Format: 136,
    provider: 'wss://altair.api.onfinality.io/public-ws',
    group: 'KUSAMA_PARACHAIN',
    paraId: 2088
  },
  heiko: {
    chain: 'Heiko',
    genesisHash: '0x64a1c658a48b2e70a7fb1ad4c39eea35022568c20fc44a6e2e3d0a57aee6053b',
    ss58Format: 110,
    provider: 'wss://parallel-heiko.api.onfinality.io/public-ws',
    group: 'KUSAMA_PARACHAIN',
    paraId: 2085
  },
  kintsugi: {
    chain: 'Kintsugi',
    genesisHash: '0x9af9a64e6e4da8e3073901c3ff0cc4c3aad9563786d89daf6ad820b6e14a0b8b',
    ss58Format: 2092,
    provider: 'wss://kintsugi.api.onfinality.io/public-ws',
    group: 'KUSAMA_PARACHAIN',
    paraId: 2092
  },
  picasso: {
    chain: 'Picasso',
    genesisHash: '0x6811a339673c9daa897944dcdac99c6e2939cc88245ed21951a0a3c9a2be75bc',
    ss58Format: 49,
    provider: 'wss://picasso-rpc.composable.finance',
    group: 'KUSAMA_PARACHAIN',
    paraId: 2087
  },
  pioneer: {
    chain: 'Pioneer Network',
    genesisHash: '0xf22b7850cdd5a7657bbfd90ac86441275bbc57ace3d2698a740c7b0ec4de5ec3',
    ss58Format: 268,
    provider: 'wss://pioneer.api.onfinality.io/public-ws',
    group: 'KUSAMA_PARACHAIN',
    paraId: 2096
  },
  quartz: {
    chain: 'QUARTZ by UNIQUE',
    genesisHash: '0xcd4d732201ebe5d6b014edda071c4203e16867305332301dc8d092044b28e554',
    ss58Format: 255,
    provider: 'wss://quartz.api.onfinality.io/public-ws',
    group: 'KUSAMA_PARACHAIN',
    paraId: 2095
  },
  genshiro: {
    chain: 'Genshiro',
    genesisHash: '0x9b8cefc0eb5c568b527998bdd76c184e2b76ae561be76e4667072230217ea243',
    ss58Format: 67,
    provider: 'wss://node.genshiro.io',
    group: 'KUSAMA_PARACHAIN',
    paraId: 2024
  },
  subsocial: {
    chain: 'Subsocial',
    genesisHash: '0x0bd72c1c305172e1275278aaeb3f161e02eccb7a819e63f62d47bd53a28189f8',
    ss58Format: 28,
    provider: 'wss://rpc.subsocial.network',
    group: 'KUSAMA_PARACHAIN',
    paraId: 2100
  },
  zeitgeist: {
    chain: 'Zeitgeist',
    genesisHash: 'UNKNOWN',
    ss58Format: -1,
    provider: 'PROVIDER',
    group: 'KUSAMA_PARACHAIN',
    paraId: 2101
  },
  sakura: {
    chain: 'Sakura',
    genesisHash: 'UNKNOWN',
    ss58Format: -1,
    provider: 'PROVIDER',
    group: 'KUSAMA_PARACHAIN',
    paraId: 2016
  },
  shadow: {
    chain: 'Crust Shadow',
    genesisHash: 'UNKNOWN',
    ss58Format: -1,
    provider: 'PROVIDER',
    group: 'NOT_SURE'
  },
  uniqueNft: {
    chain: 'Unique TestNet 2.0',
    genesisHash: 'UNKNOWN',
    ss58Format: -1,
    provider: 'wss://testnet2.uniquenetwork.io',
    group: 'KUSAMA_PARACHAIN',
    paraId: 2012
  },
  robonomics: {
    chain: 'Robonomics',
    genesisHash: '0x631ccc82a078481584041656af292834e1ae6daab61d2875b4dd0c14bb9b17bc',
    ss58Format: 32,
    provider: 'wss://kusama.rpc.robonomics.network',
    group: 'KUSAMA_PARACHAIN',
    paraId: 2048
  },
  integritee: {
    chain: 'Integritee Network',
    genesisHash: '0xf195ef30c646663a24a3164b307521174a86f437c586397a43183c736a8383c1',
    ss58Format: 13,
    provider: 'wss://api.solo.integritee.io',
    group: 'KUSAMA_PARACHAIN',
    paraId: 2015
  },
  crab: {
    chain: 'Darwinia Crab',
    genesisHash: '0x34f61bfda344b3fad3c3e38832a91448b3c613b199eb23e5110a635d71c13c65',
    ss58Format: 42,
    provider: 'wss://crab-rpc.darwinia.network',
    group: 'KUSAMA_PARACHAIN',
    paraId: 2105
  },
  pichiu: {
    chain: 'Pichiu',
    genesisHash: '0xb14149220320bdc127278f8055b96c1d27750337694e920c4b8053c15145d3b1',
    ss58Format: 42,
    provider: 'wss://kusama.kylin-node.co.uk',
    group: 'KUSAMA_PARACHAIN',
    paraId: 2102
  }
};

export default NETWORKS;