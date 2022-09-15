import React from 'react'
import cx from 'classnames'
import TwitterIcon from '../../../../../components/Share/medias/TwitterIcon'
import DiscordIcon from '../../../../../components/Share/medias/DiscordIcon'
import RedditIcon from '../../../../../components/Share/medias/RedditIcon'
import TelegramIcon from '../../../../../components/Share/medias/TelegramIcon'
import styles from './Share.module.scss'

const SECRET_LINK_TAG = '__SECRET_LINK_TAG__'
const SECRET_TEXT_TAG = '__SECRET_TEXT_TAG__'

const mobileMedias = [
  {
    Icon: TwitterIcon,
    href: `https://twitter.com/home?status=${SECRET_TEXT_TAG}%0Alink%3A%20${SECRET_LINK_TAG}`,
  },
  {
    Icon: DiscordIcon,
    href: `https://santiment.net/discord`,
  },
  {
    Icon: RedditIcon,
    href: `https://reddit.com/submit?title=${SECRET_TEXT_TAG}&url=${SECRET_LINK_TAG}`,
  },
  {
    Icon: TelegramIcon,
    href: `https://telegram.me/share/url?text=${SECRET_TEXT_TAG}&url=${SECRET_LINK_TAG}`,
  },
]

const Share = ({ text }) => {
  const encodedText = encodeURIComponent(text)
  const encodedLink = encodeURIComponent(window.location.href)

  return (
    <div className={cx(styles.wrapper, 'row')}>
      {mobileMedias.map(({ Icon, href }) => (
        <a
          key={href}
          href={href.replace(SECRET_LINK_TAG, encodedLink).replace(SECRET_TEXT_TAG, encodedText)}
          target='_blank'
          rel='noopener noreferrer'
          className={cx(styles.btn, 'btn row hv-center')}
        >
          <Icon />
        </a>
      ))}
    </div>
  )
}

export default Share
