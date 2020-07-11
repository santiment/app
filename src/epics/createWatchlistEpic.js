import React from 'react'
import Raven from 'raven-js'
import { Observable } from 'rxjs'
import { showNotification } from './../actions/rootActions'
import { ALL_WATCHLISTS_QUERY } from '../queries/WatchlistGQL'
import { CREATE_WATCHLIST_MUTATION } from '../ducks/Watchlists/gql'
import * as actions from './../actions/types'
import WatchlistNotificationActions from '../ducks/Watchlists/Actions/notifications/WatchlistNotificationActions'
import {
  getWatchlistLink,
  DEFAULT_SCREENER_FUNCTION
} from '../ducks/Watchlists/utils'

const createWatchlistEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.USER_ADD_NEW_ASSET_LIST)
    .debounceTime(200)
    .mergeMap(action => {
      const { name, isPublic = false, type, listItems = [] } = action.payload
      const watchlistFunction = JSON.stringify(DEFAULT_SCREENER_FUNCTION)
      const mutationPromise = client.mutate({
        mutation: CREATE_WATCHLIST_MUTATION,
        variables: {
          name,
          isPublic,
          function: type === 'screener' ? watchlistFunction : undefined
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createUserList: {
            __typename: 'UserList',
            id: +new Date(),
            isPublic,
            name,
            listItems,
            function:
              type === 'screener' ? watchlistFunction : { name: 'empty' },
            isMonitored: false,
            insertedAt: new Date(),
            updatedAt: new Date(),
            user: {
              __typename: 'PostAuthor',
              id: +new Date()
            }
          }
        },
        update: (store, { data: { createUserList } }) => {
          const data = store.readQuery({ query: ALL_WATCHLISTS_QUERY })
          data.fetchUserLists.push(createUserList)
          store.writeQuery({ query: ALL_WATCHLISTS_QUERY, data })
        }
      })
      return Observable.from(mutationPromise)
        .mergeMap(props => {
          const {
            data: {
              createUserList: { id, name }
            }
          } = props
          return Observable.merge(
            Observable.of({
              type: actions.USER_ADD_NEW_ASSET_LIST_SUCCESS
            }),
            Observable.of(
              showNotification({
                title: `Created the new ${type}`,
                description: (
                  <WatchlistNotificationActions
                    id={id}
                    toLink={getWatchlistLink({ id, name })}
                  />
                )
              })
            )
          )
        })
        .catch(error => {
          Raven.captureException(error)
          return Observable.merge(
            Observable.of({
              type: actions.USER_ADD_NEW_ASSET_LIST_FAILED,
              payload: error
            }),

            Observable.of(
              showNotification({
                variant: 'error',
                title: 'Error',
                description: `Can't create the ${type}. Please, try again later.`
              })
            )
          )
        })
    })

export const createWatchlistSuccessEpic = action$ =>
  action$
    .ofType(actions.USER_ADD_NEW_ASSET_LIST_SUCCESS)
    .delay(2000)
    .mapTo({ type: actions.USER_ADD_NEW_ASSET_LIST_CANCEL })

export default createWatchlistEpic
