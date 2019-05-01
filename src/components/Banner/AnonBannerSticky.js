import React from 'react'
import BannerDesktop from './BannerDesktop'

const BOTTOM_BANNER_EXTRA_VIEWPORT = 100

class AnonBannerSticky extends React.PureComponent {
  state = { isVisible: false }

  componentDidMount () {
    this.viewportHeight = window.innerHeight
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.bannerStaticRef && this.props.bannerStaticRef) {
      this.checkVisibility()
    }
  }

  checkVisibility = () => {
    const { bannerStaticRef } = this.props

    if (bannerStaticRef) {
      const bannerTop =
        bannerStaticRef.getBoundingClientRect().top +
        BOTTOM_BANNER_EXTRA_VIEWPORT
      const isVisible = bannerTop <= this.viewportHeight
      this.setState({ isVisible })
    }
  }

  render () {
    return (
      <BannerDesktop
        isVisible={this.state.isVisible}
        checkVisibility={this.checkVisibility}
      />
    )
  }
}

export default AnonBannerSticky
