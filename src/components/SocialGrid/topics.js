import { getIntervalByTimeRange } from '../../utils/dates'

export const TOPICS = [
  'oil OR negative OR barrel OR crude OR barrels OR contract OR futures OR wti',
  'btc OR bitcoin',
  'markets OR tomorrow OR going OR market',
  'bch OR halving OR bsv OR btc',
  'ctsi OR cartesi',
  'people',
  'fed OR unlimited OR infinite OR money OR printing OR dollar',
  'stp OR stpt OR network OR projects OR networks OR use OR many OR advantages',
  'sol OR solana',
  'chromia OR chr OR project',
  'going',
  'dow OR bitcoin',
  'halving OR see',
  'short',
  'eth',
  'april OR fools',
  'eos OR eosdac OR mew OR tokens',
  'iris OR irisnet OR cosmos',
  'binance OR maintenance',
  'xrp OR ripple',
  'skype OR use OR using OR zoom',
  'markets OR stock',
  'pump OR fomo',
  'bchabc OR prediction OR april',
  'xrp',
  'eos',
  'pump',
  'cmc OR coinmarkecap OR binance',
  'fed OR rates',
  'dump',
  'eos OR voice',
  'bobby OR wallet OR ballet',
  'easter',
  'bch OR halving',
  'clicking OR tip OR button',
  'voice',
  'ontology',
  'trump OR obama',
  'futures',
  'bch',
  'tether OR usdt',
  'china'
]

export const INDEX_PAGE_GROUPS = [
  {
    title: 'General topics',
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
        title: 'Oil negative rates',
        slug:
          'oil OR negative OR barrel OR crude OR barrels OR contract OR futures OR wti'
      },
      {
        title: 'Unlimited dollar printing',
        slug:
          'fed OR (unlimited AND money) OR (infinite AND money) OR printing OR stimulus OR bill'
      },
      {
        title: 'Bought the bottom?',
        slug: 'buy OR bought OR buying OR bottom'
      },
      {
        title: 'The rise and fall of ZRX',
        slug: 'zrx',
        query:
          'ZRX?asset=0x&from=2020-04-12T22%3A00%3A00.000Z&interval=2h&isCartesianGridActive=true&isSocialDominanceActive=true&slug=ZRX&ticker=ZRX&timeRange=1m&to=2020-05-13T00%3A00%3A00.000Z'
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
