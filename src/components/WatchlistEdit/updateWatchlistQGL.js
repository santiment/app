import gql from 'graphql-tag'

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
