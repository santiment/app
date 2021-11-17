import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const DELETE_WATCHLIST_ITEMS_QUERY = gql`
  mutation removeWatchlistItems($id: Int!, $listItems: [InputListItem]!) {
    removeWatchlistItems(id: $id, listItems: $listItems) {
      id
    }
  }
`

export const useDeleteWatchlistItems = () => {
  const [removeWatchlistItems] = useMutation(DELETE_WATCHLIST_ITEMS_QUERY)

  return {
    removeWatchlistItems
  }
}

const ADD_WATCHLIST_ITEMS_QUERY = gql`
  mutation addWatchlistItems($id: Int!, $listItems: [InputListItem]!) {
    addWatchlistItems(id: $id, listItems: $listItems) {
      id
    }
  }
`

export const useAddWatchlistItems = () => {
  const [addWatchlistItems] = useMutation(ADD_WATCHLIST_ITEMS_QUERY)

  return {
    addWatchlistItems
  }
}
