import React from 'react'
import cx from 'classnames'
import Checkboxes from '@santiment-network/ui/Checkboxes'
import { PROJECT } from '../detector'
import { hasAssetById } from '../utils'
import NewWatchlist from '../Actions/New'
import NewBtn from '../Actions/New/NewBtn'
import { VisibilityIndicator } from '../../../components/VisibilityIndicator'
import styles from './Watchlists.module.scss'

const Watchlists = ({
  lists = [],
  projectId,
  slug,
  onWatchlistClick,
  classes = {}
}) => (
  <>
    <div className={styles.listWrapper}>
      <div className={cx(styles.list, classes.list)}>
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
              <VisibilityIndicator isPublic={isPublic} />
            </div>
          ))
        ) : (
          <div>You don't have any watchlists yet.</div>
        )}
      </div>
    </div>
    <NewWatchlist
      type={PROJECT}
      openOnSuccess={false}
      trigger={<NewBtn border className={styles.watchlistNew} />}
    />
  </>
)

export default Watchlists
