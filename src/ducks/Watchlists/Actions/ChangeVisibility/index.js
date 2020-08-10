import React, { useState } from 'react'
import Toggle from './Toggle'
import { useUpdateWatchlist } from '../../gql/hooks'

const PublicityToggle = ({ watchlist, ...props }) => {
  const [isActive, setActive] = useState(watchlist.isPublic)
  const [updateWatchlist] = useUpdateWatchlist()

  return (
    <Toggle
      onClick={() => {
        setActive(!isActive)
        updateWatchlist(watchlist, { isPublic: !isActive })
      }}
      isActive={isActive}
      {...props}
    />
  )
}

export default PublicityToggle
