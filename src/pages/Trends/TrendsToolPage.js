import React from 'react'
import TrendsSearch from '../../components/Trends/TrendsSearch'
import styles from './TrendsPage.module.scss'

const TrendsToolPage = () => (
  <div className={styles.TrendsPage + ' page'}>
    <div className={styles.title}>
      <h1>
        Explore the social volume <br />
        of ANY word on crypto social media
      </h1>
      <TrendsSearch />
    </div>
  </div>
)

export default TrendsToolPage
