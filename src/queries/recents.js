import gql from 'graphql-tag'
import { client } from '../apollo'
import {
  generalData,
  PROJECT_RECENT_DATA_FRAGMENT
} from '../ducks/Watchlists/gql/allProjectsGQL'
import { RECENT_TEMPLATE_QUERY } from '../ducks/Studio/Template/gql'

const RECENT_ASSET_QUERY = gql`
  query projectBySlugGQL($slug: String!) {
    projectBySlug(slug: $slug) {
      ...generalData
      ...recentProjectData
    }
  }
  ${generalData}
  ${PROJECT_RECENT_DATA_FRAGMENT}
`

export const getRecentAsset = slug =>
  client
    .query({
      query: RECENT_ASSET_QUERY,
      variables: { slug }
    })
    .then(({ data = {} }) => data.projectBySlug)

export const getRecentTemplate = id =>
  client
    .query({
      query: RECENT_TEMPLATE_QUERY,
      variables: {
        id: +id
      }
    })
    .then(({ data = {} }) => data.template)
