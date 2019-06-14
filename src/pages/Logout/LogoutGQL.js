import gql from 'graphql-tag'

export const LogoutGQL = gql`
  mutation logout {
    logout {
      success
    }
  }
`
