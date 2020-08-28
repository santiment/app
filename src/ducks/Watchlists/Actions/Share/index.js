import React, { useState, useEffect } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import PublicityToggle from '../ChangeVisibility'
import ShareModalTrigger from '../../../../components/Share/ShareModalTrigger'
import { isDynamicWatchlist } from '../../utils'
import styles from './index.module.scss'

const Share = ({ watchlist, isAuthor }) => {
  const [isOpen, setOpen] = useState(false)
  const [isPublic, setIsPublic] = useState(watchlist.isPublic)

  const type = isDynamicWatchlist(watchlist) ? 'screener' : 'watchlist'
  const shareLink = window.location.href

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
      shareLink={shareLink}
      trigger={props => (
        <Button {...props} className={styles.trigger} icon='share'>
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
        <Button className={styles.trigger} icon='share'>
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
            shareLink={shareLink}
            trigger={props => (
              <Button
                {...props}
                variant='fill'
                accent='positive'
                disabled={!watchlist.isPublic}
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
