import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { client } from '../../../../../../apollo'

const GET_PROJECT_ID_BY_SLUG = gql`
  query allProjectsByFunction($function: json) {
    items: allProjectsByFunction(function: $function) {
      projects {
        id
      }
    }
  }
`
export const getProjectIDs = selected => {
  const func = JSON.stringify({
    args: { baseProjects: [{ slugs: selected.map(s => s.slug) }] },
    name: 'selector'
  })

  return client.query({
    query: GET_PROJECT_ID_BY_SLUG,
    variables: { function: func }
  })
}

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
