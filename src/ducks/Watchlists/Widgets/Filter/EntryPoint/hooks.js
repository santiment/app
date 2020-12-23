import { useState, useCallback } from 'react'
import gql from 'graphql-tag'
import { client } from '../../../../../apollo'

export const useMessage = state => {
  const [message, setMessage] = useState('')

  const updateMessage = useCallback(
    () => {
      if (Array.isArray(state)) {
        const watchlistIDs = state.filter(item => item['watchlistId'])
        if (watchlistIDs.length >= 3 && !message) {
          setMessage('You can select up to 3 watchlists only')
        } else if (message) {
          setMessage('')
        }
      } else if (message) {
        setMessage('')
      }
    },
    [state]
  )

  return {
    message,
    updateMessage
  }
}

const getData = ({ data }) => data.item
const getWatchlist = query => id =>
  client
    .query({
      query,
      variables: {
        id
      }
    })
    .then(getData)
    .catch(console.warn)

const getItem = getWatchlist(gql`
  query watchlist($id: ID!) {
    item: watchlist(id: $id) {
      id
      name
    }
  }
`)

export function useStateMetadata (state) {
  const [idNameMap, setIdNameMap] = useState({})
  const watchlistIDs = Array.isArray(state)
    ? state.filter(item => !!item.watchlistId).map(item => item.watchlistId)
    : []
  const missingIDs = watchlistIDs.filter(id => !idNameMap[id])

  Promise.all(missingIDs.map(getItem)).then(items =>
    items.forEach(item => {
      if (item) {
        setIdNameMap({ ...idNameMap, [+item.id]: item.name })
      }
    })
  )

  return { idNameMap, setIdNameMap }
}
