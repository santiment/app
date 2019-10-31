import Raven from 'raven-js'
import gql from 'graphql-tag'
import { Observable } from 'rxjs'
import GoogleAnalytics from 'react-ga'
import { showNotification } from './../actions/rootActions'
import { ALL_WATCHLISTS_QUERY } from '../queries/WatchlistGQL'
import {
  completeOnboardingTask,
  getOnboardingCompletedTasks
} from '../pages/Dashboard/utils'
import { GA_FIRST_WATCHLIST } from '../enums/GaEvents'
import * as actions from './../actions/types'

const createUserListGQL = gql`
  mutation createUserList(
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
        mutation: createUserListGQL,
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
        .mergeMap(() => {
          const completedTasks = getOnboardingCompletedTasks()
          if (!completedTasks.includes('watchlist')) {
            completeOnboardingTask('watchlist')
            GoogleAnalytics.event(GA_FIRST_WATCHLIST)
          }
          return Observable.merge(
            Observable.of({
              type: actions.USER_ADD_NEW_ASSET_LIST_SUCCESS
            }),
            Observable.of(showNotification('Created the new watchlist'))
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
