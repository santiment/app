import React from 'react'
import { graphql } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import InsightsEditor from './InsightsEditor'
import { INSIGHT_BY_ID_QUERY } from './InsightsGQL'

const InsightPage = ({ data, ...props }) => {
  console.log(props)

  if (!data) {
    return <Redirect to='/insights-sonar' />
  }

  console.log(data.insight)

  if (data.loading) return null

  return (
    <div>
      <InsightsEditor {...data.insight} />
    </div>
  )
}

export default graphql(INSIGHT_BY_ID_QUERY, {
  skip: ({
    match: {
      params: { id }
    }
  }) => !Number.isInteger(+id),
  options: ({
    match: {
      params: { id }
    }
  }) => ({
    variables: {
      id: +id
    }
  })
})(InsightPage)
