const matchWords = (str1, str2) => str1.toLowerCase() === str2.toLowerCase()

export const detectWordWithAllTickersSlugs = ({ word, allAssets }) => {
  return allAssets.find(
    ({ slug, ticker }) => matchWords(word, slug) || matchWords(word, ticker)
  )
}
