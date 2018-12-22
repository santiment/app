import Raven from 'raven-js'
import gql from 'graphql-tag'
import { Observable } from 'rxjs'
import { showNotification } from './../actions/rootActions'
import * as actions from './../actions/types'

const createUserListGQL = gql`
  mutation createUserList(
    $color: ColorEnum
    $isPublic: Boolean
    $name: String!
  ) {
    createUserList(color: $color, isPublic: $isPublic, name: $name) {
      id
    }
  }
`

const copyWatchlistEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.USER_COPY_ASSET_LIST)
    .debounceTime(200)
    .mergeMap(action => {
      const {
        name,
        color = 'NONE',
        isPublic = false,
        assets = []
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
            id: +new Date()
          }
        }
      })

      return Observable.from(mutationPromise)
        .mergeMap(({ data }) => {
          return Observable.merge(
            assets.length > 0
              ? Observable.of({
                type: actions.USER_ADD_ASSET_TO_LIST,
                payload: {
                  assetsListId: data.createUserList.id,
                  listItems: assets.map(asset => ({ project: asset }))
                }
              })
              : Observable.of({
                type: actions.USER_ADD_NEW_ASSET_LIST_SUCCESS
              }),
            Observable.of(showNotification('Added new assets list'))
          )
        })
        .catch(error => {
          Raven.captureException(error)
          return Observable.of({
            type: actions.USER_ADD_NEW_ASSET_LIST_FAILED,
            payload: error
          })
        })
    })

export default copyWatchlistEpic
