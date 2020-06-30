import { getIntervalByTimeRange } from '../../utils/dates'

export const TOPICS = [
  {
    slug: 'halving OR block OR blocks OR bitcoin OR miners OR happy OR halved',
    title: 'Bitcoin halving happened'
  },
  { slug: 'hold OR love OR btc OR bitcoin OR buy', title: 'Buy Bitcoin' },
  { slug: 'satoshi OR coins OR moved OR btc', title: 'Satoshi coins moved' },
  { slug: 'btc OR halving', title: 'Bitcoin halving' },
  {
    slug:
      'oil OR negative OR barrel OR crude OR barrels OR contract OR futures OR wti',
    title: 'Negative rates on oil'
  },
  {
    slug: 'markets OR tomorrow OR going OR market',
    title: 'Markets predictions'
  },
  { slug: 'kava OR usdx OR defi OR blockchain OR winners', title: 'KAVA AMA' },
  { slug: 'bch OR halving OR bsv OR btc', title: 'Bitcoin Cash halving' },
  { slug: 'ctsi OR cartesi', title: 'Cartesi IEO in Binance' },
  {
    slug: 'fed OR unlimited OR infinite OR money OR printing OR dollar',
    title: 'Unlimited dollar printing'
  },
  { slug: 'bitmex OR mex', title: 'Bitmex faces a lawsuit' },
  {
    slug:
      'stp OR stpt OR network OR projects OR networks OR use OR many OR advantages',
    title: 'Standard Tokenization Protocol AMA'
  },
  { slug: 'sol OR solana', title: 'Solana listing on Binance' },
  { slug: 'chromia OR chr OR project', title: 'Chromia AMA' },
  { slug: 'halving OR dump', title: 'Bearish before halving' },
  { slug: 'omg OR coinbase', title: 'OMG listed on Coinbase' },
  { slug: 'dow OR bitcoin', title: 'DOW and BTC are connected' },
  { slug: 'halving OR see', title: '7 days prior to halving' }
]

export const INDEX_PAGE_GROUPS = [
  {
    title: 'Recent Highlights',
    description:
      'The most popular topics in crypto social media. Ranges from worldwide economic and health topics to the prices discussions',
    topics: [
      {
        title: 'Bitcoin halving',
        slug: 'halving OR halvening'
      },
      {
        title: 'Coronavirus',
        slug: 'virus OR corona OR coronavirus OR covid OR covid19 OR "covid-19"'
      },
      {
        title: 'Satoshi coins moved',
        slug: 'satoshi AND coins'
      },
      {
        title: 'Riots in United States',
        slug: 'riot OR riots'
      },
      {
        title: 'Bought the bottom?',
        slug: 'buy OR bought OR buying OR bottom'
      },
      {
        title: '"Bart" Pattern',
        slug: 'bart',
        type: 'PRO',
        query: 'bart',
        createdAt: '2020-06-10T07:18:20.922Z'
      },
      {
        title: 'The rise and fall of MTL',
        slug: 'mtl or metal',
        type: 'FREE',
        query: 'mtl%20OR%20metal?asset=metal&slug=mtl%20OR%20metal&ticker=MTL'
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
