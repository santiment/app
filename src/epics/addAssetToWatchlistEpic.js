import Raven from 'raven-js'
import gql from 'graphql-tag'
import { Observable } from 'rxjs'
import { WatchlistGQL } from './../components/WatchlistPopup/WatchlistGQL.js'
import * as actions from './../actions/types'

export const updateUserListGQL = gql`
  mutation updateUserList(
    $id: Int!
    $isPublic: Boolean
    $name: String
    $color: ColorEnum
    $listItems: [InputListItem]
  ) {
    updateUserList(
      id: $id
      isPublic: $isPublic
      name: $name
      color: $color
      listItems: $listItems
    ) {
      id
      listItems {
        project {
          id
          slug
        }
      }
      user {
        id
      }
      isPublic
      name
      color
      insertedAt
      updatedAt
    }
  }
`

const addAssetToWatchlistEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.USER_ADD_ASSET_TO_LIST)
    .mergeMap(({ payload: { assetsListId, listItems = [], projectId } }) => {
      const normalizedList = listItems.map(val => ({
        project_id: +val.project.id
      }))
      const newListItems = projectId
        ? [...normalizedList, { project_id: +projectId }]
        : normalizedList

      const userListUpdate = client.mutate({
        mutation: updateUserListGQL,
        variables: { id: +assetsListId, listItems: newListItems },
        update: (store, { data: { updateUserList } }) => {
          const data = store.readQuery({ query: WatchlistGQL })
          const index = data.fetchUserLists.findIndex(
            ({ id }) => id === updateUserList.id
          )
          data.fetchUserLists[index] = updateUserList
          store.writeQuery({ query: WatchlistGQL, data })
        }
      })
      return Observable.from(userListUpdate)
        .mergeMap(() =>
          Observable.of({ type: actions.USER_ADD_ASSET_TO_LIST_SUCCESS })
        )
        .catch(error => {
          Raven.captureException(error)
          return Observable.of({
            type: actions.USER_ADD_ASSET_TO_LIST_FAILED,
            payload: error
          })
        })
    })

export default addAssetToWatchlistEpic
