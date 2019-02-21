import React from 'react'
import { Query } from 'react-apollo'
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import { baseLocation } from './InsightsPage'
import {
  ALL_INSIGHTS_QUERY,
  INSIGHTS_BY_USERID_QUERY,
  INSIGHTS_BY_TAG_QUERY
} from './InsightsGQL'
import InsightCard from '../../components/Insight/InsightCard'

const queryByVariableMap = {
  tag: INSIGHTS_BY_TAG_QUERY,
  userId: INSIGHTS_BY_USERID_QUERY
}

const getQueryParams = (path, params) => {
  if (path === baseLocation) {
    return {
      query: ALL_INSIGHTS_QUERY
    }
  }

  const variable = Object.keys(params)[0]

  return {
    query: queryByVariableMap[variable],
    variables: {
      [variable]: params[variable]
    }
  }
}

const InsightsFeedPage = ({ match: { path, params }, ...props }) => {
  console.log(props)
  return (
    <div>
      <Query {...getQueryParams(path, params)}>
        {({ data: { insights = [] }, ...gprops }) => {
          console.log(gprops)
          return insights.map(({ id, ...insight }) => {
            return <InsightCard key={id} id={id} {...insight} />
          })
        }}
      </Query>
    </div>
  )
}

export default InsightsFeedPage
