import React from 'react'
import { Input, Button } from 'semantic-ui-react'

const WatchlistCopyPopup = ({ assets, handleCopyConfirm }) => {
  return (
    <div>
      <Input placeholder='New watchlist title' />
      <Button onClick={() => handleCopyConfirm({ name: 'test' })}>
        Submit
      </Button>
    </div>
  )
}

export default WatchlistCopyPopup
