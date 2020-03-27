import gql from 'graphql-tag'

export const PROJECT_ICON_QUERY = gql`
  query projectIcon($slug: String!) {
    project: projectBySlug(slug: $slug) {
      logoUrl
      darkLogoUrl
      slug
    }
  }
`
