import { DATETIME_SORT } from '../sorters/FeedSorters'

export const MAX_LIMIT = 10

export const CURSOR_TYPES = {
  before: 'BEFORE',
  after: 'AFTER'
}

export const makeVariables = (
  date,
  limit = MAX_LIMIT,
  type = CURSOR_TYPES.before
) => ({
  limit,
  cursor: {
    type,
    datetime: date
  }
})

export const makeFeedVariables = ({
  date,
  limit = MAX_LIMIT,
  type = CURSOR_TYPES.before,
  orderBy = DATETIME_SORT.type,
  filterBy
}) => ({
  limit,
  cursor: {
    type,
    datetime: date
  },
  orderBy: orderBy,
  filterBy: filterBy
})

export const extractEventsFromData = data => {
  const { timelineEvents } = data
  const [first] = timelineEvents
  const { events } = first
  return events
}

export const isBottom = el =>
  el.getBoundingClientRect().bottom <= 3 * window.innerHeight
