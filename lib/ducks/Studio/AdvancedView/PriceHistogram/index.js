const _excluded = ["index", "distribution"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Loader from '@santiment-network/ui/Loader/Loader';
import { usePriceHistogramData } from './hooks';
import RestrictionMessage from './RestrictionMessage';
import ErrorMessage from './ErrorMessage';
import UsageTip from '../UsageTip';
import Calendar from '../Calendar';
import MoreInfoLink from '../../../../components/MoreInfoLink/MoreInfoLink';
import { millify } from '../../../../utils/formatting';
import { ONE_MONTH_IN_MS } from '../../../../utils/dates';
import MetricFrequence from '../../../SANCharts/MetricFrequence/MetricFrequence';
import { SPENT_COINT_COST } from '../../../dataHub/metrics/frequences';
import { usdFormatter } from '../../../dataHub/metrics/formatters';
import styles from './index.module.css';
const INTERVAL_ERROR_TEXT = 'allowed interval';

const formatRange = ([left, right]) => `${usdFormatter(left)} - ${usdFormatter(right)}`;

const Bucket = ({
  range,
  value,
  ticker,
  width,
  price,
  isRangeAfterCurrentPrice
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.frame
}, /*#__PURE__*/React.createElement("div", {
  className: cx(styles.bar, isRangeAfterCurrentPrice && styles.red),
  style: {
    '--r': width
  }
}), /*#__PURE__*/React.createElement("div", {
  className: styles.info
}, /*#__PURE__*/React.createElement("span", {
  className: styles.range
}, formatRange(range), ": "), millify(value, 1), " ", ticker, price && /*#__PURE__*/React.createElement("div", {
  className: styles.price
}, "Price: ", usdFormatter(price))));

const PriceHistogram = ({
  project: {
    title,
    slug,
    ticker
  },
  date,
  datesRange
}) => {
  const [dates, setDates] = useState([date]);
  const [from, to] = dates;
  const [data, loading, error] = usePriceHistogramData({
    slug,
    from,
    to
  });
  useEffect(() => {
    const to = new Date(date);
    date.setHours(0, 0, 0, 0);
    to.setHours(23, 59, 59, 999);
    setDates([date, to]);
  }, [date]);
  useEffect(() => {
    if (datesRange) {
      const newRange = [new Date(datesRange[0]), new Date(datesRange[1])];
      newRange[0].setHours(0, 0, 0, 0);
      newRange[1].setHours(23, 59, 59, 999);
      setDates(newRange);
    }
  }, [datesRange]);

  function onCalendarChange(newDates) {
    setDates(newDates);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("h2", {
    className: styles.title
  }, "Spent Coin Cost", /*#__PURE__*/React.createElement(Calendar, {
    className: styles.calendar,
    selectRange: true,
    dates: dates,
    onChange: onCalendarChange
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, "It shows at what price the tokens that were transacted today were last moved.", /*#__PURE__*/React.createElement(MoreInfoLink, {
    href: "https://academy.santiment.net/metrics/spent-coin-cost/"
  }), /*#__PURE__*/React.createElement(MetricFrequence, {
    metric: {
      key: SPENT_COINT_COST
    },
    classes: styles
  })), /*#__PURE__*/React.createElement(UsageTip, null), /*#__PURE__*/React.createElement("div", {
    className: styles.static
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.scroller
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.scroll
  }, error || data.length === 0 && !loading ? error && error.message.includes(INTERVAL_ERROR_TEXT) ? /*#__PURE__*/React.createElement(RestrictionMessage, null) : /*#__PURE__*/React.createElement(ErrorMessage, null) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, "Example"), /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, "Today's on-chain volume of Santiment is 100,000 SAN tokens and the average price for today is $1. If 50,000 of those tokens were moved when the price was $1.5 and the other 50,000 where moved when the price was $0.5 the histogram could look like:", /*#__PURE__*/React.createElement("br", null), "$0-$1 - 50,000", /*#__PURE__*/React.createElement("br", null), "$1-$2 - 50,000"), data.map(_ref => {
    let {
      index,
      distribution
    } = _ref,
        rest = _objectWithoutProperties(_ref, _excluded);

    return /*#__PURE__*/React.createElement(Bucket, _extends({
      key: index
    }, distribution, rest, {
      ticker: ticker
    }));
  })))), loading && /*#__PURE__*/React.createElement(Loader, {
    className: styles.loader
  })));
};

PriceHistogram.Icon = 'H';
PriceHistogram.defaultProps = {
  project: {},
  date: new Date(Date.now() - ONE_MONTH_IN_MS * 3)
};
export default PriceHistogram;