import React, { Component } from 'react'
import * as Sentry from '@sentry/react'
import ErrorContent from './ErrorContent'

class ErrorBoundary extends Component {
  state = {
    error: null
  }

  componentDidCatch (error, errorInfo) {
    this.setState({ error })
    Sentry.captureException(error, { extra: errorInfo })
    console.log(Sentry.lastEventId())
  }

  render () {
    if (this.state.error) {
      return <ErrorContent />
    } else {
      return this.props.children
    }
  }
}

export default ErrorBoundary
