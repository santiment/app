import React from 'react'
import PropTypes from 'prop-types'
import Input from '@santiment-network/ui/Input'
import Dialog from '@santiment-network/ui/Dialog'
import ShareCopyBtn from './ShareCopyBtn'
import ShareMedias from './medias/ShareMedias'
import styles from './SharePanel.module.scss'

const SharePanel = ({ shareTitle, shareText, shareLink }) => {
  return (
    <Dialog.ScrollContent className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.link}>
          <Input
            className={styles.link__input}
            readOnly
            defaultValue={shareLink}
          />
          <ShareCopyBtn shareLink={shareLink} />
        </div>

        <ShareMedias
          shareTitle={shareTitle}
          shareText={shareText}
          shareLink={shareLink}
        />
      </div>
    </Dialog.ScrollContent>
  )
}

SharePanel.propTypes = {
  shareLink: PropTypes.string.isRequired,
  shareTitle: PropTypes.string,
  shareText: PropTypes.string
}

SharePanel.defaultProps = {
  shareTitle: 'Sanbase',
  shareText: 'Hey! Look what I have found at the app.santiment.net!'
}

export default SharePanel
