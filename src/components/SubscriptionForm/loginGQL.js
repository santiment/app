import gql from 'graphql-tag'

export const EMAIL_LOGIN_MUTATION = gql`
  mutation emailLogin(
    $email: String!
    $consent: String
    $subscribeToWeeklyNewsletter: Boolean = false
  ) {
    emailLogin(
      email: $email
      consent: $consent
      subscribeToWeeklyNewsletter: $subscribeToWeeklyNewsletter
    ) {
      success
    }
  }
`
