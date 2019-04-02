const Getter = {
  m: 'getMonth',
  d: 'getDate'
}

const Setter = {
  m: 'setMonth',
  d: 'setDate'
}

export const getTimeIntervalFromToday = (amount, format) => {
  const fromDate = new Date()
  const toDate = new Date()

  toDate.setHours(24, 0, 0, 0)
  fromDate.setHours(0, 0, 0, 0)

  fromDate[Setter[format]](fromDate[Getter[format]]() + amount)

  return {
    from: fromDate,
    to: toDate
  }
}
