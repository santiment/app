const matchWords = (str1, str2) => str1.toLowerCase() === str2.toLowerCase()

export const detectWordWithAllTickersSlugs = ({ word, allAssets }) => {
  return allAssets.find(
    ({ slug, ticker }) => matchWords(word, slug) || matchWords(word, ticker)
  )
}

export function getTimePeriod (date) {
  const from = new Date(date)
  const to = new Date(date)

  from.setDate(to.getDate() - 1)

  return {
    from: from.toISOString(),
    to: to.toISOString()
  }
}
