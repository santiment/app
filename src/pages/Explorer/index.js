import React from 'react'
import Footer from '../ProMetrics/ProMetricsFooter/CommonFooter'
import EventBanner from '../../components/EventBanner'
import ResearchesBlock from '../../components/ResearchesBlock'
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
    <ResearchesBlock />
    <Footer />
  </div>
)

export default ExplorerPage
