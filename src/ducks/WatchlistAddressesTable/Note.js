import React from 'react'
import AutoresizeTextarea from '../../components/AutoresizeTextarea'
import { updateWatchlistShort } from '../Watchlists/gql/list/mutations'
import styles from './index.module.scss'

const Note = ({ notes, address, infrastructure, watchlistId }) => {
  function updateItem (notes) {
    updateWatchlistShort(
      {
        id: +watchlistId,
        listItems: [{ blockchainAddress: { address, infrastructure, notes } }]
      },
      'ADD_ITEMS'
    )
  }

  return (
    <div className={styles.note}>
      <AutoresizeTextarea
        defaultValue={notes || ''}
        placeholder='Add note'
        maxLength={45}
        onBlur={updateItem}
      />
    </div>
  )
}

export default Note
