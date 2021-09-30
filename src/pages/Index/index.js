import React from 'react'
import cx from 'classnames'
import Aside from './Aside'
import Navigation from './Navigation'
import PersonalSection, {
  KEYSTACKHOLDERS_ANCHOR,
  SHEETS_ANCHOR
} from './Section/Personal'
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
      <Block
        className={styles.block_main}
        contentClassName={styles.content_main}
      >
        <Navigation className={styles.navigation} />
        <main className={styles.main}>
          <PersonalSection />
          <KeystackeholdersEvents />
          <TrendsSection />
        </main>

        <Aside className={styles.aside} />
      </Block>

      <ResearchesBlock />
      <Footer />
    </div>
  )
}

export default IndexPage
