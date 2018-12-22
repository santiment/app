import React from 'react'
import { Input, Button, Checkbox } from 'semantic-ui-react'
import styles from './WatchlistCopyPopup.module.scss'

const WatchlistCopyPopup = ({
  assets,
  assetsToCopy,
  handleCopyConfirm,
  onChange,
  onAssetClick
}) => {
  return (
    <div>
      <ul className={styles.list}>
        {assets.map(({ id, name }) => (
          <li onClick={() => onAssetClick(id)} className={styles.item}>
            {name} <Checkbox checked={assetsToCopy.has(id)} />
          </li>
        ))}
      </ul>
      <form className={styles.bottom} onSubmit={handleCopyConfirm}>
        <Input
          placeholder='New watchlist title'
          onChange={onChange}
          className={styles.input}
        />
        <Button className={styles.button} type='submit'>
          Submit
        </Button>
      </form>
    </div>
  )
}

export default WatchlistCopyPopup
