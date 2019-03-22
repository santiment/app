import React, { Component } from 'react'
import cx from 'classnames'
import styles from './SlideEntry.module.scss'

class SlideEntry extends Component {
  constructor (props) {
    super(props)

    this.state = {
      entered: false
    }

    setTimeout(() => {
      this.setState({ entered: true })
    }, props.timeout)
  }

  render () {
    const { children, leaving } = this.props
    const { entered } = this.state

    return (
      <div
        className={cx({
          [styles.slideIn]: !entered,
          [styles.slideOut]: leaving
        })}
      >
        {children}
      </div>
    )
  }
}

SlideEntry.defaultProps = {
  timeout: 300
}

export default SlideEntry
