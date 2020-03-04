import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const ALL_PROJECTS_QUERY = gql`
  query allProjects($minVolume: Int = 0) {
    allProjects(minVolume: $minVolume) {
      id
      name
      slug
      ticker
      rank
    }
  }
`

const DEFAULT_PROJECTS = []

export default graphql(ALL_PROJECTS_QUERY, {
  props: ({ data: { allProjects = DEFAULT_PROJECTS, loading, error } }) => {
    return {
      allProjects,
      loading,
      error
    }
  }
})
