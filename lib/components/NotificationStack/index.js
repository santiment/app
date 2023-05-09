const _excluded = ["id", "dismissAfter", "onClose"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Notification as NotificationItem } from '@santiment-network/ui';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import * as actions from '../../actions/rootActions';
import styles from './NotificationStack.module.css';
const notifyDuration = +styles.notifyduration;

class NotificationStack extends Component {
  constructor(...args) {
    super(...args);
    this.timerHandles = {};

    this.closeNotification = id => {
      this.props.hideNotification(id);
    };
  }

  componentWillUnmount() {
    Object.keys(this.timerHandles).forEach(timerName => {
      if (this.timerHandles[timerName]) {
        clearTimeout(this.timerHandles[timerName]);
      }
    });
  }

  componentDidUpdate({
    notifications
  }) {
    if (notifications.length < this.props.notifications.length) {
      const {
        id,
        dismissAfter
      } = this.props.notifications[this.props.notifications.length - 1];
      this.timerHandles[id] = setTimeout(() => {
        this.closeNotification(id);
        this.timerHandles[id] = null;
      }, dismissAfter);
    }
  }

  render() {
    const {
      notifications
    } = this.props;
    return /*#__PURE__*/React.createElement(TransitionGroup, {
      className: styles.notificationStack
    }, notifications.map(_ref => {
      let {
        id,
        dismissAfter,
        onClose
      } = _ref,
          notification = _objectWithoutProperties(_ref, _excluded);

      return /*#__PURE__*/React.createElement(CSSTransition, {
        key: id,
        timeout: notifyDuration,
        classNames: styles
      }, /*#__PURE__*/React.createElement(NotificationItem, _extends({}, notification, {
        className: styles.notification,
        onClose: () => {
          this.closeNotification(id);

          if (onClose) {
            onClose();
          }
        }
      })));
    }));
  }

}

const mapStateToProps = ({
  notification
}) => ({
  notifications: notification.notifications
});

const mapDispatchToProps = dispatch => bindActionCreators({
  hideNotification: actions.hideNotification
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NotificationStack);