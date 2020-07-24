import { getIntervalByTimeRange } from '../../utils/dates'

export const TOPICS = [
  { slug: 'hold OR love OR btc OR bitcoin OR buy', title: 'Buy Bitcoin' },
  { slug: 'btc OR halving', title: 'Bitcoin halving' },
  {
    slug:
      'oil OR negative OR barrel OR crude OR barrels OR contract OR futures OR wti',
    title: 'Negative rates on oil'
  },
  { slug: 'kava OR usdx OR defi OR blockchain OR winners', title: 'KAVA AMA' },
  { slug: 'bch OR halving OR bsv OR btc', title: 'Bitcoin Cash halving' },
  {
    slug: 'whales OR price OR market OR yesterday',
    title: 'Blaming whales in dumps'
  },
  { slug: 'ctsi OR cartesi', title: 'Cartesi IEO in Binance' },
  { slug: 'satoshi OR coins OR moved', title: 'Satoshi coins moved' },
  {
    slug: 'fed OR unlimited OR infinite OR money OR printing OR dollar',
    title: 'Unlimited dollar printing'
  },
  { slug: 'twitter OR hack', title: 'Twitter hack' },
  { slug: 'bitmex OR mex', title: 'Bitmex faces a lawsuit' },
  { slug: 'sngls OR singulardtv OR snglsdao OR content', title: 'Solana AMA' },
  { slug: 'chromia OR chr OR project', title: 'Chromia AMA' },
  { slug: 'halving OR dump', title: 'Bearish before halving' },
  { slug: 'dow OR bitcoin', title: 'DOW and BTC are connected' },
  { slug: 'halving OR see', title: '7 days prior to halving' },
  {
    slug: 'vet OR coinbase OR vechain OR listing',
    title: 'Vechain in Coinbase list'
  },
  {
    slug: 'moons OR vault OR reddit OR moon OR bricks',
    title: 'Reddit launching ERC20 tokens'
  }
]

export const INDEX_PAGE_GROUPS = [
  {
    title: 'Recent Highlights',
    description:
      'The most popular topics in crypto social media. Ranges from worldwide economic and health topics to the prices discussions',
    topics: [
      {
        title: 'Yield farming',
        slug: 'yield OR farming',
        query: 'yield%20OR%20farming?asset=ethereum&ticker=ETH',
        createdAt: '2020-07-01T15:18:20.922Z'
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
        title: 'Twitter "Send me your crypto to double" hack',
        slug: 'twitter OR hack'
      },
      {
        title: '"Bart" Pattern',
        slug: 'bart',
        createdAt: '2020-06-10T07:18:20.922Z'
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
