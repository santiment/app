import gql from 'graphql-tag'

export const WORD_CLOUD_QUERY = gql`
  query wordContext(
    $from: DateTime!
    $to: DateTime!
    $word: String!
    $size: Int!
  ) {
    wordContext(word: $word, source: ALL, size: $size, from: $from, to: $to) {
      word
      score
    }
  }
`
