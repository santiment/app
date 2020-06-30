import React from 'react'
import MoreInfoLink from '../../../components/MoreInfoLink/MoreInfoLink'
import { Description } from '../../dataHub/metrics/descriptions'

const PROJECT_TICKER_REG = /\[Project Ticker\]/gi

const getPrepared = (
  description,
  project = {
    ticker: 'project'
  }
) => {
  if (!description) {
    return description
  }

  if (typeof description === 'object') {
    return description
  }

  return description.replace(PROJECT_TICKER_REG, project.ticker)
}

const MetricDescription = ({ metric: { key, moreInfoLink }, project }) => {
  const description = Description[key]

  return (
    <>
      {getPrepared(description, project)}
      {moreInfoLink && <MoreInfoLink href={moreInfoLink} />}
    </>
  )
}

export default MetricDescription
