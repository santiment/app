import { getSEOLinkFromIdAndTitle } from '../../utils/url'

export const getAddressesWatchlistLink = ({ id, name }) =>
  `/watchlist/addresses/${getSEOLinkFromIdAndTitle(id, name)}`
