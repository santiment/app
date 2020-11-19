import { RetryLink } from 'apollo-link-retry'

const retryLink = new RetryLink({
  attempts: (count, operation, error) => {
    const { isRetriable, maxAttempts } = operation.getContext()
    const max = maxAttempts || 15
    return !!error && count < max && isRetriable
  },
  delay: count => {
    return count * 1000 * Math.random()
  }
})

export default retryLink
