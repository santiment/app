import React from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import { useIsInFollowers, useNotificationToggle } from './hooks';
import DarkTooltip from '../Tooltip/DarkTooltip';
import styles from './NotificationBellBtn.module.css';

const NotificationBellBtn = ({
  targetUserId,
  className
}) => {
  const {
    isNotificationDisabled,
    toggle,
    disabledBtn
  } = useNotificationToggle(targetUserId);
  const isInFollowersList = useIsInFollowers(targetUserId);

  if (!isInFollowersList) {
    return null;
  }

  return /*#__PURE__*/React.createElement(DarkTooltip, {
    position: "top",
    align: "center",
    on: "hover",
    className: styles.tooltip,
    trigger: /*#__PURE__*/React.createElement(Icon, {
      type: isNotificationDisabled ? 'bell-off' : 'bell',
      onClick: () => !disabledBtn && toggle(targetUserId, !isNotificationDisabled),
      className: cx(styles.icon, className, disabledBtn && styles.icon__disabled)
    })
  }, isNotificationDisabled ? 'Enable notifications' : 'Disable notifications');
};

export default NotificationBellBtn;