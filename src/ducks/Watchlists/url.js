import { getSEOLinkFromIdAndTitle } from '../../utils/url'

export const LIST_PATH = {
  PROJECT: '/watchlist/projects/',
  BLOCKCHAIN_ADDRESS: '/watchlist/addresses/',
  SCREENER: '/screener/'
}

export const getAddressesWatchlistLink = ({ id, name }) =>
  `${LIST_PATH.BLOCKCHAIN_ADDRESS}${getSEOLinkFromIdAndTitle(id, name)}`

export const getProjectsWatchlistLink = ({ id, name }) =>
  `${LIST_PATH.PROJECT}${getSEOLinkFromIdAndTitle(id, name)}`

export const getScreenerLink = ({ id, name }) =>
  `${LIST_PATH.SCREENER}${getSEOLinkFromIdAndTitle(id, name)}`
