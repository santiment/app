import React, { useState, useCallback, useMemo } from 'react'
import Icon from '@santiment-network/ui/Icon'
import { store } from '../../../../../../redux'
import {
  useProjectID,
  useDeleteWatchlistItems,
  useAddWatchlistItems
} from './hooks'
import { showNotification } from '../../../../../../actions/rootActions'
import DarkTooltip from '../../../../../../components/Tooltip/DarkTooltip'
import NotificationActions from '../../../../../../components/NotificationActions/NotificationActions'
import tableStyles from '../../AssetsTable.module.scss'
import styles from './Actions.module.scss'

const Delete = ({ selected, watchlist, refetchAssets }) => {
  // GraphQL functions
  const { projectIds } = useProjectID(selected)
  const { removeWatchlistItems } = useDeleteWatchlistItems()
  const { addWatchlistItems } = useAddWatchlistItems()
  const [loading, setLoading] = useState(false);

  // UI variables
  const selectedText = useMemo(() => {
    return `${selected.length} ${selected.length > 1 ? 'items' : 'item'}`
  }, [selected])

  const reportError = useCallback(err => {
    store.dispatch(
        showNotification({
            variant: 'error',
            title: err.message,
            dismissAfter: 2000
        })
    )
  }, [store, showNotification])

  return (
    <DarkTooltip
      align='center'
      position='top'
      on='hover'
      className={tableStyles.tooltip_oneline}
      trigger={
        <div onClick={()=>{
            if (loading) return;
            setLoading(true);
            removeWatchlistItems({
                variables: {
                    id: parseInt(watchlist.id),
                    listItems: projectIds
                }
            })
            .then(() => setLoading(false))
            .then(() => {
                store.dispatch(
                    showNotification({
                        variant: 'info',
                        title: `${selectedText} deleted successfully.`,
                        description: (
                        <NotificationActions isOpenLink={false} onClick={() => {
                            addWatchlistItems({
                                variables: {
                                    id: parseInt(watchlist.id),
                                    listItems: projectIds
                                }
                            })
                            .then(refetchAssets)
                            .catch(reportError)                        
                        }} />
                        ),
                        dismissAfter: 8000
                    })
                )    
            })
            .then(refetchAssets)
            .catch(reportError)
        }}>
          <Icon type='remove' className={styles.remove} />
        </div>
      }
    >
      Delete {selectedText} from the watchlist
    </DarkTooltip>
  )
}

export default Delete
