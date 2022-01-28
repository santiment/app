import React from 'react'
import Actions from './Actions/index'
import { useDeleteWatchlistItems, useAddWatchlistItems } from './Actions/hooks'
import styles from './CompareInfo.module.scss'

const CompareInfo = ({
  type,
  selected,
  cleanAll,
  watchlist,
  refetchAssets
}) => {
  const { removeWatchlistItems } = useDeleteWatchlistItems()
  const { addWatchlistItems } = useAddWatchlistItems()
  return (
    <div className={styles.container}>
      {type === 'PROJECT' && (
        <Actions
          selected={selected}
          assets={watchlist.listItems.map(item => item.project)}
          watchlist={watchlist}
          onAdd={(watchlistId, listItems, onAddDone) =>
            addWatchlistItems({
              variables: {
                id: watchlistId,
                listItems
              }
            }).then(() => refetchAssets(onAddDone))
          }
          onRemove={(watchlistId, listItems, onRemoveDone) =>
            removeWatchlistItems({
              variables: {
                id: watchlistId,
                listItems
              }
            }).then(() => refetchAssets(onRemoveDone))
          }
        />
      )}

      <div className={styles.info}>
        <div className={styles.text}>
          {selected.length} asset{selected.length !== 1 ? 's are ' : ' is '}
          selected
        </div>

        {selected.length > 0 && cleanAll && (
          <div className={styles.clean} onClick={cleanAll}>
            Clear all
          </div>
        )}
      </div>
    </div>
  )
}

export default CompareInfo
