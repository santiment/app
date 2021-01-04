export const noTrendTagsFilter = ({ name }) => !name.endsWith('-trending-words')

export const getInsightTrendTagByDate = date =>
  `${date.getUTCDate()}-${date.getUTCMonth()}-${date.getUTCFullYear()}-trending-words`

export const popularitySort = (
  { createdAt: aCreatedAt, votes: { totalVotes: aTotalVotes } },
  { createdAt: bCreatedAt, votes: { totalVotes: bTotalVotes } }
) => {
  const aDate = new Date(aCreatedAt)
  const bDate = new Date(bCreatedAt)

  return aDate.getDate() === bDate.getDate() &&
    aDate.getMonth() === bDate.getMonth() &&
    aTotalVotes > bTotalVotes
    ? -1
    : 1
}

export const creationDateSort = (
  { createdAt: aCreatedAt },
  { createdAt: bCreatedAt }
) => (new Date(aCreatedAt) < new Date(bCreatedAt) ? 1 : -1)

export const publishDateSorter = ({ publishedAt: a }, { publishedAt: b }) =>
  new Date(b) - new Date(a)

export const popularitySortReducer = insights =>
  insights.sort(creationDateSort).sort(popularitySort)

export const creationSortReducer = insights => insights.sort(creationDateSort)

export const filterInsightsNoDrafts = ({ readyState }) => readyState !== 'draft'

export const SortReducer = {
  Newest: creationSortReducer,
  Popular: popularitySortReducer
}

export const getSEOLinkFromIdAndTitle = (id, title) => {
  if (!title) {
    return id
  }

  return encodeURIComponent(
    encodeURIComponent(
      `${title
        .toLowerCase()
        .split(' ')
        .join('-')}-${id}`
    )
  )
}
