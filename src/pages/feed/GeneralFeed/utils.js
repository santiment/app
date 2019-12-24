export const CURSOR_DAYS_COUNT = -1
export const MAX_LIMIT = 10
export const INFINITY_COUNT_LIMIT = 1000000

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

export const makeFeedVariables = (
  date,
  limit = INFINITY_COUNT_LIMIT,
  type = CURSOR_TYPES.after
) => ({
  limit,
  cursor: {
    type,
    datetime: date
  }
})

export const extractEventsFromData = data => {
  const { timelineEvents } = data
  const [first] = timelineEvents
  const { events } = first
  return events
}

export const isBottom = el => {
  return el.getBoundingClientRect().bottom <= window.innerHeight + 1
}

export const getMerged = (events, activities) => {
  let i = events.length - 1

  let j = activities.length - 1

  const result = []

  while (i > 0 && j > 0) {
    const firstDate = new Date(events[i].insertedAt)
    const secondDate = new Date(activities[j].triggeredAt)

    if (firstDate.getTime() < secondDate.getTime()) {
      result.unshift(events[i--])
    } else {
      result.unshift(activities[j--])
    }
  }
  while (i > 0) result.unshift(events[i--])

  while (j > 0) result.unshift(activities[j--])

  return result
}
