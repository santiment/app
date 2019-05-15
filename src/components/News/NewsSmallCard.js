import React from 'react'
import { dateDifferenceInWords } from '../../utils/dates'
import MultilineText from '../MultilineText/MultilineText'
import styles from './NewsSmallCard.module.scss'

const NewsSmallCard = ({ title, description, sourceName, url, datetime }) => {
  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className={styles.news}
    >
      <div className={styles.title}>
        <MultilineText id={'NewsSmallCardTitle'} maxLines={2} text={title} />
      </div>
      <div>
        <span className={styles.date}>
          {dateDifferenceInWords({ from: new Date(datetime) })}
        </span>
        <span className={styles.sourceName}>{sourceName}</span>
      </div>
      <div className={styles.description}>
        <MultilineText
          id='NewsSmallCardDescription'
          maxLines={2}
          text={description}
        />
      </div>
    </a>
  )
}

export default NewsSmallCard
