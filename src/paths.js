export const PATHS = {
  ALERTS: '/alerts',
  FEED: '/feed',
  SOCIAL_TOOl: '/labs/trends/explore',
  SOCIAL_TRENDS: '/labs/trends',
  NFT: '/nft',
  LOGIN: '/login',
  LOGIN_VIA_EMAIL: '/login/email',
  CREATE_ACCOUNT: '/sign-up',
  GDPR: '/gdpr',
  USERNAME: '/username',
  PRO_METRICS: '/pro-sheets-templates',
  INDEX: '/',
  EXPLORER: '/',
  STUDIO: '/studio',
  CHARTS: '/charts',
  STABLECOINS: '/stablecoins',
  ETH2: '/eth2',
  ETH_STAKING_POOLS: '/eth-staking-pools',
  ETH_ANALYSIS: '/eth-analysis',
  UNISWAP_PROTOCOL: '/uniswap-protocol',
  SHEETS_TEMPLATES: '/sheets/daa-vs-price',
  LABELS: '/labels',
  DEXS: '/decentralized-exchanges',
  BTC_LOCKED: '/bitcoin-locked-on-ethereum',
  NFT_INFLUENCERS_TRX: '/nft-influencers-trx',
  ADDRESSES_WATCHLIST: '/watchlist/addresses',
  PROJECTS_WATCHLIST: '/watchlist/projects',
  SCREENER: '/screener',
  DASHBOARDS: '/dashboards',
}

export const isListPath = (path) =>
  path.includes(PATHS.PROJECTS_WATCHLIST) ||
  path.includes(PATHS.ADDRESSES_WATCHLIST) ||
  path.includes(PATHS.SCREENER) ||
  path.includes('/assets/list')
