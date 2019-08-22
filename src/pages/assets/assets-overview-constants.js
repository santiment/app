export const BASIC_CATEGORIES = [
  {
    name: 'All assets',
    to: '/assets/all',
    slug: 'TOTAL_MARKET',
    assetType: 'all'
  },
  {
    name: 'ERC20',
    to: '/assets/erc20',
    slug: 'TOTAL_ERC20',
    assetType: 'erc20'
  }
]

export const PUBLIC_WATCHLISTS = [
  {
    name: 'Stablecoins',
    assetType: 'stablecoins',
    to: '/assets/list?name=stablecoins@86#shared',
    id: '86'
  },
  {
    name: 'Decentralized Exchanges',
    assetType: 'decentralized exchanges',
    to: '/assets/list?name=decentralized%20exchanges@127#shared',
    id: '127'
  },
  {
    name: 'Centralized Exchanges',
    assetType: 'centralized exchanges',
    to: '/assets/list?name=centralized%20exchanges@272#shared',
    id: '272'
  }
]

export const TRENDING_WATCHLIST_NAME = 'Emerging trending assets'

export const WATCHLISTS_BY_SLUG = [
  {
    name: 'Top 50 ERC20',
    assetType: 'top 50 erc20',
    to: '/assets/list?name=top%2050%20erc20#shared',
    bySlug: 'Top_50_ERC20'
  },
  {
    name: TRENDING_WATCHLIST_NAME,
    assetType: 'trending assets',
    to: '/assets/list?name=trending%20assets#shared',
    bySlug: 'trending_assets'
  }
]

export const CATEGORIES = [
  ...BASIC_CATEGORIES,
  ...WATCHLISTS_BY_SLUG,
  ...PUBLIC_WATCHLISTS
]
