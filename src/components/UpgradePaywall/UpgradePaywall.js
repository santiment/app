import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import UpgradeBtn from '../UpgradeBtn/UpgradeBtn'
import styles from './UpgradePaywall.module.scss'

const UpgradePaywall = ({ isAdvancedView, isWideChart }) => (
  <div className={cx(styles.wrapper, isWideChart && styles.whiteBg)}>
    <div className={styles.top}>
      <h4 className={styles.slogan}>Go PRO and get more data</h4>
      <UpgradeBtn loginRequired={false} variant='fill'>
        Upgrade
      </UpgradeBtn>
    </div>
    <ul className={cx(styles.list, isAdvancedView && styles.short)}>
      <UpgradeItem
        iconType='finance'
        text='Unlimited metrics'
        className={styles.item}
      />
      <UpgradeItem
        iconType='connection'
        text='All types of alerts'
        className={styles.item}
      />
      <UpgradeItem
        iconType='words-list'
        text='Handcrafted reports'
        className={styles.item}
      />
    </ul>
  </div>
)

const UpgradeItem = ({ iconType, text, className }) => (
  <li className={className}>
    <div className={styles.iconWrapper}>
      <Icon type={iconType} className={styles.icon} />
    </div>
    <span className={styles.text}>{text}</span>
  </li>
)

export default UpgradePaywall
