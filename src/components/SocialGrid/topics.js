import { getIntervalByTimeRange } from '../../utils/dates'

export const TOPICS = [
  {
    slug: 'halving OR block OR blocks OR bitcoin OR miners OR happy OR halved'
  },
  { slug: 'hold OR love OR btc OR bitcoin OR buy' },
  { slug: 'btc OR halving' },
  {
    slug:
      'oil OR negative OR barrel OR crude OR barrels OR contract OR futures OR wti'
  },
  { slug: 'btc OR bitcoin' },
  { slug: 'markets OR tomorrow OR going OR market' },
  { slug: 'bch OR halving OR bsv OR btc' },
  { slug: 'ctsi OR cartesi' },
  { slug: 'people' },
  { slug: 'fed OR unlimited OR infinite OR money OR printing OR dollar' },
  { slug: 'bitmex OR mex' },
  {
    slug:
      'stp OR stpt OR network OR projects OR networks OR use OR many OR    advantages'
  },
  { slug: 'sol OR solana' },
  { slug: 'chromia OR chr OR project' },
  { slug: 'halving OR dump' },
  { slug: 'going' },
  { slug: 'dow OR bitcoin' },
  { slug: 'halving OR see' },
  { slug: 'short' },
  { slug: 'eth' },
  { slug: 'moons OR vault OR reddit OR moon OR bricks' },
  { slug: 'april OR fools' },
  { slug: 'eos OR eosdac OR mew OR tokens' },
  { slug: 'iris OR irisnet OR cosmos' },
  { slug: 'binance OR maintenance' },
  { slug: 'xrp OR ripple' },
  { slug: 'skype OR use OR using OR zoom' },
  { slug: 'markets OR stock' },
  { slug: 'pump OR fomo' },
  { slug: 'bchabc OR prediction OR april' },
  { slug: 'xrp' },
  { slug: 'halving' },
  { slug: 'eos' },
  { slug: 'pump' },
  { slug: 'cmc OR coinmarkecap OR binance' },
  { slug: 'fed OR rates' },
  { slug: 'dump' },
  { slug: 'eos OR voice' },
  { slug: 'alts' },
  { slug: 'chr OR swftc OR swft' },
  { slug: 'bobby OR wallet OR ballet' },
  { slug: 'adam OR satoshi' },
  { slug: 'cme OR gap' },
  { slug: 'easter' },
  { slug: 'fees' },
  { slug: 'bch OR halving' },
  { slug: 'fomo' },
  { slug: 'clicking OR tip OR button' },
  { slug: 'zrx' },
  { slug: 'bulls' }
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
        type: 'PRO',
        query:
          'ZRX?asset=0x&from=2020-04-12T22%3A00%3A00.000Z&interval=2h&isCartesianGridActive=true&isSocialDominanceActive=true&slug=ZRX&ticker=ZRX&timeRange=1m&to=2020-05-13T00%3A00%3A00.000Z'
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
