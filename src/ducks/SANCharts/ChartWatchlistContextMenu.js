import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import WatchlistsPopup from '../../components/WatchlistPopup/WatchlistsPopup'

const ChartWatchlistContextMenu = () => {
  return (
    <WatchlistsPopup
      dialogProps={{
        passOpenStateAs: 'isActive'
      }}
      trigger={
        <Button variant='flat'>
          <Icon type='add-watchlist' />
        </Button>
      }
    />
  )
}

export default ChartWatchlistContextMenu
