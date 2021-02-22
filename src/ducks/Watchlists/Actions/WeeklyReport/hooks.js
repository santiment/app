import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { updateWatchlistOnEdit } from '../../gql/hooks'
import { notifyErrorUpdate } from '../../Widgets/TopPanel/notifications'

const WATCHLIST_MONITORED_MUTATION = gql`
  mutation updateWatchlist($id: Int!, $isMonitored: Boolean) {
    updateWatchlist(id: $id, isMonitored: $isMonitored) {
      isMonitored
    }
  }
`

export const useMonitoringWatchlist = () => {
  const [mutate] = useMutation(WATCHLIST_MONITORED_MUTATION, {
    update: updateWatchlistOnEdit
  })

  const updateWatchlist = (id, isMonitored) =>
    mutate({
      variables: { isMonitored, id: +id }
    })
      .then(
        ({
          data: {
            updateWatchlist: { isMonitored }
          }
        }) => isMonitored
      )
      .catch(notifyErrorUpdate)

  return [updateWatchlist]
}
