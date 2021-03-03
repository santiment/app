import gql from 'graphql-tag'
import { client } from '../../apollo'

export const SHORT_URL_OFFSET = '/charts/'.length
export const SHORT_URL_POSTFIX = '_sCl'
export const SHORT_URL_RIGHT_INDEX = -SHORT_URL_POSTFIX.length
export const buildChartShortPath = shortUrl =>
  `/charts/${shortUrl}${SHORT_URL_POSTFIX}`

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
