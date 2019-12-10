export const noTrendTagsFilter = ({ name }) => !name.endsWith('-trending-words')

export const getInsightTrendTagByDate = date =>
  `${date.getUTCDate()}-${date.getUTCMonth()}-${date.getUTCFullYear()}-trending-words`
