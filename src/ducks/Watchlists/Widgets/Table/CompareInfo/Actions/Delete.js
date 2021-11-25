import React, { useState, useMemo } from 'react'
import Icon from '@santiment-network/ui/Icon'
import { store } from '../../../../../../redux'
import { useDeleteWatchlistItems, useAddWatchlistItems } from './hooks'
import { showNotification } from '../../../../../../actions/rootActions'
import DarkTooltip from '../../../../../../components/Tooltip/DarkTooltip'
import NotificationActions from '../../../../../../components/NotificationActions/NotificationActions'
import tableStyles from '../../AssetsTable.module.scss'
import styles from './Actions.module.scss'

function reportError (err) {
  store.dispatch(
    showNotification({
      variant: 'error',
      title: err.message,
      dismissAfter: 2000
    })
  )
}

const Delete = ({ selected, watchlist, refetchAssets }) => {
  const { removeWatchlistItems } = useDeleteWatchlistItems()
  const { addWatchlistItems } = useAddWatchlistItems()
  const [loading, setLoading] = useState(false)

  const selectedText = useMemo(
    () => `${selected.length} ${selected.length > 1 ? 'items' : 'item'}`,
    [selected]
  )

  function onUndo (listItems) {
    setLoading(true)
    addWatchlistItems({
      variables: {
        id: parseInt(watchlist.id),
        listItems
      }
    })
      .then(refetchAssets)
      .then(() => setLoading(false))
      .catch(reportError)
  }

  function onClick () {
    if (loading) return

    setLoading(true)
    const listItems = selected.map(s => ({ projectId: parseInt(s.id) }))

    removeWatchlistItems({
      variables: {
        id: parseInt(watchlist.id),
        listItems
      }
    })
      .then(() => refetchAssets(() => {
        store.dispatch(showNotification({
          variant: 'info',
          title: `${selectedText} deleted successfully.`,
          description: (
            <NotificationActions
              isOpenLink={false}
              onClick={() => onUndo(listItems)}
            />
          ),
          dismissAfter: 8000
        }))
        setLoading(false)
      }))
      .catch(reportError)
  }

  return (
    <DarkTooltip
      align='center'
      position='top'
      on='hover'
      className={tableStyles.tooltip_oneline}
      trigger={
        <div onClick={onClick}>
          <Icon type={loading ? 'update' : 'remove'} className={styles.remove} />
        </div>
      }
    >
      Delete {selectedText} from the watchlist
    </DarkTooltip>
  )
}

export default Delete
