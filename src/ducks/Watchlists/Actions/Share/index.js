import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Dialog from '@santiment-network/ui/Dialog'
import Button from '@santiment-network/ui/Button'
import PublicityToggle from '../ChangeVisibility'
import { isDynamicWatchlist } from '../../utils'
import ShareModalTrigger from '../../../../components/Share/ShareModalTrigger'
import { useShortShareLink } from '../../../../components/Share/hooks'
import styles from './index.module.scss'

const Share = ({ watchlist, isAuthor, className }) => {
  const [isOpen, setOpen] = useState(false)
  const [isPublic, setIsPublic] = useState(watchlist.isPublic)
  const { shortShareLink, getShortShareLink } = useShortShareLink()

  const type = isDynamicWatchlist(watchlist) ? 'screener' : 'watchlist'

  useEffect(
    () => {
      if (isPublic !== watchlist.isPublic && !isOpen) {
        setIsPublic(watchlist.isPublic)
      }
    },
    [watchlist.isPublic]
  )

  return isPublic ? (
    <ShareModalTrigger
      shareLink={shortShareLink}
      trigger={props => (
        <Button
          {...props}
          className={cx(styles.trigger, className)}
          onMouseDown={getShortShareLink}
          icon='share'
        >
          Share
        </Button>
      )}
    />
  ) : isAuthor ? (
    <Dialog
      title={`Share ${type}`}
      open={isOpen}
      onClose={() => {
        setIsPublic(watchlist.isPublic)
        setOpen(false)
      }}
      onOpen={() => setOpen(true)}
      trigger={
        <Button className={cx(styles.trigger, className)} icon='share'>
          Share
        </Button>
      }
    >
      <div className={styles.content}>
        <p className={styles.text}>
          {`To share your ${type}, please switch it to 'Public' first and press
          the 'Share ${type}' button.`}
        </p>
        <div className={styles.actions}>
          <ShareModalTrigger
            shareLink={shortShareLink}
            trigger={props => (
              <Button
                {...props}
                variant='fill'
                accent='positive'
                disabled={!watchlist.isPublic}
                onMouseDown={getShortShareLink}
              >
                {`Share ${type}`}
              </Button>
            )}
          />
          <PublicityToggle
            variant='flat'
            watchlist={watchlist}
            className={styles.toggle}
          />
        </div>
      </div>
    </Dialog>
  ) : null
}

export default Share
