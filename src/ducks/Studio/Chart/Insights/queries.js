import gql from 'graphql-tag'
import { client } from '../../../../apollo'

export const INSIGHT_TEXT_QUERY = gql`
  query insight($id: Int!) {
    insight(id: $id) {
      id
      text
    }
  }
`

export function getInsightText (id) {
  return client
    .query({ query: INSIGHT_TEXT_QUERY, variables: { id: +id } })
    .then(({ data: { insight } }) => insight.text)
}
