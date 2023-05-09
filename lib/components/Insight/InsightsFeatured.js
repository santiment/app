const _excluded = ["data"],
      _excluded2 = ["id"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { graphql } from 'react-apollo';
import InsightCardSmall from './InsightCardSmall';
import { FEATURED_INSIGHTS_QUERY } from './../../queries/InsightsGQL';
import { creationDateSort } from './utils';

const InsightsTrends = _ref => {
  let {
    data: {
      insights = []
    }
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return insights.sort(creationDateSort).map(_ref2 => {
    let {
      id
    } = _ref2,
        insight = _objectWithoutProperties(_ref2, _excluded2);

    return /*#__PURE__*/React.createElement(InsightCardSmall, _extends({
      key: id
    }, props, {
      id: id
    }, insight));
  });
};

export default graphql(FEATURED_INSIGHTS_QUERY, {
  fetchPolicy: 'cache-and-network'
})(InsightsTrends);