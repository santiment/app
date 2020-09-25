import { getIntervalByTimeRange } from '../../utils/dates'

export const TOPICS = [
  { slug: 'hold OR love OR btc OR bitcoin OR buy', title: 'Buy Bitcoin' },
  { slug: 'btc OR halving', title: 'Bitcoin halving' },
  {
    slug:
      'oil OR negative OR barrel OR crude OR barrels OR contract OR futures OR wti',
    title: 'Negative rates on oil'
  },
  { slug: 'neo', title: 'NEO 3.0 coming up' },
  { slug: 'bch OR halving OR bsv OR btc', title: 'Bitcoin Cash halving' },
  {
    slug: 'whales OR price OR market OR yesterday',
    title: 'Blaming whales in dumps'
  },
  { slug: 'bel OR bella OR protocol', title: 'Bella Protocol AMA' },
  {
    slug: 'uni OR uniswap OR airdrop OR free OR tokens OR claim',
    title: 'UNI tokens airdrop'
  },
  {
    slug: 'eth OR gas OR fees',
    title: 'Fees ATH'
  },
  { slug: 'twitter OR hack', title: 'Twitter hack' },
  { slug: 'bitmex OR mex', title: 'Bitmex faces a lawsuit' },
  { slug: 'iotex', title: 'IOTEX AMA' },
  { slug: 'sushi', title: 'SUSHI is served' },
  { slug: 'yfi', title: 'YFI tops' },
  { slug: 'oxt', title: 'OXT listing on Binance' },
  { slug: 'dot', title: 'Polkadot tops' },
  {
    slug: 'bank OR kraken OR banks OR fractional OR wyoming',
    title: 'Kraken becomes a bank'
  },
  {
    slug: 'powell OR fed OR inflation',
    title: 'Fed targeting inflation'
  }
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
        title: 'YAM rise and fall',
        slug: 'yam OR yams',
        createdAt: '2020-09-01T07:18:20.922Z'
      },
      {
        title: 'DeFi craze',
        slug: 'defi',
        query: 'defi?asset=ethereum&ticker=ETH',
        createdAt: '2020-09-01T07:19:20.922Z'
      },
      {
        title: 'SUSHI is served',
        createdAt: '2020-09-25T10:07:20.922Z',
        slug: 'sushi'
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
