import React, { Component } from 'react'
import {
  trackAppOpen,
  trackAppClose,
  trackPageView,
  PageType,
} from 'webkit/analytics/events/general'
import { initializeTracking, pageview } from './utils/tracking'

if (process.env.NODE_ENV === 'production') {
  initializeTracking()
}
trackAppOpen()

const withTracker = (WrappedComponent) => {
  const trackPage = (page) => {
    if (process.env.NODE_ENV === 'production') {
      pageview(page)
    }
  }

  const HOC = class extends Component {
    componentDidMount() {
      const page = this.props.location.pathname
      trackPage(page)

      trackPageView({
        url: page,
        type: getPageType(page),
      })
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname
      const nextPage = nextProps.location.pathname

      if (currentPage !== nextPage) {
        trackPage(nextPage)

        trackPageView({
          url: nextPage,
          type: getPageType(nextPage),
          sourceUrl: currentPage,
          sourceType: getPageType(currentPage),
        })
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return HOC
}

export function getPageType(pathname) {
  if (pathname === '/') return PageType.EXPLORER

  if (pathname === '/account') return PageType.ACCOUNT

  if (pathname.startsWith('/pricing')) return 'pricing'

  if (pathname.startsWith('/queries')) return 'queries'

  if (pathname.startsWith('/charts')) return PageType.CHARTS

  if (pathname.startsWith('/alerts')) return PageType.ALERTS

  if (pathname.startsWith('/profile/')) return PageType.PROFILE

  if (pathname.startsWith('/watchlist')) return PageType.WATCHLIST

  if (pathname.startsWith('/dashboards')) return PageType.DASHBOARDS

  if (pathname.startsWith('/screener/')) return PageType.SCREENER

  if (pathname.startsWith('/labs/trends/explore/')) return PageType.SOCIAL_TOOL
  if (pathname.startsWith('/labs/balance')) return PageType.HISTORICAL_BALANCE
  if (pathname.startsWith('/labs')) return PageType.LABS

  if (pathname.startsWith('/insights')) return PageType.INSIGHTS
  if (pathname.startsWith('https://insights.santiment.net')) return PageType.INSIGHTS
}

window.addEventListener('beforeunload', () => {
  trackAppClose()
})

export default withTracker
