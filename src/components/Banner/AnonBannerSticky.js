import React from 'react'
import throttle from 'lodash.throttle'
import StickyBannerContent from './StickyBannerContent'

const BOTTOM_BANNER_EXTRA_VIEWPORT = 100

class AnonBannerSticky extends React.PureComponent {
  state = { isVisibleStatic: true, isHiddenSticky: false }

  componentDidMount () {
    this.viewportHeight = window.innerHeight
    window.addEventListener('scroll', this.throttledCheckVisibility)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.throttledCheckVisibility)
  }

  checkVisibility = () => {
    const {
      bannerStaticRef: { current }
    } = this.props

    if (current) {
      const bannerTop =
        current.getBoundingClientRect().top + BOTTOM_BANNER_EXTRA_VIEWPORT
      const isVisibleStatic = bannerTop <= this.viewportHeight
      this.setState({ isVisibleStatic })
    }
  }

  throttledCheckVisibility = throttle(this.checkVisibility, 150)

  hideBanner = () => {
    this.setState({ isHiddenSticky: true })
    window.removeEventListener('scroll', this.throttledCheckVisibility)
  }

  render () {
    const { isVisibleStatic, isHiddenSticky } = this.state
    if (isHiddenSticky || isVisibleStatic) return null
    return <StickyBannerContent onClose={this.hideBanner} />
  }
}

export default AnonBannerSticky
