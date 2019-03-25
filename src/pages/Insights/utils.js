export const popularitySortReducer = insights =>
  insights.sort(creationDateSort).sort(popularitySort)

export const creationSortReducer = insights => insights.sort(creationDateSort)

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

export const updateDateSort = (
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

export const getInsightContent = htmlContent => {
  let tempHTMLElement = document.createElement('div')
  tempHTMLElement.innerHTML = htmlContent
  const content = tempHTMLElement.textContent
  tempHTMLElement = null
  return content
}

export const getInsightIdFromSEOLink = link =>
  +link.slice(link.lastIndexOf('-') + 1)

export const getSEOLinkFromIdAndTitle = (id, title) =>
  encodeURIComponent(
    `${title
      .toLowerCase()
      .split(' ')
      .join('-')}-${id}`
  )
