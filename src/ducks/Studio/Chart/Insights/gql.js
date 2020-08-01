import gql from 'graphql-tag'

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
