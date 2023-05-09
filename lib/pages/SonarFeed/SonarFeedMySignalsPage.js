function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { RecommendedSignals } from './SonarFeedRecommendations';
import { mapQSToState } from '../../utils/utils';
import SignalsList from './SignalsList';

const SonarFeedMySignalsPage = props => {
  const filters = mapQSToState(props);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SignalsList, _extends({
    filters: filters
  }, props)), /*#__PURE__*/React.createElement(RecommendedSignals, null));
};

export default SonarFeedMySignalsPage;