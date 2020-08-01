import React, { useMemo, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Point from './Point'
import styles from './index.module.scss'

export const PROJECT_INSIGHTS_QUERY = gql`
  query allInsights($ticker: String!) {
    insights: allInsights(tags: [$ticker]) {
      id
      title
      publishedAt
      user {
        id
        username
        avatarUrl
      }
    }
  }
`

const Insights = ({ ticker, ...props }) => {
  const { data } = useQuery(PROJECT_INSIGHTS_QUERY, {
    variables: {
      ticker
    }
  })
  const insights = useMemo(() => (data ? data.insights : []), [data])

  useEffect(
    () => {
      console.log('insights', ticker)
      console.log(insights)
    },
    [insights]
  )

  return (
    <div className={styles.wrapper}>
      <Point />
    </div>
  )
}

export default Insights
