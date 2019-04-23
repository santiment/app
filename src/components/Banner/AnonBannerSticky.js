import React from 'react'
import { DesktopOnly, MobileOnly } from './../Responsive'
import BannerDesktop from './BannerDesktop'
import BannerMobile from './BannerMobile'
import StickyBannerContent from './StickyBannerContent'

class AnonBannerSticky extends React.PureComponent {
  state = { isVisible: false }

  componentDidMount () {
    this.viewportHeight = window.innerHeight
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.bannerStaticRef && this.props.bannerStaticRef) {
      this.checkVisibility()
      this.timer = setTimeout(this.checkVisibility, 50)
    }
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
  }

  checkVisibility = () => {
    const { bannerStaticRef } = this.props

    if (bannerStaticRef) {
      const bannerTop = bannerStaticRef.getBoundingClientRect().top + 100
      const isVisible = bannerTop <= this.viewportHeight && bannerTop >= 0
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
          >
            <StickyBannerContent />
          </BannerDesktop>
        </DesktopOnly>
        {!this.state.isVisible && (
          <MobileOnly>
            <BannerMobile>
              <StickyBannerContent />
            </BannerMobile>
          </MobileOnly>
        )}
      </>
    )
  }
}

export default AnonBannerSticky
