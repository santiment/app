import gql from 'graphql-tag'
import { client } from '../../apollo'

export const SHORTHAND_OFFSET = '/charts/'.length
export const SHORTHAND_POSTFIX = '_sCl'
export const SHORTHAND_RIGHT_INDEX = -SHORTHAND_POSTFIX.length
export const buildChartShortPath = shortUrl =>
  `/charts/${shortUrl}${SHORTHAND_POSTFIX}`

const UPDATE_SHORT_URL_MUTATION = gql`
  mutation updateShortUrl($shortUrl: String!, $fullUrl: String!) {
    updateShortUrl(shortUrl: $shortUrl, fullUrl: $fullUrl) {
      shortUrl
    }
  }
`
export const updateShortUrl = (shortUrl, fullUrl) =>
  client.mutate({
    mutation: UPDATE_SHORT_URL_MUTATION,
    variables: {
      shortUrl,
      fullUrl
    }
  })
