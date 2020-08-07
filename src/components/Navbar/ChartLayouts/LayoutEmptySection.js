import React from 'react'
import { Link } from 'react-router-dom'
import { SvgNew } from '../../Watchlists/NewWatchlistCard'
import CreateLayoutLink from './CreateLayoutLink'
import styles from './LayoutsEmptySection.module.scss'

const LayoutsEmptySection = () => (
  <div className={styles.wrapper}>
    <SvgNew />

    <span className={styles.description}>
      <Link to='/charts' className={styles.link}>
        Create
      </Link>{' '}
      your own chart layout for
    </span>
    <span>quick token analysis</span>

    <CreateLayoutLink className={styles.first} />
  </div>
)

export default LayoutsEmptySection
