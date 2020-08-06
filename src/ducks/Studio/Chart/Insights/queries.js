import gql from 'graphql-tag'
import { client } from '../../../../index'

export const PROJECT_INSIGHTS_QUERY = gql`
  query insight($id: Int!) {
    insight(id: $id) {
      id
      text
    }
  }
`

export function getInsightText (id) {
  return client
    .query({ query: PROJECT_INSIGHTS_QUERY, variables: { id: +id } })
    .then(({ data: { insight } }) => insight.text)
}
