function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useMemo } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from '@santiment-network/ui/Icon';
import Tooltip from '@santiment-network/ui/Tooltip';
import Button from '@santiment-network/ui/Button';
import LoginPopup from '../banners/feature/PopupBanner';
import WordCloud from '../WordCloud/WordCloudWithHeader';
import DarkTooltip from '../Tooltip/DarkTooltip';
import NewLabel from '../NewLabel/NewLabel';
import Chart from './Chart';
import { Metric } from '../../ducks/dataHub/metrics';
import { createTrigger } from '../../ducks/Signals/common/actions';
import { buildInTrendingWordsSignal } from '../../ducks/Signals/utils/utils';
import { dividePhraseInWords, SETTINGS } from './topics';
import styles from './Item.module.css';
const METRICS = [Metric.social_volume_total];

const Item = ({
  topic,
  title,
  link,
  createdAt,
  price,
  priceTicker,
  show,
  onLoad,
  createSignal,
  isCompact
}) => {
  const {
    settings,
    metrics
  } = useMemo(() => {
    if (price) {
      return {
        metrics: METRICS.concat(Metric.price_usd),
        settings: _extends({
          slug: price
        }, SETTINGS)
      };
    }

    return {
      metrics: METRICS,
      settings: SETTINGS
    };
  }, [price]);
  const MetricSettingMap = useMemo(() => {
    const MetricSettingMap = new Map();
    MetricSettingMap.set(metrics[0], {
      selector: 'text',
      slug: topic
    });
    return MetricSettingMap;
  }, [metrics]);
  return show ? /*#__PURE__*/React.createElement("article", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.top
  }, /*#__PURE__*/React.createElement(Link, {
    to: `/labs/trends/explore/${link}`,
    className: styles.text
  }, [/*#__PURE__*/React.createElement(NewLabel, {
    date: createdAt,
    className: styles.new,
    key: "new"
  }), title]), !isCompact && /*#__PURE__*/React.createElement("div", {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(LoginPopup, null, /*#__PURE__*/React.createElement("div", {
    className: styles.action,
    onClick: () => {
      const words = dividePhraseInWords(topic);
      createSignal(buildInTrendingWordsSignal(words));
    }
  }, /*#__PURE__*/React.createElement(DarkTooltip, {
    align: "end",
    trigger: /*#__PURE__*/React.createElement(Icon, {
      type: "signal",
      className: cx(styles.signal, styles.icon)
    }),
    position: "top"
  }, "Create an alert if the phrase", /*#__PURE__*/React.createElement("br", null), "appears in Social Trends"))), /*#__PURE__*/React.createElement("div", {
    className: styles.action
  }, /*#__PURE__*/React.createElement(Tooltip, {
    on: "click",
    closeTimeout: 200,
    position: "left",
    passOpenStateAs: "isActive",
    trigger: /*#__PURE__*/React.createElement(Button, {
      variant: "flat",
      className: styles.button
    }, /*#__PURE__*/React.createElement(DarkTooltip, {
      trigger: /*#__PURE__*/React.createElement(Icon, {
        type: "cloud-big",
        className: cx(styles.context, styles.icon)
      }),
      position: "top",
      align: "end"
    }, "Social context"))
  }, /*#__PURE__*/React.createElement(WordCloud, {
    hideWord: true,
    className: styles.wordCloud,
    word: topic
  }))))), /*#__PURE__*/React.createElement(Chart, {
    topic: topic,
    metrics: metrics,
    price: price,
    priceTicker: priceTicker,
    settings: settings,
    onLoad: onLoad,
    settingMap: MetricSettingMap,
    className: styles.chart,
    isCompact: isCompact
  })) : null;
};

const mapDispatchToProps = dispatch => ({
  createSignal: payload => {
    dispatch(createTrigger(payload));
  }
});

export default connect(null, mapDispatchToProps)(Item);