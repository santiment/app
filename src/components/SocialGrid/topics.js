import { getIntervalByTimeRange } from '../../utils/dates'

export const TOPICS = [
  { slug: 'hold OR love OR btc OR bitcoin OR buy', title: 'Buy Bitcoin' },
  {
    slug: 'doge',
    title: 'Dogecoin Pumps',
    query: 'doge?asset=dogecoin&ticker=DOGE'
  },
  {
    slug: 'shib',
    title: 'Shiba Inu All Time High',
    query: 'shib?asset=shiba-inu&ticker=SHIB'
  },
  {
    slug: 'nft',
    title: 'NFT madness',
    query: 'nft?asset=nft&ticker=NFT&slug=nft'
  },
  { slug: 'correction', title: 'BTC Correction' },
  { slug: 'options', title: 'Options expiration' },
  { slug: 'visa', title: 'Visa crypto adoption' },
  {
    slug: 'icp',
    title: 'Internet Computer Launch',
    query: 'icp?asset=internet-computer&ticker=ICP'
  },
  {
    slug: 'xrp OR ripple',
    title: 'Ripple pumps',
    query: 'xrp OR ripple?asset=ripple&ticker=XRP&slug=ripple'
  },
  { slug: 'elon AND musk AND doge', title: 'Musk and Dogecoin' },
  { slug: 'stimulus', title: 'Stimulus' },
  {
    slug: 'eth AND ath',
    title: 'Ethereum ATH',
    query: 'eth%20AND%20ath?asset=ethereum&ticker=ETH'
  }
]

export const INDEX_PAGE_GROUPS = [
  {
    title: 'Recent Highlights',
    description:
      'The most popular topics in crypto social media. Ranges from worldwide economic and health topics to the prices discussions',
    topics: [
      {
        title: 'Coinbase Stocks Listing',
        slug: 'coinbase',
        createdAt: '2021-05-20T08:07:20.922Z'
      },
      {
        title: 'Biden and Taxes',
        slug: 'biden AND tax',
        createdAt: '2021-05-20T07:18:20.922Z'
      },
      {
        title: 'BTC All Time High',
        slug: 'btc AND ath',
        createdAt: '2020-12-17T15:18:20.922Z'
      },
      {
        title: 'Tesla and BTC',
        slug: 'tesla',
        createdAt: '2021-03-16T10:07:20.922Z'
      },
      {
        title: 'Inflation',
        slug: 'inflation',
        createdAt: '2021-05-20T10:07:21.922Z'
      },
      {
        title: 'Shitcoins',
        slug: 'shitcoin',
        query: 'ripple%20AND%20sec?asset=ripple&ticker=XRP',
        createdAt: '2021-03-16T10:07:22.922Z'
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
