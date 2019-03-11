export const popularitySortReducer = insights =>
  insights.sort(sortInsightsByDateDescending).sort(popularitySort)

export const creationSortReducer = insights =>
  insights.sort(sortInsightsByDateDescending)

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

export const sortInsightsByDateDescending = (
  { createdAt: aCreatedAt },
  { createdAt: bCreatedAt }
) => (new Date(aCreatedAt) < new Date(bCreatedAt) ? 1 : -1)

export const sortInsightsByUpdateDateDescending = (
  { updatedAt: aUpdatedAt },
  { updatedAt: bUpdatedAt }
) => (new Date(aUpdatedAt) < new Date(bUpdatedAt) ? 1 : -1)

export const filterInsightsNoDrafts = ({ readyState }) => readyState !== 'draft'
export const filterInsightsOnlyDrafts = ({ readyState }) =>
  readyState === 'draft'

export const SortReducer = {
  Newest: creationSortReducer,
  Popular: popularitySortReducer
}
