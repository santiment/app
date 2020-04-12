import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import styles from './ShareMedias.module.scss'

const SECRET_LINK_TAG = '__SECRET_LINK_TAG__'
const SECRET_TEXT_TAG = '__SECRET_TEXT_TAG__'
const SECRET_TITLE_TAG = '__SECRET_TITLE_TAG__'

const mediasToShare = [
  {
    label: 'Twitter',
    icon: 'twitter',
    href: `https://twitter.com/home?status=${SECRET_TEXT_TAG}%0Alink%3A%20${SECRET_LINK_TAG}`,
    className: styles.twitter
  },
  {
    label: 'Facebook',
    icon: 'facebook',
    href: `https://www.facebook.com/sharer/sharer.php?u=${SECRET_LINK_TAG}`,
    className: styles.facebook
  },
  {
    label: 'LinkedIn',
    icon: 'linked-in',
    href: `https://www.linkedin.com/shareArticle?mini=true&title=${SECRET_TITLE_TAG}&summary=${SECRET_TEXT_TAG}&source=santiment.net&url=${SECRET_LINK_TAG}`,
    className: styles.linkedin
  },
  {
    label: 'Telegram',
    icon: 'telegram',
    href: `https://telegram.me/share/url?text=${SECRET_TEXT_TAG}&url=${SECRET_LINK_TAG}`,
    className: styles.telegram
  },
  {
    label: 'Reddit',
    icon: 'reddit',
    href: `https://reddit.com/submit?title=${SECRET_TEXT_TAG}&url=${SECRET_LINK_TAG}`,
    className: styles.reddit
  }
]

const ShareMedias = ({
  shareLink,
  shareTitle = '',
  shareText = '',
  showShareLabel = true,
  classes = {}
}) => {
  const encodedTitle = encodeURIComponent(shareTitle)
  const encodedText = encodeURIComponent(shareText)
  const encodedLink = encodeURIComponent(shareLink)

  return (
    <>
      {mediasToShare.map(({ label, icon, href, className }) => {
        return (
          <Button
            key={label}
            variant='flat'
            as='a'
            className={cx(styles.btn, classes.shareBtn)}
            target='_blank'
            rel='noopener noreferrer'
            href={href
              .replace(SECRET_LINK_TAG, encodedLink)
              .replace(SECRET_TEXT_TAG, encodedText)
              .replace(SECRET_TITLE_TAG, encodedTitle)}
          >
            <Icon
              type={icon}
              className={cx(styles.icon, classes.shareIcon, className)}
            />
            {showShareLabel && <>Share on {label}</>}
          </Button>
        )
      })}
    </>
  )
}

export default ShareMedias
