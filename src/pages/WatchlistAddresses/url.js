export const getIdFromSEOLink = link =>
  parseInt(link.slice(link.lastIndexOf('-') + 1), 10)

export const parseUrl = ({ id }) => getIdFromSEOLink(id)
