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
    onClick: PropTypes.func,
    useProps: PropTypes.bool
  }

  static defaultProps = {
    liked: false,
    likesNumber: 0,
    disabled: false,
    onClick: () => {},
    useProps: false
  }

  onClick = () => {
    const {
      state: { liked },
      props: { onClick }
    } = this

    this.setState({ liked: !liked }, () => onClick(!liked))
  }

  render () {
    const { liked } = this.state
    const {
      liked: savedLike,
      disabled,
      likesNumber,
      className,
      info,
      useProps
    } = this.props

    return (
      <div
        className={cx(
          styles.wrapper,
          className,
          info && styles.info,
          !info && styles.active,
          (useProps ? savedLike : liked) && styles.liked
        )}
        onClick={disabled || info ? undefined : this.onClick}
      >
        <Icon className={styles.icon} type='like' />{' '}
        {useProps ? likesNumber : likesNumber + liked - savedLike}
      </div>
    )
  }
}

const mapStateToProps = ({ user: { data } }, props) => {
  const hasUser = data && !!data.id
  return {
    disabled: props.disabled || !hasUser
  }
}

export default connect(mapStateToProps)(LikeBtn)
