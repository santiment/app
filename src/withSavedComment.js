import React, { useEffect } from 'react'
import { useUser } from './stores/user'
import { lookupSavedComment } from './ducks/Studio/Chart/Insights/utils'

export const withSavedComment = Component => props => {
  const { isLoggedIn } = useUser()
  useEffect(
    () => {
      if (isLoggedIn) lookupSavedComment()
    },
    [isLoggedIn]
  )
  return <Component {...props} />
}
