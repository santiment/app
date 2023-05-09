import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import Icon from '@santiment-network/ui/Icon';
import AlertMessage from '../../../../../../../components/Alert/AlertMessage';
import { formatChannelsTitles } from '../../../../../utils';
import styles from './Notifications.module.css';

const Notifications = ({
  description,
  status,
  invalidStepsMemo,
  isFinished,
  selected
}) => {
  const {
    values
  } = useFormikContext();
  const {
    isPublic,
    settings: {
      channel
    }
  } = values;
  const isInvalid = invalidStepsMemo.has('notifications');
  useEffect(() => {
    if (channel.length > 0 && isInvalid) {
      invalidStepsMemo.delete('notifications');
    }
  }, [channel, isInvalid]);
  let children = '';

  if (status !== 'finish' || channel.length === 0) {
    children = description || '';
  } else {
    const channels = formatChannelsTitles(channel);
    children = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: styles.wrapper
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.item
    }, isPublic ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      type: "eye",
      className: styles.icon
    }), "Public alert") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      type: "eye-disabled",
      className: styles.icon
    }), "Private alert")), channel.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: styles.item
    }, channels.join(', '))));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.col
  }, (selected || isFinished) && children, isInvalid && /*#__PURE__*/React.createElement(AlertMessage, {
    className: styles.error,
    error: true,
    text: "Channel is required"
  }));
};

export default Notifications;