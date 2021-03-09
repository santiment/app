import gql from 'graphql-tag'
import * as Sentry from '@sentry/react'
import { useMutation } from '@apollo/react-hooks'
import { updateWatchlistOnEdit } from '../../gql/cache'
import { notifyError } from '../../Widgets/TopPanel/notifications'

const WATCHLIST_MONITORED_MUTATION = gql`
  mutation updateWatchlist($id: Int!, $isMonitored: Boolean) {
    updateWatchlist(id: $id, isMonitored: $isMonitored) {
      id
      isMonitored
    }
  }
`

export const useMonitoringWatchlist = () => {
  const [mutate] = useMutation(WATCHLIST_MONITORED_MUTATION, {
    update: updateWatchlistOnEdit
  })

  const updateWatchlist = (id, isMonitored) =>
    mutate({ variables: { isMonitored, id: +id } })
      .then(({ data: { updateWatchlist } }) => updateWatchlist.isMonitored)
      .catch(err => {
        Sentry.captureException(err)
        notifyError('watchlist', 'update')
      })

  return [updateWatchlist]
}
