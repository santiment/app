import React from 'react'
import cx from 'classnames'
import { HashLink } from 'react-router-hash-link'
import Aside from './Aside'
import Navigation from './Navigation'
import { CABINET_ANCHOR, VIDEOS_ANCHOR } from './Navigation/anchors'
import TrendsSection from './Section/Trends'
import Cabinet from './Section/Personal/Cabinet'
import WebinarWidget from './Section/Personal/Cabinet/WebinarWidget/WebinarWidget'
import Footer from '../ProMetrics/ProMetricsFooter/CommonFooter'
import EventBanner from '../../components/EventBanner'
import ResearchesBlock from '../../components/ResearchesBlock'
import KeystackeholdersEvents from './Section/KeystackeholdersEvents/KeystackeholdersEvents'
import styles from './index.module.scss'

const Block = ({ className, contentClassName, children }) => (
  <div className={cx(styles.block, className)}>
    <div className={cx(styles.content, contentClassName)}>{children}</div>
  </div>
)

const Section = ({ title, link, children }) => (
  <div id={link}>
    <HashLink to={`#${link}`} className={styles.anchor}>
      {title}
    </HashLink>
    <div className={styles.sectionContent}>{children}</div>
  </div>
)

const IndexPage = () => (
  <div className={styles.wrapper}>
    <EventBanner />
    <Block className={styles.block_main} contentClassName={styles.content_main}>
      <Navigation className={styles.navigation} />
      <main className={styles.main}>
        <KeystackeholdersEvents />
        {/* <TrendsSection /> */}
        <Section title='Video insights' link={VIDEOS_ANCHOR}>
          <WebinarWidget />
        </Section>
        <Section title='Cabinet' link={CABINET_ANCHOR}>
          <Cabinet />
        </Section>
      </main>

      <Aside className={styles.aside} />
    </Block>

    <ResearchesBlock />
    <Footer />
  </div>
)

export default IndexPage
