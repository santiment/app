import { getIntervalByTimeRange } from '../../utils/dates'

export const TOPICS = [
  'oil OR negative OR barrel OR crude OR barrels OR contract OR futures OR wti',
  'btc OR bitcoin',
  'oil OR negative OR futures OR contract OR wti',
  'oil',
  'markets OR tomorrow OR going OR market',
  'btc',
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
  'xrp',
  'easter',
  'bch OR halving',
  'dump',
  'clicking OR tip OR button',
  'voice',
  'ontology',
  'trump OR obama',
  'futures',
  'bch',
  'tether OR usdt',
  'fed',
  'china',
  'tether',
  'ctsi'
]

const DEFAULT_TIME_RANGE = '3m'
const { from: FROM, to: TO } = getIntervalByTimeRange(DEFAULT_TIME_RANGE)

export const SETTINGS = {
  interval: '1d',
  from: FROM.toISOString(),
  to: TO.toISOString(),
  timeRange: DEFAULT_TIME_RANGE
}
