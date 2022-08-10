import { getIntervalByTimeRange } from '../../utils/dates'

export const TOPICS = [
  { slug: 'bottom', title: 'Bottom', price: 'bitcoin', ticker: 'BTC' },
  { slug: 'sell', title: 'Sell', price: 'bitcoin', ticker: 'BTC' },
  { slug: 'bear AND market', title: 'Bear Market', price: 'bitcoin', ticker: 'BTC' },
  { slug: 'luna', title: 'Luna Crash', price: 'luna', ticker: 'LUNC' },
  { slug: 'rekt', title: 'Rekt', price: 'bitcoin', ticker: 'BTC' },
  { slug: 'inflation', title: 'Inflation', price: 'bitcoin', ticker: 'BTC' },
  { slug: 'usd', title: 'USD', price: 'bitcoin', ticker: 'BTC' },
  { slug: 'merge', title: 'Merge', price: 'ethereum', ticker: 'ETH' },
  { slug: 'elon', title: 'Elon', price: 'shiba-inu', ticker: 'SHIB' },
]

export const INDEX_PAGE_GROUPS = [
  {
    title: 'Recent Highlights',
    description:
      'The most popular topics in crypto social media. Ranges from worldwide economic and health topics to the prices discussions',
    topics: [
      {
        title: 'El Salvador & El Bitcoin',
        slug: 'salvador',
        createdAt: '2021-07-28T08:07:20.922Z',
      },
      {
        title: 'Biden and Taxes',
        slug: 'biden AND tax',
        createdAt: '2021-05-20T07:18:20.922Z',
      },
      {
        title: 'London Ethereum Hard Fork',
        slug: 'london OR 1559',
        createdAt: '2021-09-01T15:18:20.922Z',
      },
      {
        title: 'Infrastructure Amendment',
        slug: 'infrastructure AND amendment',
        createdAt: '2021-09-01T10:07:20.922Z',
      },
      {
        title: 'Inflation',
        slug: 'inflation',
        createdAt: '2021-05-20T10:07:21.922Z',
      },
      {
        title: 'Gaming and NFT',
        slug: 'nft OR gaming',
        createdAt: '2021-09-01T10:07:22.922Z',
      },
    ],
  },
]

const DEFAULT_TIME_RANGE = '3m'
const { from: FROM, to: TO } = getIntervalByTimeRange(DEFAULT_TIME_RANGE)

TO.setUTCHours(0, 0, 0, 0)

export const SETTINGS = {
  interval: '1d',
  from: FROM.toISOString(),
  to: TO.toISOString(),
  timeRange: DEFAULT_TIME_RANGE,
}

const EXCLUDED_WORDS = ['OR', 'AND']
const ALLOWED_SYMBOLS = /[^a-zA-Z]+/g

export function dividePhraseInWords(phrase) {
  const words = new Set(
    phrase
      .split(' ')
      .filter((word) => !EXCLUDED_WORDS.includes(word))
      .map((word) => word.replace(ALLOWED_SYMBOLS, '')),
  )
  return [...words]
}
