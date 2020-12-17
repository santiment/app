import { getIntervalByTimeRange } from '../../utils/dates'

export const TOPICS = [
  { slug: 'hold OR love OR btc OR bitcoin OR buy', title: 'Buy Bitcoin' },
  { slug: 'debate', title: 'Mt. Gox BTC dump fear' },
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
        title: 'Pornhub Accepts Only Crypto',
        slug: 'porn OR pornhub',
        createdAt: '2020-12-17T07:18:20.922Z'
      },
      {
        title: 'BTC All Time High',
        slug: 'btc AND ath',
        createdAt: '2020-12-17T15:18:20.922Z'
      },
      {
        title: 'ETH Beacon Chain Launch',
        slug: 'eth AND launched',
        query: 'eth%20AND%20launched?asset=ethereum&ticker=ETH',
        createdAt: '2020-12-17T10:07:20.922Z'
      },
      {
        title: 'Black Friday Sale',
        slug: 'black AND friday',
        createdAt: '2020-12-17T08:18:20.922Z'
      },
      {
        title: 'Ripple Snapshot for Spark Airdrop',
        slug: '(ripple OR xrp) AND (airdrop OR snapshot)',
        query:
          '(ripple%20OR%20xrp)%20AND%20(airdrop%20OR%20snapshot)?asset=ripple&ticker=XRP',
        createdAt: '2020-12-17T07:19:20.922Z'
      },
      {
        title: 'Vaccine News',
        slug: 'vaccine',
        createdAt: '2020-12-17T08:07:20.922Z'
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
