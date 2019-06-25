import React from 'react'
import EmptySection from '../EmptySection/EmptySection'
import styles from '../WatchlistPopup/WatchlistsAnon.module.scss'

const WatchlistPrivateSection = () => (
  <EmptySection imgClassName={styles.img}>
    <p className={styles.title}>This watchlist is private</p>
  </EmptySection>
)

export default WatchlistPrivateSection
