import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import UpgradeBtn from '../UpgradeBtn/UpgradeBtn'
import styles from './UpgradePaywall.module.scss'

const UpgradePaywall = () => (
  <div className={styles.wrapper}>
    <div className={styles.top}>
      <h4 className={styles.slogan}>Go PRO and get more data</h4>
      <UpgradeBtn loginRequired={false} variant='fill'>
        Upgrade
      </UpgradeBtn>
    </div>
  </div>
)

const UpgradeItem = ({ iconType, text }) => (
  <li className={styles.item}>
    <span>{text}</span>
  </li>
)

export default UpgradePaywall
