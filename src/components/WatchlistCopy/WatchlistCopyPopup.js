import React from 'react'
import { Input, Button, Checkbox } from 'semantic-ui-react'
import styles from './WatchlistCopyPopup.module.scss'

const WatchlistCopyPopup = ({
  assets,
  assetsToCopy,
  onFormSubmit,
  onChange,
  onAssetClick
}) => {
  return (
    <div>
      <h4 className={styles.title}>Assets to include in a new Watchlist</h4>
      <ul className={styles.list}>
        {assets.map(({ id, name }) => (
          <li key={id} onClick={() => onAssetClick(id)} className={styles.item}>
            {name} <Checkbox checked={assetsToCopy.has(id)} />
          </li>
        ))}
      </ul>
      <form className={styles.bottom} onSubmit={onFormSubmit}>
        <Input
          placeholder='New watchlist title'
          onChange={onChange}
          className={styles.input}
        />
        <Button className={styles.button} type='submit' positive>
          Submit
        </Button>
      </form>
    </div>
  )
}

export default WatchlistCopyPopup
