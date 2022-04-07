import { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { buildRefetcher } from './utils'
import { client } from '../../apollo'

export const USER_QUERY = gql`
  {
    currentUser {
      id
      username # username, unique
      name # user full name, not unique
      email
      avatarUrl
      consentId
      sanBalance
      firstLogin
      stripeCustomerId
      marketingAccepted
      privacyPolicyAccepted
      following {
        count
        users {
          id
          avatarUrl
          username
        }
      }
    }
  }
`

export const refetchUser = buildRefetcher(USER_QUERY)

export function updateUser (newUser) {
  const { currentUser } = client.readQuery({
    query: USER_QUERY,
  })

  client.writeQuery({
    query: USER_QUERY,
    data: {
      currentUser: newUser && Object.assign({}, currentUser, newUser),
    },
  })
}

export function useUser () {
  const query = useQuery(USER_QUERY)

  return useMemo(() => {
    const { loading, data } = query
    const user = data && data.currentUser

    return {
      loading,
      user,
      isLoggedIn: !!user,
    }
  }, [query])
}
