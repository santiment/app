import React from 'react'
import MoreInfoLink from '../../../components/MoreInfoLink/MoreInfoLink'
import { Description } from '../../dataHub/metrics/descriptions'
import { AcademyLinks } from '../../dataHub/metrics/links'

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

  return description.replace(PROJECT_TICKER_REG, project.ticker || 'project')
}

const MetricDescription = ({ metric: { key }, project }) => {
  const description = Description[key]
  const linkItem = AcademyLinks[key]

  return (
    <>
      {getPrepared(description, project)}
      {linkItem && <MoreInfoLink href={linkItem.link} />}
    </>
  )
}

export default MetricDescription
