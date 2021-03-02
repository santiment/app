import { checkIsScreener } from '../Screener/utils'

export const PROJECT = 'PROJECT'
export const BLOCKCHAIN_ADDRESS = 'BLOCKCHAIN_ADDRESS'
export const SCREENER = 'SCREENER'

export function detectWatchlistType (watchlist) {
  if (watchlist.type === BLOCKCHAIN_ADDRESS) {
    return { type: BLOCKCHAIN_ADDRESS, label: 'watchlist' }
  }

  if (checkIsScreener(watchlist)) {
    return { type: SCREENER, label: 'screener' }
  }

  return { type: PROJECT, label: 'watchlist' }
}
