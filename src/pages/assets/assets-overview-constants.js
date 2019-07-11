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
    byFunction:
      '{"args":{"ignored_projects":["dadi","data","enigma","fusion","holo","iostoken","iotex","kin","next-exchange","pundi-x","quarkchain","rchain","seele","waltonchain","wax","tether","usd-coin","trueusd","paxos-standard-token","dai","stasis-eurs","gemini-dollar","bitcny","steem-dollars","stableusd","digix-gold-token","bitusd","susd","1sg","x8x-token","nubits","stronghold-usd","constant","ckusd","usdcoin","sdusd","qusd","okb","verasity","gifto","pchain","mvl","dock"],"size":50},"name":"top_erc20_projects"}'
  },
  {
    name: 'Emerging trending assets',
    assetType: 'trending assets',
    to: '/assets/list?name=trending%20assets#shared',
    byFunction: '{"name":"trending_projects"}'
  }
]

export const CATEGORIES = [
  ...BASIC_CATEGORIES,
  ...WATCHLISTS_BY_FUNCTION,
  ...PUBLIC_WATCHLISTS
]
