import React from 'react'
import EventBanner from '../../components/EventBanner'
import Explorer from './Explorer'
import Widgets from './Widgets'
import styles from './index.module.scss'

const ExplorerPage = () => (
  <div className={styles.wrapper}>
    <EventBanner />
    <main className={styles.content}>
        <div className={styles.leftcol}>
            <Explorer />
        </div>
        <div className={styles.rightcol}>
            <Widgets />
        </div>
    </main>
  </div>
)

export default ExplorerPage
