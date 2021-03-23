import { useEffect } from 'react'
import { useUser } from '../../../../stores/user'
import { BLOCKCHAIN_ADDRESS, PROJECT, SCREENER } from '../../detector'
import {
  addRecentScreeners,
  addRecentWatchlists
} from '../../../../utils/recent'

export function useIsAuthor (watchlist) {
  const { user, loading } = useUser()
  const isAuthorLoading = loading || !watchlist
  const userId = user && user.id
  const authorId = watchlist && watchlist.user && watchlist.user.id

  return { isAuthor: userId === authorId, isAuthorLoading }
}

export function useRecent (watchlist, type) {
  useEffect(
    () => {
      if (watchlist.id) {
        switch (type) {
          case PROJECT:
            addRecentWatchlists(watchlist.id)
            break
          case SCREENER:
            addRecentScreeners(watchlist.id)
            break
          case BLOCKCHAIN_ADDRESS:
          default:
            break
        }
      }
    },
    [watchlist.id]
  )
}
