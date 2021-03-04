import {
  checkIsNotScreener,
  checkIsScreener,
  DEFAULT_SCREENER
} from '../../../Screener/utils'

const DEFAULT_SCREENERS = [DEFAULT_SCREENER]

const idOrder = {}
const IDS_ORDER = [5496, 5497, 2046, 86, 749, 127, 272]
IDS_ORDER.forEach((id, i) => (idOrder[id] = i))
const sortWatchlists = ({ id: a }, { id: b }) => idOrder[a] - idOrder[b]

export const sortFeaturedWatchlists = lists =>
  lists.slice().sort(sortWatchlists)
export const filterIfScreener = lists => lists.filter(checkIsScreener)
export const filterIfNotScreener = lists => lists.filter(checkIsNotScreener)
export const getScreenersList = lists =>
  lists.length > 0 ? lists : DEFAULT_SCREENERS
