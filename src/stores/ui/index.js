import { useState, useEffect } from 'react'
import { USER_QUERY } from '../user'
import { client } from '../../index'

export function useIsLoggedIn () {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(
    () =>
      client.cache.watch({
        query: USER_QUERY,
        callback: ({ result: { currentUser } }) => setIsLoggedIn(!!currentUser)
      }),
    []
  )

  return isLoggedIn
}
