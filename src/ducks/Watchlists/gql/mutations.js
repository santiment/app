import gql from 'graphql-tag'
import { client } from '../../../apollo'
import { updateWatchlistOnEdit } from './cache'
import { LIST_ITEMS_FRAGMENT } from '../../WatchlistAddressesTable/gql/queries'

export const UPDATE_WATCHLIST_SHORT_MUTATION = gql`
  mutation updateWatchlist($id: Int!, $listItems: [InputListItem]) {
    updateWatchlist(id: $id, listItems: $listItems) {
      id
      type
      ...listItemsFragment
    }
  }
  ${LIST_ITEMS_FRAGMENT}
`

const removeTypename = ({ __typename, ...rest }) => rest
function normalizeListItems ({ listItems, ...rest }) {
  const newListItems =
    listItems &&
    listItems.map(item => {
      const newItem = removeTypename(item)
      Object.keys(newItem).forEach(key => {
        newItem[key] = removeTypename(newItem[key])
      })
      return newItem
    })

  return { ...rest, listItems: newListItems }
}

export const updateWatchlistShort = variables =>
  client.mutate({
    mutation: UPDATE_WATCHLIST_SHORT_MUTATION,
    update: updateWatchlistOnEdit,
    variables: normalizeListItems(variables)
  })
