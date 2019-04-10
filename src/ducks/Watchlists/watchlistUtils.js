export const getWatchlistLink = ({ name, id }) => {
  return `/assets/list?name=${encodeURIComponent(name)}@${id}`
}
