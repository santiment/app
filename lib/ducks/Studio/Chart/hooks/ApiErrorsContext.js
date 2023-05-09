import React, { useState, useEffect } from 'react';
import { isStage } from '../../../../utils/utils';
const API_TEST_URL = isStage ? 'https://apitestsweb-stage.santiment.net/gql_test_suite/latest.json' : 'https://apitestsweb-production.santiment.net/gql_test_suite/latest.json';
let API_ERRORS_DATA;
const ApiErrorsContext = /*#__PURE__*/React.createContext();
export const ApiErrorsProvider = ({
  children
}) => {
  const [errorsForMetrics, setErrorsForMetrics] = useState(API_ERRORS_DATA);

  function load() {
    const controller = new AbortController();
    fetch(API_TEST_URL, {
      signal: controller.signal
    }).then(response => {
      if (!response.ok) {
        return {};
      }

      return response.json();
    }).then(data => {
      setErrorsForMetrics(data);
      API_ERRORS_DATA = data;
    }).catch(console.log);
    return controller;
  }

  useEffect(() => {
    if (!API_ERRORS_DATA) {
      const controller = load();
      return () => {
        if (!controller.signal.aborted) {
          controller.abort();
        }
      };
    }
  }, []);
  return /*#__PURE__*/React.createElement(ApiErrorsContext.Provider, {
    value: errorsForMetrics
  }, children);
};
export function useApiErrors() {
  return React.useContext(ApiErrorsContext);
}