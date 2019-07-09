import React from 'react'
import { Checkboxes, Icon } from '@santiment-network/ui'
import { hasAssetById } from './WatchlistsPopup'
import ExplanationTooltip from '../ExplanationTooltip/ExplanationTooltip'
import NewWatchlistDialog from '../Watchlists/NewWatchlistDialog'
import WatchlistNewBtn from './WatchlistNewBtn'
import styles from './Watchlists.module.scss'

const Watchlists = ({ lists = [], projectId, slug, onWatchlistClick }) => (
  <>
    <div className={styles.listWrapper}>
      <div className={styles.list}>
        {lists.length > 0 ? (
          lists.map(({ id, name, isPublic, listItems = [] }) => (
            <div className={styles.watchlist} key={id}>
              <Checkboxes
                className={styles.checkbox}
                options={[name]}
                defaultSelectedIndexes={
                  hasAssetById({ listItems, id: projectId }) ? [name] : []
                }
                key={id}
                labelOnRight
                labelClassName={styles.label}
                onSelect={() =>
                  onWatchlistClick({
                    id,
                    slug,
                    listItems
                  })
                }
              />
              <ExplanationTooltip
                text={isPublic ? 'Public' : 'Private'}
                className={styles.explanation}
                offsetY={5}
              >
                <Icon
                  type={isPublic ? 'eye' : 'lock-small'}
                  className={styles.icon}
                />
              </ExplanationTooltip>
            </div>
          ))
        ) : (
          <div>You don't have any watchlists yet.</div>
        )}
      </div>
    </div>
    <NewWatchlistDialog
      trigger={<WatchlistNewBtn border className={styles.watchlistNew} />}
      watchlists={lists}
    />
  </>
)

export default Watchlists
