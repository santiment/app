import React from 'react'
import styles from './AnonBannerSticky.module.scss'

class AnonBannerSticky extends React.PureComponent {
  state = { sticky: false }

  scrollHandler = () => {
    const { bannerStaticRef } = this.props

    if (bannerStaticRef) {
      const scroll = window.scrollY || window.pageYOffset
      const bannerTop =
        bannerStaticRef.current.getBoundingClientRect().top + scroll

      const banner = {
        top: bannerTop,
        bottom: bannerTop + scroll
      }

      const viewport = {
        top: scroll,
        bottom: scroll + window.innerHeight
      }

      const isVisible =
        (banner.top <= viewport.bottom && banner.top >= viewport.top) ||
        (banner.bottom >= viewport.top && banner.bottom <= viewport.bottom)

      if (!isVisible && !this.state.sticky) {
        this.setState({ sticky: true })
      }

      if (isVisible && this.state.sticky) {
        this.setState({ sticky: false })
      }
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.scrollHandler)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.scrollHandler)
  }

  render () {
    return <div className={this.state.sticky ? styles.banner : undefined} />
  }
}

export default React.memo(AnonBannerSticky)
