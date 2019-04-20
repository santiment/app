import React from 'react'
import { Icon } from '@santiment-network/ui'
import Image from '../../assets/sticky_banner_icon.png'
import SubscriptionForm from '../SubscriptionForm/SubscriptionForm'
import styles from './BannerDesktop.module.scss'

class BannerDesktop extends React.PureComponent {
  state = { sticky: true, isHidden: false }

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
    if (isHidden || !sticky) return null
    return (
      <div className={styles.banner}>
        <div className={styles.banner__imageWrapper}>
          <img src={Image} alt='banner logo' className={styles.banner__image} />
        </div>
        <div className={styles.banner__contentWrapper}>
          <div className={styles.banner__textWrapper}>
            <h2 className={styles.banner__title}>Want more crypto insights?</h2>
            <p className={styles.banner__description}>
              Read daily analysis of top emerging words/stories
            </p>
          </div>
          <SubscriptionForm hideCheckbox={true} />
        </div>
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
