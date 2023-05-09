function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import WordCloudContent from './WordCloudContent';
import { useWordCloud } from './hooks';
import Skeleton from '../Skeleton/Skeleton';
import styles from './WordCloud.module.css';
export const WordCloud = ({
  cloud,
  className,
  textClassName,
  isLoading,
  fixedFont
}) => /*#__PURE__*/React.createElement("div", {
  className: className
}, isLoading && /*#__PURE__*/React.createElement(Skeleton, {
  centered: true,
  className: styles.skeleton,
  show: isLoading,
  repeat: 1
}), /*#__PURE__*/React.createElement(WordCloudContent, {
  cloud: cloud,
  textClassName: textClassName,
  bigLimit: 1,
  mediumLimit: 3,
  padding: 8,
  showBadge: false,
  fixedFont: fixedFont
}));
export default (props => {
  const {
    cloud,
    loading
  } = useWordCloud(props);
  return /*#__PURE__*/React.createElement(WordCloud, _extends({}, props, {
    cloud: cloud,
    isLoading: loading
  }));
});