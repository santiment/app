import * as Sentry from '@sentry/react';
import { onError } from 'apollo-link-error';
const IGNORED_ERRORS = ['configuration with id ', ' outside the allowed interval ', 'Accept the privacy policy to activate your account', 'The user aborted a request', 'Short url ', ' is too complex: complexity is ', 'Failed to fetch'];

const checkIsValidError = (msg = '') => !IGNORED_ERRORS.some(ignoredPart => msg.includes(ignoredPart));

const ErrorLink = onError(({
  graphQLErrors,
  networkError,
  operation
}) => {
  if (graphQLErrors) {
    if (Array.isArray(graphQLErrors)) {
      graphQLErrors.forEach(({
        message,
        locations,
        path
      }) => {
        const errorMessage = `[GraphQL error]:
          Message: ${JSON.stringify(message)},
          Location: ${JSON.stringify(locations)},
          Path: ${JSON.stringify(path)}`;

        if (process.env.NODE_ENV === 'development') {
          console.log(errorMessage);
        }

        if (message !== 'unauthorized' && !/Can't fetch/.test(message) && checkIsValidError(message)) {
          Sentry.captureException(errorMessage);
        }
      });
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[GraphQL error]: ${JSON.stringify(graphQLErrors)}`);
      }

      if (checkIsValidError(graphQLErrors.message)) {
        Sentry.captureException(`[GraphQL error]: ${JSON.stringify(graphQLErrors)}`);
      }
    }
  }

  if (networkError) {
    if (process.env.NODE_ENV === 'development') {
      console.log(networkError);
    }

    Sentry.captureException(`[Network error]: ${networkError}`);
  }
});
export default ErrorLink;