import React from 'react'
import cx from 'classnames'
import Aside from './Aside'
import PersonalSection from './Section/Personal'
import InsightsOnDemandSection from './Section/InsightsOnDemand'
import TrendsSection from './Section/Trends'
import { SidecarItems } from '../../ducks/SANCharts/ChartSidecar'
import styles from './index.module.scss'

const Block = ({ className, contentClassName, children }) => (
  <div className={cx(styles.block, className)}>
    <div className={cx(styles.content, contentClassName)}>{children}</div>
  </div>
)

const IndexPage = ({ ...props }) => {
  return (
    <div className={styles.wrapper}>
      {/* // TODO: Reenable this block after design changes [@vanguard | Dec 11, 2020] */}
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
          <InsightsOnDemandSection />
          <TrendsSection />
        </main>

        <Aside className={styles.aside} />

        {false && (
          <SidecarItems
          // onSlugSelect={onSlugSelect}
          // onProjectClick={onSlugSelect}
          // classes={styles}
          // showFooter={true}
          />
        )}
      </Block>
    </div>
  )
}

export default IndexPage
