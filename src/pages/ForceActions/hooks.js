import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const CHANGE_USERNAME_MUTATION = gql`
  mutation changeUsername($username: String!) {
    changeUsername(username: $username) {
      username
    }
  }
`
export function useChangeUsername () {
  const [mutate, { loading }] = useMutation(CHANGE_USERNAME_MUTATION)

  const changeUsername = username =>
    mutate({
      variables: {
        username
      }
    })

  return { changeUsername, loading }
}
