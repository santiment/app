import React from 'react'
import { Input, Button } from 'semantic-ui-react'

const WatchlistCopyPopup = ({ assets }) => {
  return (
    <div>
      <Input placeholder='New watchlist title' />
      <Button>Submit</Button>
    </div>
  )
}

export default WatchlistCopyPopup
