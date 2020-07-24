import React, { useState } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import UIButton from '@santiment-network/ui/Button'
import { Button, Icon } from '../../Widgets/TopPanel/Actions'
import PublicityToggle from '../ChangeVisibility'
import ShareModalTrigger from '../../../../components/Share/ShareModalTrigger'
import styles from './index.module.scss'

const Share = ({ shareLink, watchlist }) => {
  const [isOpen, setOpen] = useState(false)
  const [isPublic, setIsPublic] = useState(watchlist.isPublic)
  return isPublic ? (
    <ShareModalTrigger
      shareLink={shareLink}
      trigger={props => (
        <Button {...props} className={styles.share__btn}>
          <Icon type='share' />
          Share
        </Button>
      )}
    />
  ) : (
    <Dialog
      title='Share Screener'
      open={isOpen}
      onClose={() => {
        setIsPublic(watchlist.isPublic)
        setOpen(false)
      }}
      onOpen={() => setOpen(true)}
      trigger={
        <Button className={styles.share__btn}>
          <Icon type='share' />
          Share
        </Button>
      }
    >
      <div className={styles.content}>
        <p className={styles.text}>
          To share your screener, please switch it to 'Public' first and press
          the 'Share Screener' button.
        </p>
        <div className={styles.actions}>
          <ShareModalTrigger
            shareLink={shareLink}
            trigger={props => (
              <UIButton
                {...props}
                variant='fill'
                accent='positive'
                disabled={!watchlist.isPublic}
              >
                Share screener
              </UIButton>
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
  )
}

export default Share
