import React from 'react'
import { connect } from 'react-redux'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import { getInsightTrendTagByDate } from './utils'
import styles from './Insights.module.scss'

const trendTags = [getInsightTrendTagByDate(new Date())]

const insightsHref = window.location.origin.replace('app', 'insights')

const InsightAddBtn = ({ selectedTrends = [], dispatch, ...props }) => {
  const params = selectedTrends.length
    ? `currentTrends=${selectedTrends.concat(trendTags).toString()}`
    : ''

  return (
    <Button
      as='a'
      className={styles.btn}
      accent='positive'
      variant='fill'
      href={`${insightsHref}/new?${params}`}
      {...props}
    >
      <Icon className={styles.icon} type='plus-round' />
      Add insight
    </Button>
  )
}

const mapStateToProps = ({ hypedTrends: { selectedTrends = [] } }) => ({
  selectedTrends: [...selectedTrends]
})

export default connect(mapStateToProps)(InsightAddBtn)
