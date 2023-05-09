function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { useMemo } from 'react';
import { Suggestion } from './index';
export function useSuggestions(metricValues) {
  return useMemo(() => {
    const suggestions = [];
    const {
      length
    } = metricValues;

    for (let i = 0; i < length; i++) {
      const metricValue = metricValues[i];
      const suggestion = Suggestion[metricValue.key];

      if (suggestion) {
        suggestions.push(_extends({}, metricValue, suggestion));
      }
    }

    return suggestions;
  }, [metricValues]);
}