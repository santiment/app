import gql from 'graphql-tag'

export const ACTIVE_WIDGETS_QUERY = gql`
  query {
    activeWidgets {
      title
      description
      videoLink
      imageLink
      createdAt
    }
  }
`
