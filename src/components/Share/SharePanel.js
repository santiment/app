import React from 'react'
import PropTypes from 'prop-types'
import { Input, Panel, Icon, Button } from '@santiment-network/ui'
import ShareComposition from './ShareComposition'
import ShareCopyBtn from './ShareCopyBtn.js'
import styles from './SharePanel.module.scss'

const SECRET_LINK_TAG = '__SECRET_LINK_TAG__'
const SECRET_TEXT_TAG = '__SECRET_TEXT_TAG__'
const SECRET_TITLE_TAG = '__SECRET_TITLE_TAG__'

const mediasToShare = [
  {
    label: 'Twitter',
    icon: 'twitter',
    href: `https://twitter.com/home?status=${SECRET_TEXT_TAG}%0Alink%3A%20${SECRET_LINK_TAG}`
  },
  {
    label: 'Facebook',
    icon: 'facebook',
    href: `https://www.facebook.com/sharer/sharer.php?u=${SECRET_LINK_TAG}`
  },
  {
    label: 'LinkedIn',
    icon: 'linkedIn',
    href: `https://www.linkedin.com/shareArticle?mini=true&title=${SECRET_TITLE_TAG}&summary=${SECRET_TEXT_TAG}&source=santiment.net&url=${SECRET_LINK_TAG}`
  },
  {
    label: 'Telegram',
    icon: 'telegram',
    href: `https://telegram.me/share/url?text=${SECRET_TEXT_TAG}&url=${SECRET_LINK_TAG}`
  },
  {
    label: 'Reddit',
    icon: 'reddit',
    href: `https://reddit.com/submit?title=${SECRET_TEXT_TAG}&url=${SECRET_LINK_TAG}`
  }
]

const SharePanel = ({ shareTitle, shareText, shareLink, onCloseBtnClick }) => {
  const encodedTitle = encodeURIComponent(shareTitle)
  const encodedText = encodeURIComponent(shareText)
  const encodedLink = encodeURIComponent(shareLink)

  return (
    <Panel className={styles.wrapper}>
      <div className={styles.upper}>
        <h3 className={styles.title}>Share the data</h3>
        <Icon type='close' className={styles.close} onClick={onCloseBtnClick} />
      </div>
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

        {mediasToShare.map(({ label, icon, href }) => {
          return (
            <Button
              key={label}
              variant='flat'
              as={props => (
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href={href
                    .replace(SECRET_LINK_TAG, encodedLink)
                    .replace(SECRET_TEXT_TAG, encodedText)
                    .replace(SECRET_TITLE_TAG, encodedTitle)}
                  {...props}
                />
              )}
              className={styles.btn}
            >
              <Icon type={icon} className={styles.icon} /> Share on {label}
            </Button>
          )
        })}
      </div>
    </Panel>
  )
}

SharePanel.propTypes = {
  shareLink: PropTypes.string.isRequired,
  shareTitle: PropTypes.string,
  shareText: PropTypes.string,
  onCloseBtnClick: PropTypes.func.isRequired
}

SharePanel.defaultProps = {
  shareTitle: 'Sanbase',
  shareText: 'Hey! Look what I have found at the app.santiment.net!'
}

export default SharePanel
