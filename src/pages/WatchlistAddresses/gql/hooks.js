import { useMutation } from '@apollo/react-hooks'
import { CREATE_WATCHLIST_MUTATION } from './index'

export function useCreateAddressWatchlist () {
  const [mutate] = useMutation(CREATE_WATCHLIST_MUTATION, {
    /* update: updateWatchlistsOnCreation, */
  })

  return ({ name, description, isPublic, listItems }) =>
    mutate({
      variables: {
        name,
        description,
        isPublic,
        listItems: normalizeItems(listItems)
      }
    })
}
