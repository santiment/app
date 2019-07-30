import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { Button, Icon } from '@santiment-network/ui'
import AnonBannerCardB from './AnonBannerCardB'
import styles from './AnonBanner.module.scss'
import stylesB from './AnonBannerB.module.scss'

const AnonBanner = ({ className, onClick, bannerRef }) => {
  return (
    <div className={cx(styles.banner, className)} ref={bannerRef}>
      <AnonBannerCardB onClick={onClick} />
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
