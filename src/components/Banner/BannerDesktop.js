import React from 'react'
import { Icon } from '@santiment-network/ui'
import styles from './BannerDesktop.module.scss'

class BannerDesktop extends React.Component {
  state = { sticky: false, isHidden: false }

  componentDidMount () {
    this.viewportHeight = window.innerHeight
    this.checkVisibility()
    window.addEventListener('scroll', this.checkVisibility)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.checkVisibility)
  }

  hideBanner = () => {
    this.setState({ isHidden: true })
    window.removeEventListener('scroll', this.checkVisibility)
  }

  checkVisibility = () => {
    const { bannerStaticRef } = this.props

    if (bannerStaticRef) {
      const bannerTop = bannerStaticRef.current.getBoundingClientRect().top
      const isVisible = bannerTop <= this.viewportHeight && bannerTop >= 0

      if (!isVisible && !this.state.sticky) {
        this.setState({ sticky: true })
      }

      if (isVisible && this.state.sticky) {
        this.setState({ sticky: false })
      }
    }
  }

  render () {
    const { sticky, isHidden } = this.state
    const { children } = this.props
    if (isHidden || !sticky) return null
    return (
      <div className={styles.banner}>
        {children}
        <Icon
          onClick={this.hideBanner}
          type='close'
          className={styles.banner__closeIcon}
        />
      </div>
    )
  }
}

export default BannerDesktop
