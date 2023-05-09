function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import cx from 'classnames';
import Dialog from '@santiment-network/ui/Dialog';
import Button from '@santiment-network/ui/Button';
import Toggle from '@santiment-network/ui/Toggle';
import Notification from '@santiment-network/ui/Notification';
import Trigger from './Trigger';
import EmailImage from './EmailImage';
import { useUpdateWatchlist } from '../../gql/list/mutations';
import EmailSetting from '../../../../pages/Account/EmailSetting';
import { useUserSettings } from '../../../../stores/user/settings';
import { notifyMonitoring } from '../../Widgets/TopPanel/notifications';
import styles from './index.module.css';
const NOTIFICATION = {
  connected: {
    title: 'You have email address connected',
    description: 'You’ll receive reports to the email address connected with your account',
    className: styles.notification,
    variant: 'info',
    classes: {
      title: styles.notificationTitle,
      conent: styles.notificationDescription
    }
  },
  notConnected: {
    title: 'Please connect your email address',
    description: 'We’ve noticed that you’re logged in with Metamask, please enter an email address which will be connected to your account',
    className: cx(styles.notification, styles.notificationWarning),
    variant: 'warning',
    classes: {
      title: styles.notificationTitle,
      content: styles.notificationDescription
    }
  }
};
const STATUSES = {
  loading: 'Email is verifying',
  success: 'Email is correct',
  error: 'Error during typing email'
};

const WeeklyReport = ({
  trigger,
  watchlist
}) => {
  const {
    isMonitored: initialIsMonitored,
    name
  } = watchlist;
  const {
    settings: {
      isEmailConnected
    }
  } = useUserSettings();
  const [isShown, setIsShown] = useState(false);
  const [isMonitored, toggleIsMonitored] = useState(initialIsMonitored);
  const [emailStatus, toggleEmailStatus] = useState();
  const [updateWatchlist] = useUpdateWatchlist();

  const close = () => {
    setIsShown(false);
    toggleEmailStatus(null);
  };

  const open = () => {
    setIsShown(true);
    toggleIsMonitored(initialIsMonitored);
  };

  const onSave = () => {
    if (isEmailConnected && initialIsMonitored !== isMonitored) {
      updateWatchlist(watchlist, {
        isMonitored
      }).then(state => {
        toggleIsMonitored(state.isMonitored);
      });
    }

    if (!isEmailConnected && emailStatus === STATUSES.success) {
      updateWatchlist(watchlist, {
        isMonitored
      }).then(state => toggleIsMonitored(state.isMonitored));
    }

    notifyMonitoring({
      name,
      isMonitored,
      type: 'watchlist'
    });
    close();
  };

  return /*#__PURE__*/React.createElement(Dialog, {
    size: "m",
    trigger: trigger || Trigger({
      isMonitored
    }),
    onOpen: open,
    onClose: close,
    open: isShown,
    classes: {
      title: styles.header,
      dialog: styles.dialog
    }
  }, /*#__PURE__*/React.createElement(Dialog.ScrollContent, {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement(EmailImage, {
    className: styles.image
  }), /*#__PURE__*/React.createElement("h4", {
    className: styles.title
  }, "Stay in touch with the latest events"), /*#__PURE__*/React.createElement("p", {
    className: styles.description
  }, "Every Sunday, you'll receive a report to your inbox with insights from the San family and people you follow, based on your monitored watchlists."), /*#__PURE__*/React.createElement(Button, {
    variant: "flat",
    onClick: () => toggleIsMonitored(!isMonitored),
    className: cx(styles.toggleWrapper, isMonitored && styles.active)
  }, /*#__PURE__*/React.createElement(Toggle, {
    isActive: isMonitored,
    className: styles.toggle
  }), "Receive weekly report"), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.monitoredContent, !isEmailConnected && styles.monitoredContent__big, !isMonitored && styles.monitoredContent__hide)
  }, /*#__PURE__*/React.createElement(Notification, _extends({}, NOTIFICATION[isEmailConnected ? 'connected' : 'notConnected'], {
    hasCloseBtn: false
  })), /*#__PURE__*/React.createElement(EmailSetting, {
    withoutButtons: true,
    isEmailConnected: isEmailConnected,
    onChangeStatus: toggleEmailStatus,
    statuses: STATUSES
  }))), /*#__PURE__*/React.createElement(Dialog.Actions, {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(Button, {
    className: styles.approve,
    onClick: onSave,
    variant: "fill",
    accent: "positive",
    isLoading: !isEmailConnected && emailStatus === STATUSES.loading,
    disabled: isMonitored && !isEmailConnected && emailStatus === STATUSES.error
  }, "Save preferences")));
};

export default WeeklyReport;