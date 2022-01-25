import React, { useMemo } from 'react'
import { store } from '../../../../../../redux'
import { showNotification } from '../../../../../../actions/rootActions'
import NotificationActions from '../../../../../../components/NotificationActions/NotificationActions'
import Delete from './Delete'
import Copy from './Copy'
import SaveAs from './SaveAs'
import styles from './Actions.module.scss'

const reportError = err =>
  store.dispatch(
    showNotification({
      variant: 'error',
      title: err.message,
      dismissAfter: 2000
    })
  )

const Actions = ({ selected, watchlist, onAdd, onRemove, assets }) => {
  const selectedText = useMemo(
    () => `${selected.length} ${selected.length > 1 ? 'items' : 'item'}`,
    [selected]
  )

  function addHandler (listItems, onAddDone = () => {}) {
    onAdd(parseInt(watchlist.id), listItems, onAddDone).catch(reportError)
  }

  function removeHandler (listItems, onRemoveDone = () => {}) {
    onRemove(parseInt(watchlist.id), listItems, () => {
      store.dispatch(
        showNotification({
          variant: 'info',
          title: `${selectedText} deleted successfully.`,
          description: (
            <NotificationActions
              isOpenLink={false}
              onClick={() => addHandler(listItems)}
            />
          ),
          dismissAfter: 8000
        })
      )
      onRemoveDone()
    }).catch(reportError)
  }

  return (
    <>
      <div className={styles.actions}>
        {watchlist && watchlist.type !== "BLOCKCHAIN_ADDRESS" &&
          <Copy
            selectedText={selectedText}
            watchlist={watchlist}
            assets={assets}
            selected={selected}
          />
        }
        <SaveAs selectedText={selectedText} watchlist={watchlist} />
        <Delete
          selected={selected}
          onRemove={removeHandler}
          selectedText={selectedText}
        />
      </div>
    </>
  )
}

export default Actions
