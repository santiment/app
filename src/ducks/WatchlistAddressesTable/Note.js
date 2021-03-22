import React from 'react'
import AutoresizeTextarea from '../../components/AutoresizeTextarea'
import { updateWatchlistShort } from '../Watchlists/gql/list/mutations'
import {
  notifyError,
  notifySaveNote
} from '../Watchlists/Widgets/TopPanel/notifications'
import styles from './index.module.scss'

const Note = ({ notes, address, infrastructure, watchlistId, isAuthor }) => {
  function updateItem (notes) {
    if (isAuthor) {
      updateWatchlistShort(
        {
          id: +watchlistId,
          listItems: [{ blockchainAddress: { address, infrastructure, notes } }]
        },
        'ADD_ITEMS'
      )
        .then(() => notifySaveNote())
        .catch(() => notifyError('note', 'save'))
    }
  }

  return (
    <div className={styles.note}>
      <AutoresizeTextarea
        maxLength={45}
        onBlur={updateItem}
        blurOnEnter
        readOnly={!isAuthor}
        placeholder='Add note'
        defaultValue={notes || ''}
      />
    </div>
  )
}

export default Note
