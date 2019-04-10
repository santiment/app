const WHITESPACE = '%20'

export const getWatchlistLink = ({ name, id }) => {
  return `/assets/list?name=${name.replace(' ', WHITESPACE)}@${id}`
}
