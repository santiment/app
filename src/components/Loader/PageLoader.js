import React from 'react'
import cx from 'classnames'
import logo from '../../assets/logo.svg'
import styles from './PageLoader.module.scss'

const PageLoader = ({ className }) => (
  <div className='page'>
    <div className={cx(styles.loader, className)}>
      <img
        src={logo}
        className={styles.loader__img}
        width='44'
        height='44'
        alt='SANbase'
      />
      Loading ...
    </div>
  </div>
)

export default PageLoader
