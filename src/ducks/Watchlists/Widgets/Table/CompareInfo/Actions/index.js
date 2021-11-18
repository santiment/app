import React from 'react'
import Delete from './Delete'
import styles from './Actions.module.scss'

const Actions = ({ selected, watchlist, refetchAssets }) => {
  return (
    <div className={styles.actions}>
      <Delete
        selected={selected}
        watchlist={watchlist}
        refetchAssets={refetchAssets}
      />
    </div>
  )
}

export default Actions
