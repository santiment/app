import React from 'react'
import cx from 'classnames'
import { dateDifferenceInWords } from '../../utils/dates'
import MultilineText from '../MultilineText/MultilineText'
import styles from './NewsSmallCard.module.scss'

const NewsSmallCard = ({ title, description, sourceName, url, datetime }) => {
  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className={cx(styles.link)}
    >
      <div className={styles.news}>
        <div className={styles.news__title}>
          <MultilineText id={'NewsSmallCardTitle'} maxLines={2} text={title} />
        </div>
        <div>
          <span className={styles.news__date}>
            {dateDifferenceInWords({ from: new Date(datetime) })}
          </span>
          <span className={styles.news__sourceName}>{sourceName}</span>
        </div>
        <div className={styles.news__description}>
          <MultilineText
            id='NewsSmallCardDescription'
            maxLines={2}
            text={description}
          />
        </div>
      </div>
    </a>
  )
}

export default NewsSmallCard
