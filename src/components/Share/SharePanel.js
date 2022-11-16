import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { trackShareFormOpen } from 'webkit/analytics/events/interaction'
import Input from '@santiment-network/ui/Input'
import Dialog from '@santiment-network/ui/Dialog'
import ShareCopyBtn from './ShareCopyBtn'
import ShareMedias from './medias/ShareMedias'
import CopyLink from './CopyLink'
import styles from './SharePanel.module.scss'

const SharePanel = ({
  shareTitle,
  shareText,
  shareLink,
  children,
  isDisabled,
  isAlert,
  isMobile,
  source,
}) => {
  useEffect(() => {
    trackShareFormOpen(source)
  }, [])

  return (
    <Dialog.ScrollContent>
      <div className={styles.content}>
        {children}
        {isMobile ? (
          <CopyLink link={shareLink} source={source} />
        ) : (
          <div className={styles.link}>
            <Input
              className={styles.link__input}
              readOnly
              disabled={isDisabled}
              defaultValue={shareLink}
            />
            <ShareCopyBtn
              source='share-form'
              shareLink={shareLink}
              disabled={isDisabled}
              isAlert={isAlert}
            />
          </div>
        )}

        <ShareMedias
          isMobile={isMobile}
          isDisabled={isDisabled}
          shareTitle={shareTitle}
          shareText={shareText}
          shareLink={shareLink}
          isAlert={isAlert}
        />
      </div>
    </Dialog.ScrollContent>
  )
}

SharePanel.propTypes = {
  shareLink: PropTypes.string.isRequired,
  shareTitle: PropTypes.string,
  shareText: PropTypes.string,
}

SharePanel.defaultProps = {
  shareTitle: 'Sanbase',
  shareText: 'Hey! Look what I have found at the app.santiment.net!',
}

export default SharePanel
