import React from 'react'
import { Input, Button, Checkbox } from 'semantic-ui-react'

const WatchlistCopyPopup = ({
  assets,
  assetsToCopy,
  handleCopyConfirm,
  onChange,
  onAssetClick
}) => {
  return (
    <div>
      <ul>
        {assets.map(({ id, name }) => (
          <li onClick={() => onAssetClick(id)}>
            {name} <Checkbox checked={assetsToCopy.has(id)} />
          </li>
        ))}
      </ul>
      <Input placeholder='New watchlist title' onChange={onChange} />
      <Button onClick={() => handleCopyConfirm({ name: 'test' })}>
        Submit
      </Button>
    </div>
  )
}

export default WatchlistCopyPopup
