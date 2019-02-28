import gql from 'graphql-tag'

export const insightsWidgetGQL = gql`
  query allInsights {
    allInsights(page: 1, pageSize: 50) {
      id
      createdAt
      title
      text
      votes {
        totalVotes
      }
      user {
        id
        username
      }
    }
  }
`
