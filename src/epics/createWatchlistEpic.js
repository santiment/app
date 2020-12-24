import React from 'react'
import * as Sentry from '@sentry/react'
import { Observable } from 'rxjs'
import { showNotification } from './../actions/rootActions'
import { ALL_WATCHLISTS_QUERY } from '../queries/WatchlistGQL'
import { CREATE_WATCHLIST_MUTATION } from '../ducks/Watchlists/gql'
import * as actions from './../actions/types'
import WatchlistNotificationActions from '../ducks/Watchlists/Actions/notifications/WatchlistNotificationActions'
import {
  getWatchlistLink,
  getNormalizedListItems,
  DEFAULT_SCREENER_FUNCTION
} from '../ducks/Watchlists/utils'

const createWatchlistEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.USER_ADD_NEW_ASSET_LIST)
    .debounceTime(200)
    .mergeMap(action => {
      const {
        name,
        isPublic = false,
        type,
        listItems = [],
        function: payloadFunction,
        description = ''
      } = action.payload
      const watchlistFunction = JSON.stringify(
        payloadFunction || DEFAULT_SCREENER_FUNCTION
      )
      const mutationPromise = client.mutate({
        mutation: CREATE_WATCHLIST_MUTATION,
        variables: {
          name,
          isPublic,
          description,
          listItems:
            type === 'watchlist'
              ? getNormalizedListItems(listItems)
              : undefined,
          function: type === 'screener' ? watchlistFunction : undefined
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createWatchlist: {
            __typename: 'UserList',
            id: +new Date(),
            description: '',
            isPublic,
            name,
            listItems:
              type === 'watchlist' ? getNormalizedListItems(listItems) : [],
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
        update: (store, { data: { createWatchlist } }) => {
          const data = store.readQuery({ query: ALL_WATCHLISTS_QUERY })
          data.fetchWatchlists.push(createWatchlist)
          store.writeQuery({ query: ALL_WATCHLISTS_QUERY, data })
        }
      })
      return Observable.from(mutationPromise)
        .mergeMap(props => {
          const {
            data: {
              createWatchlist: { id, name }
            }
          } = props
          return Observable.merge(
            Observable.of({
              type: actions.USER_ADD_NEW_ASSET_LIST_SUCCESS
            }),
            Observable.of(
              showNotification({
                title: `New ${type} was created`,
                description: (
                  <WatchlistNotificationActions
                    id={id}
                    name={name}
                    toLink={getWatchlistLink({ id, name })}
                  />
                )
              })
            )
          )
        })
        .catch(error => {
          Sentry.captureException(error)
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
