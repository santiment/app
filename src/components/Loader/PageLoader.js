import React from 'react'
import logo from '../../assets/logo.svg'
import styles from './PageLoader.module.scss'

const PageLoader = () => (
  <div className='page'>
    <div className={styles.loader}>
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
