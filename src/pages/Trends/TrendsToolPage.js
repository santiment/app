import React from 'react'
import TrendsSearch from '../../components/Trends/TrendsSearch'
import styles from './TrendsPage.module.scss'

const TrendsToolPage = () => (
  <div className={styles.TrendsPage + ' page'}>
    <div className={styles.header}>
      <h1>
        Explore frequently-used <br />
        words in crypto social media
      </h1>
      <TrendsSearch />
    </div>
  </div>
)

export default TrendsToolPage
