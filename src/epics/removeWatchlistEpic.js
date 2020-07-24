import Raven from 'raven-js'
import gql from 'graphql-tag'
import { Observable } from 'rxjs'
import { showNotification } from './../actions/rootActions'
import { ALL_WATCHLISTS_QUERY } from '../queries/WatchlistGQL'
import * as actions from './../actions/types'

const removeUserListGQL = gql`
  mutation removeWatchlist($id: Int!) {
    removeUserList(id: $id) {
      id
      name
    }
  }
`

const removeWatchlistEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.USER_REMOVE_ASSET_LIST)
    .debounceTime(200)
    .mergeMap(action => {
      const id = +action.payload.id
      const name = action.payload.name

      if (!id) {
        return Observable.of({
          type: actions.USER_REMOVE_ASSET_LIST_FAILED,
          payload: { message: 'empty id' }
        })
      }
      const mutationPromise = client.mutate({
        mutation: removeUserListGQL,
        variables: {
          id
        },
        optimisticResponse: {
          __typename: 'Mutation',
          removeUserList: {
            __typename: 'UserList',
            id,
            name
          }
        },
        update: proxy => {
          let data = proxy.readQuery({ query: ALL_WATCHLISTS_QUERY })
          const _userLists = data.fetchUserLists ? [...data.fetchUserLists] : []
          data.fetchUserLists = _userLists.filter(obj => +obj.id !== id)
          proxy.writeQuery({ query: ALL_WATCHLISTS_QUERY, data })
        }
      })
      return Observable.from(mutationPromise)
        .mergeMap(() => {
          return Observable.merge(
            Observable.of({
              type: actions.USER_REMOVE_ASSET_LIST_SUCCESS
            }),
            Observable.of(
              showNotification({
                variant: 'success',
                title: `“${name}” have been successfully deleted`
              })
            )
          )
        })
        .catch(error => {
          Raven.captureException(error)
          return Observable.of({
            type: actions.USER_REMOVE_ASSET_LIST_FAILED,
            payload: error
          })
        })
    })

export default removeWatchlistEpic
