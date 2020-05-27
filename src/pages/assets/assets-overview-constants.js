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

export const TRENDING_WATCHLIST_NAME = 'Trending assets'

export const WATCHLISTS_BY_SLUG = [
  {
    name: 'Top 50 ERC20',
    assetType: 'top 50 erc20',
    to: '/assets/list?name=top%2050%20erc20#shared',
    bySlug: 'Top_50_ERC20'
  },
  {
    name: 'Stablecoins',
    assetType: 'stablecoins',
    to: '/assets/list?name=stablecoins#shared',
    bySlug: 'stablecoins'
  },
  {
    name: 'Centralized Exchanges',
    assetType: 'centralized exchanges',
    to: '/assets/list?name=centralized%20exchanges#shared',
    bySlug: 'centralized_exchanges'
  },
  {
    name: 'Decentralized Exchanges',
    assetType: 'decentralized exchanges',
    to: '/assets/list?name=decentralized%20exchanges#shared',
    bySlug: 'decentralized_exchanges'
  },
  {
    name: TRENDING_WATCHLIST_NAME,
    assetType: 'trending assets',
    to: '/assets/list?name=trending%20assets#shared',
    bySlug: 'trending_assets'
  }
]

export const CATEGORIES = [...BASIC_CATEGORIES, ...WATCHLISTS_BY_SLUG]
