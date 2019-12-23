export const MAX_LIMIT = 8

export const makeVariables = date => ({
  limit: MAX_LIMIT,
  cursor: {
    type: 'BEFORE',
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
  return el.getBoundingClientRect().bottom <= window.innerHeight
}
