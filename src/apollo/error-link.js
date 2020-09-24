import * as Sentry from '@sentry/react'
import { onError } from 'apollo-link-error'

const ErrorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    if (Array.isArray(graphQLErrors)) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        const errorMessage = `[GraphQL error]:
          Message: ${JSON.stringify(message)},
          Location: ${JSON.stringify(locations)},
          Path: ${JSON.stringify(path)}`
        if (process.env.NODE_ENV === 'development') {
          console.log(errorMessage)
        }
        if (message !== 'unauthorized' && !/Can't fetch/.test(message)) {
          Sentry.captureException(errorMessage)
        }
      })
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[GraphQL error]: ${JSON.stringify(graphQLErrors)}`)
      }
      Sentry.captureException(
        `[GraphQL error]: ${JSON.stringify(graphQLErrors)}`
      )
    }
  }

  if (networkError) {
    if (process.env.NODE_ENV === 'development') {
      console.log(networkError)
    }
    Sentry.captureException(`[Network error]: ${networkError}`)
  }
})

export default ErrorLink
