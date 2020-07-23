import gql from 'graphql-tag'

export const updateUserListGQL = gql`
  mutation updateWatchlist($id: Int!, $isPublic: Boolean) {
    updateUserList(id: $id, isPublic: $isPublic) {
      isPublic
    }
  }
`
export const fetchUserListsGQL = gql`
  query fetchWatchlists {
    fetchUserLists {
      id
      isPublic
      user {
        id
      }
    }
  }
`
