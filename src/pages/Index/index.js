import React from 'react'
import cx from 'classnames'
import Aside from './Aside'
import { SidecarItems } from '../../ducks/SANCharts/ChartSidecar'
import styles from './index.module.scss'

const Section = ({ className, contentClassName, children }) => (
  <section className={cx(styles.section, className)}>
    <div className={cx(styles.content, contentClassName)}>{children}</div>
  </section>
)

const IndexPage = ({ ...props }) => {
  return (
    <div className={styles.wrapper}>
      <Section>
        <h1 className={styles.title}>Welcome to Sanbase</h1>
        <h4 className={styles.subtitle}>
          You can search for this and that using form below
        </h4>
      </Section>
      <Section
        className={styles.section_main}
        contentClassName={styles.content_main}
      >
        <main className={styles.main}>123</main>

        <Aside className={styles.aside} />

        {false && (
          <SidecarItems
          // onSlugSelect={onSlugSelect}
          // onProjectClick={onSlugSelect}
          // classes={styles}
          // showFooter={true}
          />
        )}
      </Section>
    </div>
  )
}

export default IndexPage
