// NOTE (haritonasty): remove it after migration on dynamic watchlists
// (need to integrate server-side pagination for tables before)
// July 5, 2020

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
