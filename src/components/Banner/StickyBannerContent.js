import React from 'react'
import { Icon } from '@santiment-network/ui'
import Image from '../../assets/sticky_banner_icon.png'
import SubscriptionForm from '../SubscriptionForm/SubscriptionForm'
import styles from './StickyBannerContent.module.scss'

const StickyBannerContent = ({ onClose }) => {
  return (
    <div className={styles.banner}>
      <div className={styles.banner__imageWrapper}>
        <img src={Image} alt='banner logo' className={styles.banner__image} />
      </div>
      <div className={styles.banner__contentWrapper}>
        <div className={styles.banner__textWrapper}>
          <h2 className={styles.banner__title}>Want more crypto insights?</h2>
          <p className={styles.banner__description}>
            Read daily analysis of top emerging words/stories
          </p>
        </div>
        <SubscriptionForm hideCheckbox />
      </div>
      <Icon
        onClick={onClose}
        type='close'
        className={styles.banner__closeIcon}
      />
    </div>
  )
}

export default StickyBannerContent
