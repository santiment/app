import gql from 'graphql-tag'

export const NEWS_QUERY = gql`
  query news($tag: String!, $from: DateTime!, $to: DateTime!, $size: Int) {
    news: news(tag: $tag, from: $from, to: $to, size: $size) {
      datetime
      title
      description
      url
      sourceName
    }
  }
`
