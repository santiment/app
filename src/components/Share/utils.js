import gql from 'graphql-tag'
import { client } from '../../apollo'
import { history } from '../../redux'

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

export const SHARE_PATH = '/s/'

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

export function redirectSharedLink () {
  const { pathname } = window.location

  if (pathname.startsWith(SHARE_PATH)) {
    const hashStartIndex = SHARE_PATH.length
    let hashEndIndex = hashStartIndex + 1

    loop: for (; hashEndIndex < pathname.length; hashEndIndex++) {
      switch (pathname[hashEndIndex]) {
        case '/':
        case '?':
          hashEndIndex--
          break loop
        default:
          continue
      }
    }

    getFullUrl(pathname.slice(hashStartIndex, hashEndIndex))
      .then(fullPath => history.push(fullPath))
      .catch(console.error)
  }
}
