import { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const ARRAY = []
const OBJECT = {}

export const projectBaseData = gql`
  fragment projectBaseData on Project {
    id
    name
    slug
    ticker
  }
`

export const PROJECTS_QUERY = gql`
  query {
    projects: allProjects(minVolume: 0) {
      ...projectBaseData
    }
  }
  ${projectBaseData}
`

export function useProjects (query = PROJECTS_QUERY) {
  const { data, loading } = useQuery(query)

  return useMemo(
    () => ({
      projects: (data && data.projects) || ARRAY,
      isLoading: loading
    }),
    [data]
  )
}

const SlugProjectInfoCache = new Map()
const TickerProjectInfoCache = new Map()
export function getProjectInfo (projects, slug, ticker) {
  const normalizedSlug = (slug || '').toLowerCase()
  const normalizedTicker = (ticker || '').toUpperCase()
  const project =
    SlugProjectInfoCache.get(normalizedSlug) ||
    TickerProjectInfoCache.get(normalizedTicker)

  if (project || SlugProjectInfoCache.size) return project

  for (let i = projects.length - 1; i > -1; i--) {
    const project = projects[i]
    SlugProjectInfoCache.set(project.slug.toLowerCase(), project)
    TickerProjectInfoCache.set(project.ticker.toUpperCase(), project)
  }

  return (
    SlugProjectInfoCache.get(normalizedSlug) ||
    TickerProjectInfoCache.get(normalizedTicker)
  )
}

export function useProjectInfo (slug, ticker) {
  const { projects, isLoading } = useProjects()

  return useMemo(
    () => ({
      project: isLoading ? OBJECT : getProjectInfo(projects, slug, ticker),
      isLoading
    }),
    [projects, isLoading]
  )
}
