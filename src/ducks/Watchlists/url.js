import { getSEOLinkFromIdAndTitle } from '../../utils/url'

const WATCHLIST = '/watchlist'

export const getAddressesWatchlistLink = ({ id, name }) =>
  `${WATCHLIST}/addresses/${getSEOLinkFromIdAndTitle(id, name)}`
