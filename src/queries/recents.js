import gql from 'graphql-tag'
import { client } from '../apollo'
import {
  generalData,
  PROJECT_RECENT_DATA_FRAGMENT
} from '../ducks/Watchlists/gql/allProjectsGQL'

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
