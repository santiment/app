import React, { useState } from 'react'
import Button from '@santiment-network/ui/Button'
import Toggle from '@santiment-network/ui/Toggle'
import { useUpdateWatchlist } from '../../../../ducks/Watchlists/gql/hooks'

const PublicityToggle = ({ toggleWatchlistPublicity, watchlist }) => {
  const [isActive, setActive] = useState(watchlist.isPublic)
  const [updateWatchlist] = useUpdateWatchlist()

  return (
    <Button
      fluid
      variant='ghost'
      onClick={() => {
        setActive(!isActive)
        updateWatchlist(watchlist, { isPublic: !isActive })
      }}
    >
      Public <Toggle isActive={isActive} />
    </Button>
  )
}

export default PublicityToggle
