import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import UpgradeBtn from '../UpgradeBtn/UpgradeBtn'
import styles from './PaywallBanner.module.scss'

const PaywallBanner = ({ isMobile }) => {
  if (isMobile) {
    return (
      <div className={cx(styles.wrapper, 'body-2')}>
        <h4 className='txt-m mrg-s mrg--b'>Why those data is hidden?</h4>
        <div className='mrg-m mrg--b'>
          To unlock the full potential of Santiment metrics you need to upgrade your account to PRO
        </div>
        <Link className={cx(styles.link, 'btn-1 btn--orange')} to='/pricing'>
          Upgrade
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>Why is some of the data hidden?</h4>
      <div className={styles.desc}>
        To get the full breakdown of our social metrics, upgrade your account to PRO!
      </div>
      <UpgradeBtn className={styles.button} variant='fill' />
    </div>
  )
}

export default PaywallBanner
