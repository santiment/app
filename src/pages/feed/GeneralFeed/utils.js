export const MAX_LIMIT = 8

export const makeVariables = (date, limit = MAX_LIMIT) => ({
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

export const getMerged = (events, activities) => {
  let i = 0

  let j = 0

  const { length: lengthA } = events
  const { length: lengthB } = activities

  const result = []

  while (i < lengthA && j < lengthB) {
    const firstDate = events[i].insertedAt
    const secondDate = activities[i].triggeredAt

    if (firstDate < secondDate) result.push(events[i++])
    else result.push(activities[j++])
  }

  while (i < lengthA) result.push(events[i++])

  while (j < lengthB) result.push(activities[j++])

  return result
}
