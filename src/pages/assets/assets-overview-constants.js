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

export const WATCHLISTS_BY_FUNCTION = [
  {
    name: 'Top 50 ERC20',
    assetType: 'top 50 erc20',
    to: '/assets/list?name=top%2050%20erc20#shared',
    byFunction: '{"args":{"size":50},"name":"top_erc20_projects"}'
  }
]

export const CATEGORIES = [
  ...BASIC_CATEGORIES,
  ...WATCHLISTS_BY_FUNCTION,
  ...PUBLIC_WATCHLISTS
]
