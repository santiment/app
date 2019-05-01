import React from 'react'
import { Link } from 'react-router-dom'
import { Panel, Icon } from '@santiment-network/ui'
import cx from 'classnames'
import MultilineText from '../MultilineText/MultilineText'
import InsightDraftCardDeleteBtn from './InsightDraftCardDeleteBtn'
import { getSEOLinkFromIdAndTitle } from '../../pages/Insights/utils'
import { dateDifferenceInWords } from '../../utils/dates'
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
      <Link
        to={`/insights/read/${getSEOLinkFromIdAndTitle(id, title)}`}
        className={styles.title}
      >
        {title}
      </Link>
      <p className={styles.text}>
        <MultilineText
          maxLines={2}
          id='insightCardText'
          text={getInsightContent(text)}
        />
      </p>
      <h4 className={styles.date}>
        Edited {dateDifferenceInWords({ from: new Date(updatedAt) })}
      </h4>
      <InsightDraftCardDeleteBtn onDeleteClick={onDeleteClick} />
      <Link to={`/insights/edit/${id}`}>
        <Icon type='edit' className={styles.edit} />
      </Link>
    </Panel>
  )
}

// defautl props

export default InsightDraftCard
