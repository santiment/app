export const DASHBOARDS_TITLES = {
  SOCIAL_TOOL: 'Social Tool',
  ETH_TOKEN_TRADING: 'ETH Token Trading Analysis',
  ETH_2_STAKING: 'Ethereum 2.0 Staking Analytics',
  STABLECOINS: 'Stablecoins',
  UNISWAP_PROTOCOL: 'Uniswap Procotol',
  DECENTRALIZED_EXCHANGES: 'Decentralized Exchanges',
  BTC_LOCKED: 'Bitcoin Locked on Ethereum',
  NFT_INFLUENCERS_TRX: 'NFT Influencers Trx',
}

import { PATHS } from '../../paths'
import Stablecoins from './dashboards/Stablecoins/Stablecoins'
import EthStakingPools from './dashboards/EthStakingPools'

export const DASHBOARDS = [
  {
    title: DASHBOARDS_TITLES.SOCIAL_TOOL,
    subItems: [
      { title: 'Top 10 Hourly Trends', key: 'soc_tool_top_10' },
      {
        title: 'Popular Mid-Term Trends',
        key: 'soc_tool_mid_trends',
      },
    ],
    path: 'social-tool',
  },
  {
    title: DASHBOARDS_TITLES.ETH_TOKEN_TRADING,
    subItems: [
      {
        title: 'Volume against ETH Based tokens (DEXs)',
        key: 'eth_token_volume_against_eth',
      },
      {
        title: 'Volume against USD Based tokens (Stablecoins)',
        key: 'eth_token_volume_against_usd',
      },
      {
        title: 'Token Price against ETH Based Tokens segmented by DEXs',
        key: 'eth_token_token_against_eth',
      },
      {
        title: 'Label Balance',
        key: 'eth_token_label_balance',
      },
    ],
    path: 'eth-token-trading',
  },
  {
    title: DASHBOARDS_TITLES.ETH_2_STAKING,
    subItems: [
      {
        title: 'Staking Roi',
        key: 'eth_2_roi',
      },
      {
        title: 'Total Staked',
        key: 'eth_2_total_staked',
      },
      {
        title: 'Staked amount by Label',
        key: 'eth_2_staked_amount_label',
      },
      {
        title: 'Number of Staked Addresses by Label',
        key: 'eth_2_staked_addresses_label',
      },
      {
        title: 'Unlabeled Staker Inflow Sources',
        key: 'eth_2_staker_inflow',
      },
      {
        title: 'Top Stakers',
        key: 'eth_2_top_stakers',
      },
    ],
    path: 'eth-2-staking',
  },

  {
    name: 'Ethereum Staking Pools',
    // description: 'Information all about staking metrics and statistics for the new Ethereum 2.0.',
    to: PATHS.ETH_STAKING_POOLS,
    submenu: [
      {
        title: 'Number of Validators',
        key: 'validators-number',
      },
      {
        title: 'Total Staked in USD',
        key: 'total-staked',
      },
      {
        title: 'Staking Pool Distributions',
        key: 'distributions',
      },
      {
        title: 'Staking Pool Distributions Delta',
        key: 'distributions-delta',
      },
    ],
    Content: EthStakingPools,
  },

  {
    title: DASHBOARDS_TITLES.STABLECOINS,
    subItems: [
      {
        title: 'Stablecoins Overview',
        key: 'stablecoins_overview',
      },
      {
        title: 'Whale Trends',
        key: 'stablecoins_whale_trends',
      },
      {
        title: 'Flow to Exchanges',
        key: 'stablecoins_flow_exchanges',
      },
      {
        title: 'Top Exchanges',
        key: 'stablecoins_top_exchanges',
      },
      {
        title: 'Stablecoin Net Exchange Flow',
        key: 'stablecoins_net_exchange',
      },
      {
        title: 'Largest Transactions to Exchanges',
        key: 'stablecoins_largest_transactions',
      },
      {
        title: 'Holder Distribution',
        key: 'stablecoins_holder_distribution',
      },
      {
        title: 'Transaction Activity',
        key: 'stablecoins_transaction_activity',
      },
      {
        title: 'Network Activity',
        key: 'stablecoins_network_activity',
      },
    ],
    path: 'stablecoins',
  },
  {
    title: DASHBOARDS_TITLES.UNISWAP_PROTOCOL,
    subItems: [
      {
        title: 'Top Exchanges',
        key: 'uniswap_top_exchanges',
      },
      {
        title: 'UNI Flow Balances',
        key: 'uniswap_uni_balances',
      },
      {
        title: 'Top Token Transactions',
        key: 'uniswap_top_token_transactions',
      },
      {
        title: 'UNI Price, Age Consumed, Active Addresses (24h)',
        key: 'uniswap_uni_price',
      },
      {
        title: 'Token Distributor',
        key: 'uniswap_token_distributor',
      },
      {
        title: 'UNI Token Claims',
        key: 'uniswap_uni_token_claims',
      },
      {
        title: 'Top Claimers',
        key: 'uniswap_top_claimers',
      },
      {
        title: 'UNI Claims: Overview',
        key: 'uniswap_uni_claims',
      },
      {
        title: 'Who claimed UNI?',
        key: 'uniswap_who_claimed',
      },
    ],
    path: 'uniswap',
  },
  {
    title: DASHBOARDS_TITLES.DECENTRALIZED_EXCHANGES,
    subItems: [
      {
        title: 'Volume of DEXs Trades',
        key: 'dex_volume_trades',
      },
      {
        title: 'Volume of Trades by DEXs',
        key: 'dex_volume_trades_by',
      },
      {
        title: 'Total Number of DEX Trades',
        key: 'dex_total_trades',
      },
      {
        title: 'Number of Trades Segmented by DEX',
        key: 'dex_segmented_trades',
      },
    ],
    path: 'dex',
  },
  {
    title: DASHBOARDS_TITLES.BTC_LOCKED,
    subItems: [
      {
        title: 'Total Supply',
        key: 'btc_total_supply',
      },
      {
        title: 'Distribution of Bitcoin on Ethereum',
        key: 'btc_distribution',
      },
      {
        title: 'Total BTC on Ethereum',
        key: 'btc_total_eth',
      },
    ],
    path: 'btc-locked',
  },
  { title: DASHBOARDS_TITLES.NFT_INFLUENCERS_TRX, path: 'nft' },
]
