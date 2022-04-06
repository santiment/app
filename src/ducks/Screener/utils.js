import { isStage } from '../../utils/utils'
import { ALL_PROJECTS_WATCHLIST_SLUG } from '../Watchlists/utils'

const OBJ = {}

export const DEFAULT_SCREENER_ID = isStage ? 1183 : 5496

export const DEFAULT_SCREENER = {
  name: 'My screener',
  href: '/screener/new',
  id: DEFAULT_SCREENER_ID,
}

export const DEFAULT_SCREENER_FN = {
  args: { size: 10000 },
  name: 'top_all_projects',
}

// NOTE: remove '/assets/screener' after full migration [@haritonasty 02.03.2021]
export const checkIsDefaultScreener = (path) =>
  path === DEFAULT_SCREENER.href || path === '/assets/screener'

export function checkIsScreener(watchlist) {
  const isAllProjectsList = watchlist.slug === ALL_PROJECTS_WATCHLIST_SLUG
  const { name } = watchlist.function || OBJ
  const isScreenerFunction = name && (name === 'selector' || name === 'top_all_projects')

  return !isAllProjectsList && isScreenerFunction
}

export const checkIsNotScreener = (watchlist) => !checkIsScreener(watchlist)

export const stringifyFn = (fn = DEFAULT_SCREENER_FN) => JSON.stringify(fn)
