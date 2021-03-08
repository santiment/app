import { useUser } from '../../../../stores/user'

export function useIsAuthor (watchlist) {
  const { user, loading } = useUser()
  const isAuthorLoading = loading || !watchlist
  const userId = user && user.id
  const authorId = watchlist && watchlist.user && watchlist.user.id

  return { isAuthor: userId === authorId, isAuthorLoading }
}
