import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@santiment-network/ui'
import cx from 'classnames'
import { connect } from 'react-redux'
import styles from './LikeBtn.module.scss'

class LikeBtn extends Component {
  state = {
    liked: this.props.liked
  }

  static propTypes = {
    liked: PropTypes.bool,
    disabled: PropTypes.bool,
    likesNumber: PropTypes.number,
    onClick: PropTypes.func
  }

  static defaultProps = {
    liked: false,
    likesNumber: 0,
    disabled: false,
    onClick: () => {}
  }

  onClick = () => {
    const {
      state: { liked },
      props: { onClick }
    } = this

    this.setState({ liked: !liked }, () => {
      onClick(!liked)
    })
  }

  render () {
    const { liked } = this.state
    const { liked: savedLike, disabled, likesNumber, className } = this.props

    return (
      <div
        className={cx(styles.wrapper, className, liked && styles.liked)}
        onClick={disabled ? undefined : this.onClick}
      >
        <Icon className={styles.icon} type='like' />{' '}
        {likesNumber + liked - savedLike}
      </div>
    )
  }
}

const mapStateToProps = ({ user: { token } }) => ({
  disabled: !token
})

export default connect(mapStateToProps)(LikeBtn)
