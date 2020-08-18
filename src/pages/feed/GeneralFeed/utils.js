import { DATETIME_SORT } from '../sorters/FeedSorters'
import { AUTHOR_TYPES } from '../filters/AlertsAndInsightsFilter'
import { baseLocation, pulseLocation } from './locations'

export const MAX_LIMIT = 10
export const PULSE_MAX_LIMIT = 100

export const CURSOR_TYPES = {
  before: 'BEFORE',
  after: 'AFTER'
}

export const isBaseLocation = tab =>
  tab === baseLocation || tab === pulseLocation

export const makeFeedVariables = ({
  date,
  isPulse,
  type = CURSOR_TYPES.before,
  orderBy = DATETIME_SORT.type,
  filterBy
}) => {
  return {
    limit: isPulse ? PULSE_MAX_LIMIT : MAX_LIMIT,
    cursor: {
      type,
      datetime: date
    },
    orderBy: orderBy,
    filterBy: filterBy,
    isPulse
  }
}

export const extractEventsFromData = data => {
  const { timelineEvents } = data
  const [first] = timelineEvents
  const { events } = first
  return events
}

export const isBottom = el =>
  el.getBoundingClientRect().bottom <= 3 * window.innerHeight

export const getFeedAuthorType = tab => {
  if (isBaseLocation(tab) || !tab) {
    return AUTHOR_TYPES.ALL
  } else {
    return AUTHOR_TYPES.OWN
  }
}

export const getDefaultFilters = tab => ({
  author: getFeedAuthorType(tab),
  watchlists: [],
  assets: []
})
