import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { Button, Icon } from '@santiment-network/ui'
import styles from './AnonBanner.module.scss'
import stylesB from './AnonBannerB.module.scss'

const AnonBanner = ({ className, onClick }) => {
  return (
    <div className={cx(styles.banner, className)}>
      <div className={cx(styles.banner__top, stylesB.banner__top)}>
        <div className={stylesB.banner__left}>
          <div className={cx(styles.banner__title, stylesB.banner__title)}>
            Noise control for the crypto market
          </div>
          <div
            className={cx(
              styles.banner__description,
              stylesB.banner__description
            )}
          >
            Smart overview supported by data-driven data
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
          Get started
        </Button>
      </div>
      <div className={styles.banner__info}>
        <div className={styles.advantages}>
          <div className={styles.advantage}>
            <div className={styles.advantage__img}>
              <Icon type='data-big' />
            </div>
            <div className={styles.advantage__text}>
              On-chain, social and development data for 1200+ crypto projects
            </div>
          </div>
          <div className={styles.advantage}>
            <div className={styles.advantage__img}>
              <Icon type='crown-big' />
            </div>
            <div className={styles.advantage__text}>
              Exclusive crypto metrics and curated, data-driven daily insights
            </div>
          </div>
          <div className={styles.advantage}>
            <div className={styles.advantage__img}>
              <Icon type='community-big' />
            </div>

            <div className={styles.advantage__text}>
              Growing community of crypto traders and market analysts
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(AnonBanner)
