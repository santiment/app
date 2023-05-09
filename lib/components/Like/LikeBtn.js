import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '@santiment-network/ui/Icon';
import cx from 'classnames';
import { connect } from 'react-redux';
import styles from './LikeBtn.module.css';

class LikeBtn extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      liked: this.props.liked,
      isAnimation: false,
      initialLikesNumber: this.props.likesNumber
    };

    this.onClick = () => {
      const {
        state: {
          liked
        },
        props: {
          onClick
        }
      } = this;
      this.setState({
        liked: !liked,
        isAnimation: true
      }, () => onClick(!liked));
    };

    this.onAnimationEnd = () => this.setState({
      isAnimation: false
    });
  }

  render() {
    const {
      liked,
      isAnimation,
      initialLikesNumber
    } = this.state;
    const {
      liked: savedLike,
      disabled,
      likesNumber,
      className,
      useProps,
      align
    } = this.props;
    const amount = useProps ? likesNumber : likesNumber + liked - savedLike;
    return /*#__PURE__*/React.createElement("button", {
      className: cx({
        [styles.wrapper]: true,
        [`${styles[align]}`]: true,
        [styles.active]: !disabled,
        [styles.disabled]: disabled,
        [styles.liked]: useProps ? savedLike : liked
      }, className),
      onClick: disabled ? undefined : this.onClick,
      onAnimationEnd: this.onAnimationEnd
    }, /*#__PURE__*/React.createElement(Icon, {
      className: cx(styles.icon, isAnimation && styles.animated),
      type: "like"
    }), /*#__PURE__*/React.createElement("span", {
      className: styles.text,
      style: {
        '--digits-number': `${initialLikesNumber.toString().length}`
      }
    }, amount));
  }

}

LikeBtn.propTypes = {
  liked: PropTypes.bool,
  disabled: PropTypes.bool,
  likesNumber: PropTypes.number,
  onClick: PropTypes.func,
  useProps: PropTypes.bool,
  align: PropTypes.oneOf(['right', 'left'])
};
LikeBtn.defaultProps = {
  liked: false,
  likesNumber: 0,
  initialLikesNumber: 0,
  disabled: false,
  onClick: () => {},
  useProps: false,
  align: 'right'
};

const mapStateToProps = ({
  user: {
    data
  }
}, props) => {
  const hasUser = data && !!data.id;
  return {
    disabled: props.disabled || !hasUser
  };
};

export default connect(mapStateToProps)(LikeBtn);