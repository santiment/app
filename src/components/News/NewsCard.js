import React from 'react'
import { Panel } from '@santiment-network/ui'
import { dateDifferenceInWords } from '../../utils/dates'
import MultilineText from '../MultilineText/MultilineText'
import styles from './NewsCard.module.scss'

const NewsCard = ({
  title,
  description,
  sourceName,
  url,
  datetime,
  className = ''
}) => {
  return (
    <div className={className}>
      <a
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        className={styles.link}
      >
        <Panel className={styles.news}>
          <div>
            <div className={styles.news__title}>
              <MultilineText id={'NewsCardTitle'} maxLines={2} text={title} />
            </div>
            <div className={styles.news__description}>
              <MultilineText id='Description' maxLines={2} text={description} />
            </div>
          </div>
          <div>
            <span className={styles.news__date}>
              {dateDifferenceInWords({ from: new Date(datetime) })}
            </span>
            <span>{sourceName}</span>
          </div>
        </Panel>
      </a>
    </div>
  )
}

export default NewsCard
