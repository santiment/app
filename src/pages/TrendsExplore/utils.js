export function getTimePeriod (date) {
  const from = new Date(date)
  const to = new Date(date)

  from.setDate(to.getDate() - 1)

  return {
    from: from.toISOString(),
    to: to.toISOString()
  }
}
