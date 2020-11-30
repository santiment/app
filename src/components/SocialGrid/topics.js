import { getIntervalByTimeRange } from '../../utils/dates'

export const TOPICS = [
  { slug: 'hold OR love OR btc OR bitcoin OR buy', title: 'Buy Bitcoin' },
  { slug: 'debate', title: 'U.S. Debates' },
  { slug: 'vaccine', title: 'Vaccine' },
  { slug: 'neo', title: 'NEO 3.0 coming up' },
  {
    slug: 'infura',
    title: 'Infura outage',
    query: 'infura?asset=yearn-finance&ticker=YFI'
  },
  { slug: 'lockdown', title: 'Lockdown' },
  { slug: 'bel OR bella OR protocol', title: 'Bella Protocol AMA' },
  {
    slug: 'uni OR uniswap OR airdrop OR free OR tokens OR claim',
    title: 'UNI tokens airdrop'
  },
  {
    slug: 'eth OR gas OR fees',
    title: 'Fees ATH'
  },
  {
    slug: 'fil OR filecoin',
    title: 'Filecoin mainnet launch',
    query: 'fil OR filecoin?asset=filecoin&ticker=FIL'
  },
  { slug: 'bitmex OR mex', title: 'Bitmex faces a lawsuit' },
  { slug: 'iotex', title: 'IOTEX AMA' },
  { slug: 'sushi', title: 'SUSHI is served' },
  { slug: 'alts', title: 'Alts' },
  { slug: 'oxt', title: 'OXT listing on Binance' },
  {
    slug: 'xrp OR ripple',
    title: 'Ripple pumps',
    query: 'xrp OR ripple?asset=ripple&ticker=XRP&slug=ripple'
  },
  {
    slug: 'bank OR kraken OR banks OR fractional OR wyoming',
    title: 'Kraken becomes a bank'
  },
  { slug: 'stimulus', title: 'Stimulus' }
]

export const INDEX_PAGE_GROUPS = [
  {
    title: 'Recent Highlights',
    description:
      'The most popular topics in crypto social media. Ranges from worldwide economic and health topics to the prices discussions',
    topics: [
      {
        title: 'Ethereum fees ATH',
        slug: 'gas OR fees',
        createdAt: '2020-08-19T07:18:20.922Z'
      },
      {
        title: 'Yield farming',
        slug: 'yield OR farming',
        query: 'yield%20OR%20farming?asset=ethereum&ticker=ETH',
        createdAt: '2020-07-01T15:18:20.922Z'
      },
      {
        title: 'UNI tokens airdrop',
        slug: 'uni OR uniswap',
        createdAt: '2020-09-25T10:07:20.922Z'
      },
      {
        title: 'U.S. Election',
        slug:
          'trump OR biden OR election OR winning OR votes OR wins OR florida OR vote OR voting',
        createdAt: '2020-11-30T08:18:20.922Z'
      },
      {
        title: 'DeFi craze',
        slug: 'defi',
        query: 'defi?asset=ethereum&ticker=ETH',
        createdAt: '2020-09-01T07:19:20.922Z'
      },
      {
        title: 'Paypal adoption',
        slug: 'paypal OR adoption',
        createdAt: '2020-11-30T08:07:20.922Z'
      }
    ]
  }
]

const DEFAULT_TIME_RANGE = '3m'
const { from: FROM, to: TO } = getIntervalByTimeRange(DEFAULT_TIME_RANGE)

TO.setUTCHours(0, 0, 0, 0)

export const SETTINGS = {
  interval: '1d',
  from: FROM.toISOString(),
  to: TO.toISOString(),
  timeRange: DEFAULT_TIME_RANGE
}

const EXCLUDED_WORDS = ['OR', 'AND']
const ALLOWED_SYMBOLS = /[^a-zA-Z]+/g

export function dividePhraseInWords (phrase) {
  const words = new Set(
    phrase
      .split(' ')
      .filter(word => !EXCLUDED_WORDS.includes(word))
      .map(word => word.replace(ALLOWED_SYMBOLS, ''))
  )
  return [...words]
}
