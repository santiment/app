import { checkIsScreener } from '../Screener/utils'

export const PROJECT = 'PROJECT'
export const BLOCKCHAIN_ADDRESS = 'BLOCKCHAIN_ADDRESS'
export const SCREENER = 'SCREENER'

export function detectWatchlistType (watchlist) {
  if (watchlist.type === BLOCKCHAIN_ADDRESS) {
    return BLOCKCHAIN_ADDRESS
  }

  if (checkIsScreener(watchlist)) {
    return SCREENER
  }

  return PROJECT
}
