import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const projectSearchData = gql`
  fragment projectSearchData on Project {
    id
    name
    slug
    ticker
    rank
  }
`

export const ALL_PROJECTS_QUERY = gql`
  query allProjects($minVolume: Int = 0) {
    projects: allProjects(minVolume: $minVolume) {
      ...projectSearchData
    }
  }
  ${projectSearchData}
`

const DEFAULT_PROJECTS = []

export default graphql(ALL_PROJECTS_QUERY, {
  props: ({
    data: { projects: allProjects = DEFAULT_PROJECTS, loading, error }
  }) => {
    return {
      allProjects,
      loading,
      error
    }
  }
})
