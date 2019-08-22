import React from 'react'
import cx from 'classnames'
import logo from '../../assets/logo.svg'
import styles from './PageLoader.module.scss'

const PageLoader = ({
  className,
  text = 'Loading',
  containerClass = 'page'
}) => (
  <div className={containerClass}>
    <div className={cx(styles.loader, className)}>
      <img
        src={logo}
        className={styles.loader__img}
        width='44'
        height='44'
        alt='SANbase'
      />
      {text}...
    </div>
  </div>
)

export default PageLoader
