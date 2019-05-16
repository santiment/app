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
  },
  {
    name: 'Top 50 ERC20',
    to: '/assets/list?name=top%2050%20erc20%40227#shared',
    assetType: 'top50Erc20'
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
    name: 'US-Based Projects',
    assetType: 'usa',
    to: '/assets/list?name=usa@138#shared',
    id: '138'
  },
  {
    name: 'Decentralized Exchanges',
    assetType: 'dex',
    to: '/assets/list?name=dex@127#shared',
    id: '127'
  },
  {
    name: 'Centralized Exchanges',
    assetType: 'centralized exchanges',
    to: '/assets/list?name=centralized%20exchanges@272#shared',
    id: '272'
  }
]

export const CATEGORIES = [...BASIC_CATEGORIES, ...PUBLIC_WATCHLISTS]
