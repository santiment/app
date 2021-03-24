import { getIntervalByTimeRange } from '../../utils/dates'

export const TOPICS = [
  { slug: 'hold OR love OR btc OR bitcoin OR buy', title: 'Buy Bitcoin' },
  { slug: 'gox', title: 'Mt. Gox BTC dump fear' },
  { slug: 'vaccine', title: 'Vaccine' },
  { slug: 'ledger AND phishing', title: 'Ledger Phishing' },
  {
    slug: 'gme OR wsb OR gamestop OR squeeze',
    title: 'Wall Street Bets pumps'
  },
  { slug: 'lockdown', title: 'Lockdown' },
  {
    slug: '1inch',
    title: '1inch airdrop',
    query: '1inch?asset=1inch&ticker=1INCH&slug=1inch'
  },
  {
    slug: 'correction',
    title: 'BTC Correction'
  },
  {
    slug: 'eth OR gas OR fees',
    title: 'Fees ATH'
  },
  {
    slug: 'delist',
    title: 'Ripple delisting',
    query: 'delist?asset=ripple&ticker=XRP&slug=ripple'
  },
  { slug: 'silver', title: 'Silver pumping' },
  {
    slug: 'xrp OR ripple',
    title: 'Ripple pumps',
    query: 'xrp OR ripple?asset=ripple&ticker=XRP&slug=ripple'
  },
  { slug: 'xlm', title: 'Stellar Pump', query: 'xlm?asset=stellar&ticker=XLM' },
  { slug: 'alts', title: 'Alts' },
  { slug: 'elon AND musk AND doge', title: 'Musk and Dogecoin' },
  {
    slug: 'bnt',
    title: 'Bancor Coinbase Listing Pump',
    query: 'bnt?asset=bancor&ticker=BNT'
  },
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
        title: 'Wall Street Bets pumps',
        slug: 'gme OR wsb OR gamestop OR squeeze',
        createdAt: '2021-01-03T08:07:20.922Z'
      },
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
        title: 'Tesla buying BTC',
        slug: 'tesla',
        createdAt: '2021-03-16T10:07:20.922Z'
      },
      {
        title: 'BSC overtaking Ethereum',
        slug: 'bsc',
        query: 'bsc?asset=binance-coin&ticker=BNB',
        createdAt: '2021-03-16T10:07:21.922Z'
      },
      {
        title: 'SEC against Ripple',
        slug: 'ripple AND sec',
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
