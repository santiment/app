import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import { track } from 'webkit/analytics'
import TwitterIcon from './TwitterIcon'
import DiscordIcon from './DiscordIcon'
import RedditIcon from './RedditIcon'
import TelegramIcon from './TelegramIcon'
import { AlertsEvents } from '../../../ducks/Alert/analytics'
import styles from './ShareMedias.module.scss'

const SECRET_LINK_TAG = '__SECRET_LINK_TAG__'
const SECRET_TEXT_TAG = '__SECRET_TEXT_TAG__'
const SECRET_TITLE_TAG = '__SECRET_TITLE_TAG__'

const mediasToShare = [
  {
    icon: 'twitter',
    href: `https://twitter.com/home?status=${SECRET_TEXT_TAG}%0Alink%3A%20${SECRET_LINK_TAG}`,
    className: styles.twitter,
    title: 'Twitter',
  },
  {
    icon: 'facebook',
    href: `https://www.facebook.com/sharer/sharer.php?u=${SECRET_LINK_TAG}`,
    className: styles.facebook,
    title: 'Facebook',
  },
  {
    icon: 'linked-in',
    href: `https://www.linkedin.com/shareArticle?mini=true&title=${SECRET_TITLE_TAG}&summary=${SECRET_TEXT_TAG}&source=santiment.net&url=${SECRET_LINK_TAG}`,
    className: styles.linkedin,
    title: 'LinkedIn',
  },
  {
    icon: 'telegram',
    href: `https://telegram.me/share/url?text=${SECRET_TEXT_TAG}&url=${SECRET_LINK_TAG}`,
    className: styles.telegram,
    title: 'Telegram',
  },
  {
    icon: 'reddit',
    href: `https://reddit.com/submit?title=${SECRET_TEXT_TAG}&url=${SECRET_LINK_TAG}`,
    className: styles.reddit,
    title: 'Reddit',
  },
]

const mobileMedias = [
  {
    Icon: TwitterIcon,
    href: `https://twitter.com/home?status=${SECRET_TEXT_TAG}%0Alink%3A%20${SECRET_LINK_TAG}`,
    title: 'Twitter',
  },
  {
    Icon: DiscordIcon,
    href: `https://santiment.net/discord`,
    title: 'Discord',
  },
  {
    Icon: RedditIcon,
    href: `https://reddit.com/submit?title=${SECRET_TEXT_TAG}&url=${SECRET_LINK_TAG}`,
    title: 'Reddit',
  },
  {
    Icon: TelegramIcon,
    href: `https://telegram.me/share/url?text=${SECRET_TEXT_TAG}&url=${SECRET_LINK_TAG}`,
    title: 'Telegram',
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
  isMobile,
  isDashboard,
}) => {
  const encodedTitle = encodeURIComponent(shareTitle)
  const encodedText = encodeURIComponent(shareText)
  const encodedLink = encodeURIComponent(shareLink)

  if (isMobile) {
    return (
      <div className={styles.mediaWrapper}>
        {mobileMedias.map(({ Icon, href, title, className }) => (
          <a
            key={href}
            href={href
              .replace(SECRET_LINK_TAG, encodedLink)
              .replace(SECRET_TEXT_TAG, encodedText)
              .replace(SECRET_TITLE_TAG, encodedTitle)}
            target='_blank'
            rel='noopener noreferrer'
            className={cx(
              styles.mediaBtn,
              'btn body-2 row v-center',
              isDisabled && styles.disabled,
            )}
            onClick={(e) => isDisabled && e.preventDefault()}
          >
            <Icon className={cx(styles.icon, className)} />
            <span>{title}</span>
          </a>
        ))}
      </div>
    )
  }

  if (isDashboard) {
    return (
      <div className={cx(styles.wrapper, 'row')}>
        {mobileMedias.map(({ Icon, href }) => (
          <a
            key={href}
            href={href.replace(SECRET_LINK_TAG, encodedLink).replace(SECRET_TEXT_TAG, encodedText)}
            target='_blank'
            rel='noopener noreferrer'
            className={cx(styles.shareBtn, 'btn row hv-center')}
          >
            <Icon />
          </a>
        ))}
      </div>
    )
  }

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
                track.event(AlertsEvents.ClickCopyAlertLink)
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
