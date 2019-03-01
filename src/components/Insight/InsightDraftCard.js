import React from 'react'
import { Link } from 'react-router-dom'
import { Panel, Icon } from '@santiment-network/ui'
import cx from 'classnames'
import moment from 'moment'
import MultilineText from '../MultilineText/MultilineText'
import styles from './InsightDraftCard.module.scss'

const getInsightContent = htmlContent => {
  let tempHTMLElement = document.createElement('div')
  tempHTMLElement.innerHTML = htmlContent
  const content = tempHTMLElement.textContent
  tempHTMLElement = null
  return content
}

const InsightDraftCard = ({
  className = '',
  id,
  title,
  text,
  updatedAt,
  onDeleteClick
}) => {
  return (
    <Panel className={cx(styles.wrapper, className)}>
      <Link to={`/insights/read/${id}`} className={styles.title}>
        {title}
      </Link>
      <p className={styles.text}>
        <MultilineText
          maxLines={2}
          id='insightCardText'
          text={getInsightContent(text)}
        />
      </p>
      <h4 className={styles.date}>Edited {moment(updatedAt).fromNow()}</h4>
      <Icon onClick={onDeleteClick} type='close' className={styles.remove} />
      <Link to={`/insights/edit/${id}`}>
        <Icon type='edit' className={styles.edit} />
      </Link>
    </Panel>
  )
}

// defautl props

export default InsightDraftCard
