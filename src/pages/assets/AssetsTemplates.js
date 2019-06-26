import React from 'react'
import Label from '@santiment-network/ui/Label'
import Button from '@santiment-network/ui/Button'
import EmptySection from '../../components/EmptySection/EmptySection'
import WatchlistEdit from '../../components/WatchlistEdit/WatchlistEdit'
import styles from '../../components/Watchlists/Watchlist.module.scss'

const AssetsTemplates = ({ isAuthor, items, listId, isPublic, title }) => (
  <div className={styles.emptyWrapper}>
    <EmptySection imgClassName={styles.img}>
      {!isAuthor && !isPublic && (
        <Label className={styles.emptyText}>
          Watchlist is private or doesn't exist
        </Label>
      )}
      {!isAuthor && isPublic && items.length === 0 && (
        <Label className={styles.emptyText}>
          This public watchlist is empty
        </Label>
      )}
      {isAuthor && items.length === 0 && (
        <>
          <Label className={styles.emptyText}>
            Start to add assets you want to track or just interested in
          </Label>
          <WatchlistEdit
            name={title}
            id={listId}
            assets={items}
            trigger={
              <Button
                accent='positive'
                variant='fill'
                className={styles.emptyBtn}
              >
                Add assets
              </Button>
            }
          />
        </>
      )}
    </EmptySection>
  </div>
)

export default AssetsTemplates
