import React, { useState, useCallback, useMemo } from 'react'
import Icon from '@santiment-network/ui/Icon'
import { store } from '../../../../../../redux'
import {
  getProjectIDs,
  useDeleteWatchlistItems,
  useAddWatchlistItems
} from './hooks'
import { showNotification } from '../../../../../../actions/rootActions'
import DarkTooltip from '../../../../../../components/Tooltip/DarkTooltip'
import NotificationActions from '../../../../../../components/NotificationActions/NotificationActions'
import tableStyles from '../../AssetsTable.module.scss'
import styles from './Actions.module.scss'

const Delete = ({ selected, watchlist, refetchAssets }) => {
  const { removeWatchlistItems } = useDeleteWatchlistItems()
  const { addWatchlistItems } = useAddWatchlistItems()
  const [loading, setLoading] = useState(false)

  const selectedText = useMemo(() => {
    return `${selected.length} ${selected.length > 1 ? 'items' : 'item'}`
  }, [selected])

  const reportError = useCallback(
    err => {
      store.dispatch(
        showNotification({
          variant: 'error',
          title: err.message,
          dismissAfter: 2000
        })
      )
    },
    [store, showNotification]
  )

  const onUndo = projectIds => {
    setLoading(true)
    addWatchlistItems({
      variables: {
        id: parseInt(watchlist.id),
        listItems: projectIds
      }
    })
      .then(() => setLoading(false))
      .then(refetchAssets)
      .catch(reportError)
  }

  const onClick = () => {
    if (loading) return

    setLoading(true)
    let projectIds = []

    getProjectIDs(selected)
      .then(res => {
        projectIds = Object.entries(res.data.items.projects).map(p => ({
          projectId: parseInt(p[1].id)
        }))
      })
      .then(() => {
        removeWatchlistItems({
          variables: {
            id: parseInt(watchlist.id),
            listItems: projectIds
          }
        })
      })
      .then(() => setLoading(false))
      .then(() => {
        store.dispatch(
          showNotification({
            variant: 'info',
            title: `${selectedText} deleted successfully.`,
            description: (
              <NotificationActions
                isOpenLink={false}
                onClick={() => onUndo(projectIds)}
              />
            ),
            dismissAfter: 8000
          })
        )
      })
      .then(refetchAssets)
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
          <Icon type='remove' className={styles.remove} />
        </div>
      }
    >
      Delete {selectedText} from the watchlist
    </DarkTooltip>
  )
}

export default Delete
