function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import cx from 'classnames';
import { Bar, Cell, LabelList } from 'recharts';
import { tooltipValueFormatter } from '../../dataHub/metrics/formatters';
import ProjectIcon from '../../../components/ProjectIcon/ProjectIcon';
import { makeShortAddresLink } from '../../../components/WalletLink/ActionLabels';
import { isEthStrictAddress } from '../../../utils/utils';
import WalletLink from '../../../components/WalletLink/WalletLink';
import styles from './ProjectsBarChart.module.css';
export const renderHorizontalLabel = props => {
  const {
    x,
    y,
    width,
    data,
    index,
    dataKey
  } = props;
  const item = data[index];
  const value = item[dataKey];
  const fontSize = width < 20 ? 7 : 12;
  const position = +value >= 0 ? -1 * (fontSize / 2) : fontSize;
  return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("text", {
    x: x + width / 2,
    y: y + position,
    fill: 'var(--rhino)',
    textAnchor: "middle",
    fontSize: fontSize,
    fontWeight: 500
  }, tooltipValueFormatter({
    value
  })));
};
export const renderVerticalLabel = props => {
  const {
    x,
    y,
    width,
    data,
    index,
    dataKey,
    isDesktop
  } = props;
  const item = data[index];
  const value = item[dataKey];
  const xOffset = isDesktop ? 34 : 26;
  return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("text", {
    x: x + width + xOffset,
    y: y + 24,
    fill: 'var(--rhino)',
    textAnchor: "middle",
    fontSize: isDesktop ? 16 : 14,
    fontWeight: 500
  }, tooltipValueFormatter({
    value
  })));
};
export const PREDEFINED_COLORS = {
  tether: '#50AF95',
  'gemini-dollar': '#00DCFA',
  'binance-usd': '#F0B90B'
};
export const HorizontalCategoryTick = props => {
  const {
    x,
    y,
    payload: {
      value
    },
    data,
    index
  } = props;
  const item = data[index] || {};
  const {
    logoUrl
  } = item;
  return /*#__PURE__*/React.createElement("foreignObject", {
    x: x - 35,
    y: y,
    width: 70,
    height: 80
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.name
  }, /*#__PURE__*/React.createElement(ProjectIcon, {
    slug: value,
    logoUrl: logoUrl,
    size: 30
  }), /*#__PURE__*/React.createElement(ProjectTicker, {
    item: item
  })));
};
export const VerticalCategoryTick = props => {
  const {
    x,
    y,
    payload: {
      value
    },
    data,
    index
  } = props;
  const item = data[index] || {};
  const {
    logoUrl
  } = item;
  return /*#__PURE__*/React.createElement("foreignObject", {
    x: x - 94,
    y: y - 16,
    width: 120,
    height: 40
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.name, styles.name__vertical)
  }, /*#__PURE__*/React.createElement(ProjectIcon, {
    slug: value,
    logoUrl: logoUrl,
    size: 26
  }), /*#__PURE__*/React.createElement(ProjectTicker, {
    item: item
  })));
};
export function getProjectsMarkup({
  dataKey,
  data,
  MetricColor,
  onProjectClick,
  radius = [8, 8, 0, 0],
  barSize,
  maxBarSize = 32,
  labelRenderer = renderHorizontalLabel,
  isDesktop
}) {
  return /*#__PURE__*/React.createElement(Bar, {
    dataKey: dataKey,
    radius: radius,
    maxBarSize: maxBarSize,
    barSize: barSize
  }, /*#__PURE__*/React.createElement(LabelList, {
    dataKey: dataKey,
    content: props => labelRenderer(_objectSpread(_objectSpread({}, props), {}, {
      data,
      dataKey,
      isDesktop
    }))
  }), data.map((entry, index) => {
    return /*#__PURE__*/React.createElement(Cell, {
      key: `cell-${index}`,
      fill: MetricColor[entry.key],
      onClick: () => onProjectClick(_objectSpread(_objectSpread({}, entry), {}, {
        value: entry.slug
      }))
    });
  }));
}
const LINK_SETTINGS = {
  linkSymbolsCount: 7
};

const ProjectTicker = ({
  item
}) => {
  const {
    ticker,
    address
  } = item;
  const isEthAddress = address && isEthStrictAddress(address);

  if (!isEthAddress) {
    return /*#__PURE__*/React.createElement("div", {
      className: styles.ticker
    }, ticker || address);
  }

  return /*#__PURE__*/React.createElement(WalletLink, {
    trigger: /*#__PURE__*/React.createElement("div", {
      className: styles.ticker
    }, makeShortAddresLink({
      link: address,
      settings: LINK_SETTINGS
    })),
    assets: [],
    address: address,
    settings: {
      linkSymbolsCount: address.length
    }
  });
};