import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useMemo } from 'react'

export const projectSearchData = gql`
  fragment projectSearchData on Project {
    id
    name
    slug
    ticker
    rank
    marketcapUsd
    infrastructure
  }
`

export const PROJECT_QUERY = gql`
  query($slug: String!) {
    project: projectBySlug(slug: $slug) {
      ...projectSearchData
    }
  }
  ${projectSearchData}
`

export const ALL_PROJECTS_QUERY = gql`
  query allProjects($minVolume: Int = 0) {
    projects: allProjects(minVolume: $minVolume) {
      ...projectSearchData
    }
  }
  ${projectSearchData}
`

export const ALL_PROJECTS_SHORT_QUERY = gql`
  query allProjects($minVolume: Int = 0) {
    projects: allProjects(minVolume: $minVolume) {
      id
      slug
      ticker
      rank
    }
  }
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

export const useProjects = (gql = ALL_PROJECTS_QUERY) => {
  const query = useQuery(gql)

  return useMemo(
    () => {
      const { data, loading, error } = query
      return [
        data && data.projects ? data.projects : DEFAULT_PROJECTS,
        loading,
        error
      ]
    },
    [query]
  )
}
