import Raven from 'raven-js'
import gql from 'graphql-tag'
import { Observable } from 'rxjs'
import { showNotification } from './../actions/rootActions'
import { allWatchlistsGQL } from './../components/WatchlistPopup/WatchlistGQL'
import * as actions from './../actions/types'
import { completeOnboardingTask } from '../pages/Dashboard/utils'

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
            insertedAt: new Date(),
            updatedAt: new Date(),
            user: {
              __typename: 'PostAuthor',
              id: +new Date()
            }
          }
        },
        update: (store, { data: { createUserList } }) => {
          const data = store.readQuery({ query: allWatchlistsGQL })
          data.fetchUserLists.push(createUserList)
          store.writeQuery({ query: allWatchlistsGQL, data })
        }
      })
      return Observable.from(mutationPromise)
        .mergeMap(() => {
          completeOnboardingTask('watchlist')
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
