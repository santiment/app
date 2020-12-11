import React from 'react'
import Table from './Table'
import styles from './index.module.scss'

const Section = ({ title, children }) => (
  <div className={styles.section}>
    <h3 className={styles.title}>{title}</h3>
    {children}
  </div>
)

const Recents = () => {
  return (
    <Section title='Recents'>
      <Table
        className={styles.table}
        title='Assets'
        rightHeader='Price, 24h change'
      />
      <Table
        className={styles.table}
        title='Watchlists'
        rightHeader='Market Cap'
      />
      <Table
        className={styles.table}
        title='Screeners'
        rightHeader='Market Cap'
      />
    </Section>
  )
}

const Aside = ({ className }) => {
  return (
    <aside className={className}>
      <Recents />
    </aside>
  )
}

export default Aside
