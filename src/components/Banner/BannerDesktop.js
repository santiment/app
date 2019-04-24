import React from 'react'
import throttle from 'lodash.throttle'
import StickyBannerContent from './StickyBannerContent'

class BannerDesktop extends React.PureComponent {
  state = { isHidden: false }

  componentDidMount () {
    window.addEventListener('scroll', this.throttledCheckVisibility)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.throttledCheckVisibility)
  }

  throttledCheckVisibility = throttle(this.props.checkVisibility, 150)

  hideBanner = () => {
    this.setState({ isHidden: true })
    window.removeEventListener('scroll', this.throttledCheckVisibility)
  }

  render () {
    const { isHidden } = this.state
    const { isVisible } = this.props
    if (isHidden || isVisible) return null
    return <StickyBannerContent onClose={this.hideBanner} />
  }
}

export default BannerDesktop
