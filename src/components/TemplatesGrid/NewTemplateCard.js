import React from 'react'
import { Link } from 'react-router-dom'
import { SvgNew } from '../Watchlists/NewWatchlistCard'
import styles from './NewTemplateCard.module.scss'

const NewTemplateCard = () => {
  return (
    <Link className={styles.create} to='/'>
      <SvgNew className={styles.svg} />
      Start researching
    </Link>
  )
}

export default NewTemplateCard
