function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { compose } from 'recompose';
import { graphql } from 'react-apollo';

const makeDataset = (dataset = {}, data = []) => {
  return _objectSpread(_objectSpread({}, dataset), {}, {
    data: data.map(item => {
      return {
        x: item.datetime,
        y: item.followersCount
      };
    })
  });
};

const makeProps = (name, chartjs = {}) => props => {
  const Data = props[name] || {};
  return {
    [name]: _objectSpread({
      dataset: chartjs.dataset ? makeDataset(chartjs.dataset, Data[name]) : undefined,
      scale: chartjs.scale || undefined,
      loading: Data.loading || false,
      error: Data.error || false,
      errorMessage: Data.error ? Data.error.message : '',
      items: Data[name] || []
    }, Data)
  };
};

const makeOptions = (name, options) => props => {
  return {
    skip: !props.chartVars.ticker,
    variables: options(props).variables
  };
};

const makeRequestFromTimeSeries = ({
  query,
  name,
  options,
  chartjs
}) => {
  return graphql(query, {
    name,
    props: makeProps(name, chartjs),
    options: makeOptions(name, options)
  });
};

const withTimeseries = (...timeseries) => WrappedComponent => {
  return compose(...timeseries.reduce((acc, item) => {
    return [makeRequestFromTimeSeries(item), ...acc];
  }, []))(WrappedComponent);
};

export default withTimeseries;