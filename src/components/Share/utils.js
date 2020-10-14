import gql from 'graphql-tag'
import { client } from '../../apollo'

const SHORT_URL_MUTATION = gql`
  mutation createShortUrl($fullUrl: String!) {
    ShortUrl: createShortUrl(fullUrl: $fullUrl) {
      url: shortUrl
    }
  }
`

const FULL_URL_QUERY = gql`
  query getFullUrl($shortUrl: String!) {
    ShortUrl: getFullUrl(shortUrl: $shortUrl) {
      url: fullUrl
    }
  }
`

const urlExtractor = ({ data }) => data.ShortUrl.url

export const getShortUrl = fullUrl =>
  client
    .mutate({
      mutation: SHORT_URL_MUTATION,
      variables: {
        fullUrl
      }
    })
    .then(urlExtractor)

export const getFullUrl = shortUrl =>
  client
    .query({
      query: FULL_URL_QUERY,
      variables: {
        shortUrl
      }
    })
    .then(urlExtractor)
