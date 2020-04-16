import { DATETIME_SORT } from '../sorters/FeedSorters'

export const MAX_LIMIT = 10
export const PULSE_MAX_LIMIT = 100

export const CURSOR_TYPES = {
  before: 'BEFORE',
  after: 'AFTER'
}

export const makeFeedVariables = ({
  date,
  isPulse,
  type = CURSOR_TYPES.before,
  orderBy = DATETIME_SORT.type,
  filterBy
}) => ({
  limit: isPulse ? PULSE_MAX_LIMIT : MAX_LIMIT,
  cursor: {
    type,
    datetime: date
  },
  orderBy: orderBy,
  filterBy: filterBy,
  isPulse
})

export const extractEventsFromData = data => {
  const { timelineEvents } = data
  const [first] = timelineEvents
  const { events } = first
  return events
}

export const isBottom = el =>
  el.getBoundingClientRect().bottom <= 3 * window.innerHeight
