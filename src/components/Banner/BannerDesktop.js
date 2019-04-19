import React from 'react'
import { Icon } from '@santiment-network/ui'
import Image from '../../assets/sticky_banner_icon.png'
import styles from './BannerDesktop.module.scss'
import SubscriptionForm from '../SubscriptionForm/SubscriptionForm'

class BannerDesktop extends React.PureComponent {
  state = { sticky: true, isHidden: false }

  componentDidMount () {
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
      const scroll = window.scrollY || window.pageYOffset
      const bannerTop =
        bannerStaticRef.current.getBoundingClientRect().top + scroll

      const banner = {
        top: bannerTop,
        bottom: bannerTop + window.innerHeight
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

  render () {
    const { sticky, isHidden } = this.state
    if (isHidden || !sticky) return null
    return (
      <div className={styles.container}>
        <div className={styles.banner}>
          <div className={styles.banner__left}>
            <div className={styles.banner__imageWrapper}>
              <img
                src={Image}
                alt='banner logo'
                className={styles.banner__image}
              />
            </div>
            <div>
              <h2 className={styles.banner__title}>
                Want more crypto insights?
              </h2>
              <p className={styles.banner__description}>
                Read daily analysis of top emerging words/stories on crypto
                social media, be the first to spot
              </p>
            </div>
          </div>
          <div className={styles.banner__right}>
            <SubscriptionForm />
          </div>
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
