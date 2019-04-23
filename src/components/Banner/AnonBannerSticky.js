import React from 'react'
import { DesktopOnly, MobileOnly } from './../Responsive'
import BannerDesktop from './BannerDesktop'
import BannerMobile from './BannerMobile'
import Image from '../../assets/sticky_banner_icon.png'
import SubscriptionForm from '../SubscriptionForm/SubscriptionForm'
import styles from './BannerDesktop.module.scss'

class AnonBannerSticky extends React.PureComponent {
  state = { isVisible: true }

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
      const bannerTop = bannerStaticRef.getBoundingClientRect().top
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
            <BannerContent />
          </BannerDesktop>
        </DesktopOnly>
        {!this.state.isVisible && (
          <MobileOnly>
            <BannerMobile>
              <BannerContent />
            </BannerMobile>
          </MobileOnly>
        )}
      </>
    )
  }
}

const BannerContent = () => {
  return (
    <>
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
        <SubscriptionForm hideCheckbox />
      </div>
    </>
  )
}

export default AnonBannerSticky
