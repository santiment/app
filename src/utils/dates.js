const DateFormat = {
  m: ['getMonth', 'setMonth'],
  d: ['getDate', 'setDate']
}

export const getTimeIntervalFromToday = (amount, dateFormat) => {
  const fromDate = new Date()
  const toDate = new Date()
  const [get, set] = DateFormat[dateFormat]

  toDate.setHours(24, 0, 0, 0)
  fromDate.setHours(0, 0, 0, 0)

  fromDate[set](fromDate[get]() + amount)

  return {
    from: fromDate,
    to: toDate
  }
}
