import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import { track } from 'webkit/analytics'
import { Event } from 'studio/analytics'
import styles from './ShareMedias.module.scss'

const SECRET_LINK_TAG = '__SECRET_LINK_TAG__'
const SECRET_TEXT_TAG = '__SECRET_TEXT_TAG__'
const SECRET_TITLE_TAG = '__SECRET_TITLE_TAG__'

const mediasToShare = [
  {
    icon: 'twitter',
    href: `https://twitter.com/home?status=${SECRET_TEXT_TAG}%0Alink%3A%20${SECRET_LINK_TAG}`,
    className: styles.twitter,
  },
  {
    icon: 'facebook',
    href: `https://www.facebook.com/sharer/sharer.php?u=${SECRET_LINK_TAG}`,
    className: styles.facebook,
  },
  {
    icon: 'linked-in',
    href: `https://www.linkedin.com/shareArticle?mini=true&title=${SECRET_TITLE_TAG}&summary=${SECRET_TEXT_TAG}&source=santiment.net&url=${SECRET_LINK_TAG}`,
    className: styles.linkedin,
  },
  {
    icon: 'telegram',
    href: `https://telegram.me/share/url?text=${SECRET_TEXT_TAG}&url=${SECRET_LINK_TAG}`,
    className: styles.telegram,
  },
  {
    icon: 'reddit',
    href: `https://reddit.com/submit?title=${SECRET_TEXT_TAG}&url=${SECRET_LINK_TAG}`,
    className: styles.reddit,
  },
]

const ShareMedias = ({
  shareLink,
  shareTitle = '',
  shareText = '',
  showTitle = true,
  isDisabled,
  classes = {},
  isAlert,
}) => {
  const encodedTitle = encodeURIComponent(shareTitle)
  const encodedText = encodeURIComponent(shareText)
  const encodedLink = encodeURIComponent(shareLink)

  return (
    <div className={cx(styles.block, classes.medias)}>
      {showTitle && <div className={styles.title}>Share on social media</div>}
      <div className={styles.share}>
        {mediasToShare.map(({ icon, href, className }) => (
          <Button
            key={icon}
            variant='flat'
            as='a'
            disabled={isDisabled}
            className={cx(styles.btn, classes.mediaBtn)}
            target='_blank'
            rel='noopener noreferrer'
            href={href
              .replace(SECRET_LINK_TAG, encodedLink)
              .replace(SECRET_TEXT_TAG, encodedText)
              .replace(SECRET_TITLE_TAG, encodedTitle)}
            onClick={() => {
              if (isAlert) {
                track.event(Event.ClickCopyAlertLink)
              }
            }}
          >
            <Icon type={icon} className={cx(styles.icon, className, classes.mediaIcon)} />
          </Button>
        ))}
      </div>
    </div>
  )
}

export default ShareMedias
