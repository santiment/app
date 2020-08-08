import React from 'react'
import Label from '@santiment-network/ui/Label'
import Button from '@santiment-network/ui/Button'
import Edit from '../../Actions/Edit/EditAssets'
import EmptySection from '../../../../components/EmptySection/EmptySection'
import styles from '../../Cards/Watchlist.module.scss'

const AssetsTemplates = ({ isAuthor, items, listId, isPublic, title }) => (
  <>
    {!isAuthor && !isPublic && (
      <EmptySection imgClassName={styles.img}>
        <Label className={styles.emptyText}>
          List is private or doesn't exist
        </Label>
      </EmptySection>
    )}
    {!isAuthor && isPublic && items.length === 0 && (
      <EmptySection imgClassName={styles.img}>
        <Label className={styles.emptyText}>
          This public watchlist is empty
        </Label>
      </EmptySection>
    )}
    {isAuthor && items.length === 0 && (
      <EmptySection imgClassName={styles.img}>
        <Label className={styles.emptyText}>
          Start to add assets you want to track or just interested in
        </Label>

        <Edit
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
      </EmptySection>
    )}
  </>
)

export default AssetsTemplates
