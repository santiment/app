import React from 'react'
import PropTypes from 'prop-types'
import Input from '@santiment-network/ui/Input'
import Dialog from '@santiment-network/ui/Dialog'
import ShareComposition from './ShareComposition'
import ShareCopyBtn from './ShareCopyBtn'
import ShareMedias from './medias/ShareMedias'
import styles from './SharePanel.module.scss'

const SharePanel = ({ shareTitle, shareText, shareLink, extraShare }) => {
  return (
    <Dialog.ScrollContent className={styles.wrapper}>
      <div className={styles.composition}>
        <ShareComposition />
      </div>
      <div className={styles.content}>
        <div className={styles.link}>
          <Input
            className={styles.link__input}
            readOnly
            defaultValue={shareLink}
          />
          <ShareCopyBtn shareLink={shareLink} />
        </div>
        {extraShare.map(({ value, label }, idx) => (
          <div className={styles.link} key={idx}>
            <Input
              className={styles.link__input}
              readOnly
              defaultValue={value}
            />
            <ShareCopyBtn shareLink={value} label={label} />
          </div>
        ))}

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
  shareText: 'Hey! Look what I have found at the app.santiment.net!',
  extraShare: []
}

export default SharePanel
