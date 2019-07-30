import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import styles from './AnonBanner.module.scss'
import stylesB from './AnonBannerB.module.scss'

const AnonBannerCardB = ({
  title = 'Get noise control for the crypto market',
  description = 'Smart overview supported by data-driven data',
  button = 'Get started',
  onClick,
  className
}) => (
  <div className={cx(styles.banner__top, stylesB.banner__top, className)}>
    <div className={stylesB.banner__left}>
      <div className={cx(styles.banner__title, stylesB.banner__title)}>
        {title}
      </div>
      <div
        className={cx(styles.banner__description, stylesB.banner__description)}
      >
        {description}
      </div>
    </div>
    <Button
      variant='fill'
      accent='positive'
      as={Link}
      to='/login'
      onClick={onClick}
      className={stylesB.banner__btn}
    >
      {button}
    </Button>
  </div>
)

export default AnonBannerCardB
