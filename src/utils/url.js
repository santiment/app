export const getIdFromSEOLink = link =>
  parseInt(link.slice(link.lastIndexOf('-') + 1), 10)

export const getSEOLinkFromIdAndTitle = (id, title) =>
  encodeURIComponent(
    `${title
      .toLowerCase()
      .split(' ')
      .join('-')}-${id}`
  )
