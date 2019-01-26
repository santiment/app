import React from 'react'
import PropTypes from 'prop-types'
import { Input, Panel, Icon, Button } from '@santiment-network/ui'
import copy from 'copy-to-clipboard'
import ShareComposition from './ShareComposition'
import styles from './SharePanel.module.scss'

const media = [
  {
    label: 'Twitter',
    icon: 'twitter',
    href:
      'https://twitter.com/home?status=Hey!%20Look%20what%20I%20have%20found%3A%20'
  },
  {
    label: 'Facebook',
    icon: 'facebook',
    href:
      'https://www.facebook.com/sharer/sharer.php?u=Hey!%20Look%20what%20I%20have%20found%3A%20'
  },
  {
    label: 'LinkedIn',
    icon: 'linkedIn',
    href:
      'https://www.linkedin.com/shareArticle?mini=true&title=Santiment.net%20Data&summary=Hey!%20Look%20what%20I%20have%20found&source=santiment.net&url='
  },
  {
    label: 'Telegram',
    icon: 'telegram',
    href:
      'https://telegram.me/share/url?text=Hey!%20Look%20what%20I%20have%20found%20on%20the%20santiment.net&url='
  },
  {
    label: 'Reddit',
    icon: 'reddit',
    href:
      'https://reddit.com/submit?title=Hey!%20Look%20what%20I%20have%20found%20on%20the%20santiment.net&url='
  }
]

const SharePanel = ({ shareLink, onCloseBtnClick }) => {
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
          <Button
            className={styles.link__btn}
            variant='flat'
            onClick={() => copy(shareLink)}
          >
            Copy link
          </Button>
        </div>

        {media.map(({ label, icon, href }) => {
          return (
            <Button
              key={label}
              variant='flat'
              as={props => (
                <a href={href + encodeURIComponent(shareLink)} {...props} />
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
  onCloseBtnClick: PropTypes.func.isRequired
}

export default SharePanel
