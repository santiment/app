import gql from 'graphql-tag'
import { client } from '../../../apollo'

export const UPDATE_WATCHLIST_SHORT_MUTATION = gql`
  mutation updateWatchlist(
    $id: Int!
    $isPublic: Boolean
    $name: String
    $description: String
    $function: json
    $listItems: [InputListItem]
  ) {
    updateWatchlist(
      id: $id
      isPublic: $isPublic
      name: $name
      description: $description
      function: $function
      listItems: $listItems
    ) {
      id
    }
  }
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
    variables: normalizeListItems(variables)
  })
