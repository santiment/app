import React from 'react'
import PageLoader from '../../../components/Loader/PageLoader'
import styles from './GeneralFeed.module.scss'

const EmptyFeed = () => (
  <div className={styles.scrollable}>
    <PageLoader />
  </div>
)

export default EmptyFeed
