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
    title: 'Recognized Economic Milestones',
    description:
      'The most popular global economy topics in crypto social media. Those reflecting worldwide economic and health topics',
    topics: [
      {
        title: 'Oil negative rates',
        slug:
          'oil OR negative OR barrel OR crude OR barrels OR contract OR futures OR wti'
      },
      {
        title: 'Bitcoin halving',
        slug: 'halving OR halvening'
      },
      {
        title: 'Coronavirus',
        slug: 'virus OR corona OR coronavirus OR covid OR covid19 OR "covid-19"'
      },
      {
        title: 'Unlimited dollar printing',
        slug: 'fed OR unlimited OR infinite OR money OR printing OR dollar'
      },
      {
        title: 'Zero Fed rates',
        slug: 'fed OR rates'
      },
      {
        title: 'Stimulus bill',
        slug: 'stimulus OR bill'
      }
    ]
  },
  {
    title: 'Biggest noticed pumps',
    description: 'Biggest noticeable pumps. With or without related news',
    topics: [
      {
        title: 'WRX',
        slug: 'wrx'
      },
      {
        title: 'DATA',
        slug: 'data'
      },
      {
        title: 'DASH',
        slug: 'dash'
      },
      {
        title: 'ZRX',
        slug: 'zrx'
      },
      {
        title: 'STEEM',
        slug: 'steem'
      },
      {
        title: 'MTL',
        slug: 'mtl'
      }
    ]
  },
  {
    title: 'Initial Exchange Offerings',
    description: 'Humble ICO descendants starting to bloom slowly again',
    topics: [
      {
        title: 'Cartesi',
        slug: 'ctsi OR cartesi'
      },
      {
        title: 'Sheng',
        slug: 'sheng'
      },
      {
        title: 'Frenzy',
        slug: 'fzy OR frenzy'
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
