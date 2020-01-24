import React, { Component } from 'react'
import { initializeTracking, pageview } from './utils/tracking'

if (process.env.NODE_ENV === 'production') {
  initializeTracking()
}

const withTracker = WrappedComponent => {
  const trackPage = page => {
    if (process.env.NODE_ENV === 'production') {
      pageview(page)
    }
  }

  const HOC = class extends Component {
    componentDidMount () {
      const page = this.props.location.pathname
      trackPage(page)
    }

    componentWillReceiveProps (nextProps) {
      const currentPage = this.props.location.pathname
      const nextPage = nextProps.location.pathname

      if (currentPage !== nextPage) {
        trackPage(nextPage)
      }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }

  return HOC
}

export default withTracker
