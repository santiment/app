import React from 'react'
import cx from 'classnames'
import styles from './Loader.module.scss'

const Loader = ({ className }) => {
  return <div className={cx(styles.loader, className)}>Loading...</div>
}

export default Loader
