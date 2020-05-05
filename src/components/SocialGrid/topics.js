import { getIntervalByTimeRange } from '../../utils/dates'
import { getNewInterval } from '../../ducks/SANCharts/IntervalSelector'

export const TOPICS = [
  'btc OR bitcoin'
  // 'markets OR tomorrow OR going OR market',
  // 'bch OR halving OR bsv OR btc',
  // 'people',
  // 'fed OR unlimited OR infinite OR money OR printing OR dollar',
  // 'stp OR stpt OR network OR projects OR networks OR use OR many OR advantages',
  // 'sol OR solana',
  // 'going',
  // 'dow OR bitcoin',
  // 'short',
  // 'eth',
  // 'april OR fools',
  // 'short',
  // 'iris OR irisnet OR cosmos',
  // 'xrp OR ripple',
  // 'skype OR use OR using OR zoom',
  // 'markets OR stock',
  // 'pump OR fomo',
  // 'bchabc OR prediction OR april',
  // 'short',
  // 'pump',
  // 'cmc OR coinmarkecap OR binance',
  // 'fed OR rates',
  // 'dump',
  // 'bobby OR wallet OR ballet',
  // 'easter',
  // 'ripple OR xrp',
  // 'bch OR halving',
  // 'dump',
  // 'futures',
  // 'bch',
  // 'fed',
  // 'china',
  // 'economy',
  // 'hive',
  // 'bulls',
  // 'trx',
  // 'tether',
  // 'stimulus OR bill',
  // 'ledger OR hardware',
  // 'oil',
  // 'ifp OR abc OR bch',
  // 'ada',
  // 'government',
  // 'gap',
  // 'rakun',
  // 'tezos OR arthur OR kathleen OR drama',
  // 'unemployment',
  // 'oil',
  // 'wedge'
]

const DEFAULT_TIME_RANGE = '3m'
const { from: FROM, to: TO } = getIntervalByTimeRange(DEFAULT_TIME_RANGE)

export const SETTINGS = {
  interval: getNewInterval(FROM, TO),
  from: FROM.toISOString(),
  to: TO.toISOString(),
  timeRange: DEFAULT_TIME_RANGE
}
