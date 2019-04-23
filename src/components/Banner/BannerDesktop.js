import React from 'react'
import { Icon } from '@santiment-network/ui'
import styles from './BannerDesktop.module.scss'

class BannerDesktop extends React.PureComponent {
  state = { sticky: true, isHidden: false }

  componentDidMount () {
    this.checkVisibility()
    window.addEventListener('scroll', this.props.checkVisibility)
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevProps.isVisible !== this.props.isVisible) {
      this.checkVisibility()
    }
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.props.checkVisibility)
  }

  hideBanner = () => {
    this.setState({ isHidden: true })
    window.removeEventListener('scroll', this.props.checkVisibility)
  }

  checkVisibility = () => {
    const { isVisible } = this.props

    if (!isVisible && !this.state.sticky) {
      this.setState({ sticky: true })
    }

    if (isVisible && this.state.sticky) {
      this.setState({ sticky: false })
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
