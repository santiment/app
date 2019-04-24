import React from 'react'
import { Icon } from '@santiment-network/ui'
import styles from './BannerDesktop.module.scss'

class BannerDesktop extends React.PureComponent {
  state = { isHidden: false }

  componentDidMount () {
    window.addEventListener('scroll', this.props.checkVisibility)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.props.checkVisibility)
  }

  hideBanner = () => {
    this.setState({ isHidden: true })
    window.removeEventListener('scroll', this.props.checkVisibility)
  }

  render () {
    const { isHidden } = this.state
    const { children, isVisible } = this.props
    if (isHidden || isVisible) return null
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
