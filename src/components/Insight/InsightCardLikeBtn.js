import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@santiment-network/ui'
import cx from 'classnames'
import styles from './InsightCard.module.scss'

class InsightCardLikeBtn extends Component {
  state = {
    liked: this.props.liked
  }

  static propTypes = {
    liked: PropTypes.bool,
    disabled: PropTypes.bool,
    likesNumber: PropTypes.number,
    onClick: PropTypes.func.isRequired
  }

  static defaultProps = {
    liked: false,
    likesNumber: 0,
    disabled: false
  }

  onClick = () => {
    const {
      state: { liked },
      props
    } = this

    this.setState({ liked: !liked }, () => {
      props.onClick(liked)
    })
  }

  render () {
    const { liked } = this.state
    const { disabled, likesNumber } = this.props

    return (
      <div
        className={cx(styles.stat, liked && styles.liked)}
        onClick={disabled ? undefined : this.onClick}
      >
        <Icon type='like' /> {likesNumber + liked}
      </div>
    )
  }
}

export default InsightCardLikeBtn
