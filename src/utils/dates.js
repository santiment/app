const DateFormat = {
  m: ['getMonth', 'setMonth'],
  d: ['getDate', 'setDate']
}

export const getTimeIntervalFromToday = (amount, dateFormat) => {
  const from = new Date()
  const to = new Date()
  const [get, set] = DateFormat[dateFormat]

  to.setHours(24, 0, 0, 0)
  from.setHours(0, 0, 0, 0)

  from[set](from[get]() + amount)

  return {
    from,
    to
  }
}
