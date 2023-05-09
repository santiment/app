import React from 'react';
import cx from 'classnames';
import Loader from '@santiment-network/ui/Loader/Loader';
import styles from './WidgetTrend.module.css';
const Message = {
  initial: 'Select a word',
  isLoading: 'Loading...',
  hasNoData: 'No data'
};

const getMessage = ({
  initial,
  isLoading,
  hasNoData
}) => {
  if (isLoading) {
    return Message.isLoading;
  }

  if (initial) {
    return Message.initial;
  }

  if (hasNoData) {
    return Message.hasNoData;
  }

  return undefined;
};

const WidgetTrend = ({
  trendWord,
  hideWord,
  description,
  isLoading,
  hasData,
  error,
  children,
  className,
  infoClassName,
  contentClassName
}) => {
  const msg = getMessage({
    isLoading,
    hasNoData: error || !hasData,
    initial: !trendWord && !error
  });
  return /*#__PURE__*/React.createElement("div", {
    className: `${styles.wrapper} ${className}`
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.info, infoClassName)
  }, !hideWord && /*#__PURE__*/React.createElement("span", {
    className: styles.word
  }, trendWord, " "), description), msg ? /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, isLoading ? /*#__PURE__*/React.createElement(Loader, {
    className: styles.loader
  }) : /*#__PURE__*/React.createElement("h3", {
    className: styles.msg
  }, msg)) : /*#__PURE__*/React.createElement("div", {
    className: cx(styles.content, contentClassName)
  }, children));
};

WidgetTrend.defaultProps = {
  className: ''
};
export default WidgetTrend;