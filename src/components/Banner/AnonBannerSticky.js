import React from 'react'
import { DesktopOnly, MobileOnly } from './../Responsive'
import BannerDesktop from './BannerDesktop'
import BannerMobile from './BannerMobile'

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
      <>
        <DesktopOnly>
          <BannerDesktop
            isVisible={this.state.isVisible}
            checkVisibility={this.checkVisibility}
          />
        </DesktopOnly>
        <MobileOnly>{!this.state.isVisible && <BannerMobile />}</MobileOnly>
      </>
    )
  }
}

export default AnonBannerSticky
