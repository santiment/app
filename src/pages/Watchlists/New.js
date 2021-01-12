import React from 'react'
import Page from '../../ducks/Page'
import styles from './New.module.scss'

const Section = ({ title, children }) => {
  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.section}>{children}</div>
    </>
  )
}

const Watchlists = ({ isDesktop }) => {
  return (
    <Page
      title={isDesktop ? null : 'Watchlists'}
      isContained
      isWithPadding={false}
    >
      <Section title='Explore watchlists'>123</Section>
      <Section title='My watchlists'>123</Section>
      <Section title='My screeners'>123</Section>
    </Page>
  )
}

export default Watchlists
