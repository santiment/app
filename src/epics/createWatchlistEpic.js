import React from 'react'
import Raven from 'raven-js'
import gql from 'graphql-tag'
import { Observable } from 'rxjs'
import { showNotification } from './../actions/rootActions'
import { ALL_WATCHLISTS_QUERY } from '../queries/WatchlistGQL'
import * as actions from './../actions/types'
import WatchlistNotificationActions from '../pages/assets/notifications/WatchlistNotificationActions'
import { getWatchlistLink } from '../ducks/Watchlists/utils'

const CREATE_WATCHLIST_MUTATION = gql`
  mutation createWatchlist(
    $color: ColorEnum
    $isPublic: Boolean
    $name: String!
  ) {
    createUserList(color: $color, isPublic: $isPublic, name: $name) {
      id
      name
      isPublic
      color
      insertedAt
      isMonitored
      updatedAt
      listItems {
        project {
          id
        }
      }
      user {
        id
      }
    }
  }
`

const createWatchlistEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.USER_ADD_NEW_ASSET_LIST)
    .debounceTime(200)
    .mergeMap(action => {
      const {
        name,
        color = 'NONE',
        isPublic = false,
        listItems = []
      } = action.payload
      const mutationPromise = client.mutate({
        mutation: CREATE_WATCHLIST_MUTATION,
        variables: {
          name,
          isPublic,
          color
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createUserList: {
            __typename: 'UserList',
            id: +new Date(),
            color,
            isPublic,
            name,
            listItems,
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
                title: 'Created the new watchlist',
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
                description:
                  "Can't create the watchlist. Please, try again later."
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
