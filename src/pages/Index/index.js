import React from 'react'
import cx from 'classnames'
import Aside from './Aside'
import PersonalSection, {
  KEYSTACKHOLDERS_ANCHOR,
  SHEETS_ANCHOR
} from './Section/Personal'
import InsightsOnDemandSection from './Section/InsightsOnDemand'
import TrendsSection from './Section/Trends'
import Footer from '../ProMetrics/ProMetricsFooter/CommonFooter'
import EventBanner from '../../components/EventBanner'
import ResearchesBlock from '../../components/ResearchesBlock'
import KeystackeholdersEvents from './Section/KeystackeholdersEvents/KeystackeholdersEvents'
import { useAnchorLoading } from './hooks'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import styles from './index.module.scss'

const Block = ({ className, contentClassName, children }) => (
  <div className={cx(styles.block, className)}>
    <div className={cx(styles.content, contentClassName)}>{children}</div>
  </div>
)

const SCROLLABLE_ANCHORS = [SHEETS_ANCHOR, KEYSTACKHOLDERS_ANCHOR]

const IndexPage = () => {
  const { loading } = useUserSubscriptionStatus()

  useAnchorLoading([loading], SCROLLABLE_ANCHORS)

  return (
    <div className={styles.wrapper}>
      <EventBanner />
      {/* // TODO: Reenable this block after design changes in figma [@vanguard | Dec 11, 2020] */}
      {/* <Block>
        <h1 className={styles.title}>Welcome to Sanbase</h1>
        <h4 className={styles.subtitle}>
          You can search for this and that using form below
        </h4>
      </Block> */}
      <Block
        className={styles.block_main}
        contentClassName={styles.content_main}
      >
        <main className={styles.main}>
          <PersonalSection />
          <KeystackeholdersEvents />
          <TrendsSection />
          <InsightsOnDemandSection />
        </main>

        <Aside className={styles.aside} />
      </Block>

      <ResearchesBlock />
      <Footer />
    </div>
  )
}

export default IndexPage
