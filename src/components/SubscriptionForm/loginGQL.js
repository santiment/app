import gql from 'graphql-tag'

export const EMAIL_LOGIN_MUTATION = gql`
  mutation emailLogin($email: String!, $consent: String) {
    emailLogin(email: $email, consent: $consent) {
      success
    }
  }
`
