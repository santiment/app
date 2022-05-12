import { PATHS } from '../../paths'
import SocialTrends from './dashboards/SocialTrends/SocialTrends'
import EthToken from './dashboards/ETHToken/ETHToken'
import Eth2 from './dashboards/ETH2/ETH2'
import Stablecoins from './dashboards/Stablecoins/Stablecoins'
import UniswapProtocol from './dashboards/UniswapProtocol/UniswapProtocol'
import Dex from './dashboards/Dex/Dex'
import BtcLocked from './dashboards/BTCLocked/BTCLocked'
import NFTTx from './dashboards/NFTTx/NFTTx'

export const DASHBOARDS = [
  {
    name: 'Social Trends',
    description: 'Explore the social volume of any word on crypto social media.',
    to: PATHS.SOCIAL_TRENDS,
    Content: SocialTrends,
  },
  {
    name: 'Social Tool',
    to: PATHS.SOCIAL_TOOl,
    shouldRedirect: true,
  },
  {
    name: 'ETH Token Trading Analysis',
    to: PATHS.ETH_ANALYSIS,
    submenu: [
      {
        title: 'Trading',
        key: '',
      },
      {
        title: 'Volume against ETH Based tokens (DEXs)',
        key: 'volume-against-eth',
      },
      {
        title: 'Volume against USD Based tokens (Stablecoins)',
        key: 'volume-against-usd',
      },
      {
        title: 'Token Price against ETH Based Tokens segmented by DEXs',
        key: 'token-price',
      },
      {
        title: 'Labeling',
        key: '',
      },
      {
        title: 'Label Balance',
        key: 'label-balance',
      },
    ],
    Content: EthToken,
  },
  {
    name: 'Ethereum 2.0 Staking Analytics',
    description: 'Information all about staking metrics and statistics for the new Ethereum 2.0.',
    to: PATHS.ETH2,
    submenu: [
      {
        title: 'Staking Roi',
        key: 'staking-roi',
      },
      {
        title: 'Total Staked',
        key: 'total-staked',
      },
      {
        title: 'Staked amount by Label',
        key: 'staked-by-label',
      },
      {
        title: 'Number of Staked Addresses by Label',
        key: 'staked-addresses',
      },
      {
        title: 'Unlabeled Staker Inflow Sources',
        key: 'unlabeled-inflow',
      },
      {
        title: 'Top Stakers',
        key: 'top-stakers',
      },
    ],
    Content: Eth2,
  },
  {
    name: 'Stablecoins',
    description:
      'Real-time information on the biggest stablecoins’ market size, whale behavior, speculative demand and more.',
    to: PATHS.STABLECOINS,
    submenu: [
      {
        title: 'Stablecoins Overview',
        key: 'overview',
      },
      {
        title: 'Whale Trends',
        key: 'whale-trends',
      },
      {
        title: 'Flow to Exchanges',
        key: 'flow-to-exchanges',
      },
      {
        title: 'Top Exchanges',
        key: 'top-exchanges',
      },
      {
        title: 'Stablecoin Net Exchange Flow',
        key: 'net-exchange-flow',
      },
      {
        title: 'Largest Transactions to Exchanges',
        key: 'largest-transactions',
      },
      {
        title: 'Holder Distribution',
        key: 'holder-distribution',
      },
      {
        title: 'Transaction Activity',
        key: 'transaction-activity',
      },
      {
        title: 'Network Activity',
        key: 'network-activity',
      },
    ],
    Content: Stablecoins,
  },
  {
    name: 'Uniswap Protocol',
    description:
      'Real-time data on UNI token distribution, total amount of UNI claimed, amount of UNI on centralized and decentralized exchange, top UNI transactions and more.',
    to: PATHS.UNISWAP_PROTOCOL,
    submenu: [
      {
        title: 'General',
        key: '',
      },
      {
        title: 'Top Exchanges',
        key: 'top-exchanges',
      },
      {
        title: 'UNI Flow Balances',
        key: 'flow-balances',
      },
      {
        title: 'Top Token Transactions',
        key: 'top-transactions',
      },
      {
        title: 'UNI Price, Age Consumed, Active Addresses (24h)',
        key: 'metrics',
      },
      {
        title: 'Initial Distribution',
        key: '',
      },
      {
        title: 'Token Distributor',
        key: 'token-distributor',
      },
      {
        title: 'UNI Token Claims',
        key: 'claimers',
      },
      {
        title: 'Top Claimers',
        key: 'top-claimers',
      },
      {
        title: 'UNI Claims: Overview',
        key: 'claimers-widgets',
      },
      {
        title: 'Who claimed UNI?',
        key: 'who-claimed',
      },
    ],
    Content: UniswapProtocol,
  },
  {
    name: 'Decentralized Exchanges',
    description:
      'Track the on-chain activity on 18 decentralized exchanges, their daily volumes, number of trades and the usage rate of individual DEXes over time. This data is from the main decentralized exchanges namely Balancer, Bancor, Curve, dYdX, Etherdelta, Gnosis, IDEX, Kyber, Oasis, 0x, Tokenstore, Uniswap, AirSwap, DEX.Top and DDEX.',
    to: PATHS.DEXS,
    submenu: [
      {
        title: 'Volume of DEXs Trades',
        key: 'trades-volume',
      },
      {
        title: 'Volume of Trades by DEXs',
        key: 'dex-by-volume',
      },
      {
        title: 'Total Number of DEX Trades',
        key: 'trades-amount',
      },
      {
        title: 'Number of Trades Segmented by DEX',
        key: 'dex-by-amount',
      },
    ],
    Content: Dex,
  },
  {
    name: 'Bitcoin Locked on Ethereum',
    to: PATHS.BTC_LOCKED,
    submenu: [
      {
        title: 'Total Supply',
        key: 'total-supply',
      },
      {
        title: 'Distribution of Bitcoin on Ethereum',
        key: 'distribution-on-eth',
      },
      {
        title: 'Total BTC on Ethereum',
        key: 'total-on-eth',
      },
    ],
    Content: BtcLocked,
  },
  {
    name: 'NFT Influencers Trx',
    to: PATHS.NFT_INFLUENCERS_TRX,
    Content: NFTTx,
  },
]
