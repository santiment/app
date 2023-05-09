function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Metric } from '../../../dataHub/metrics';
import { updateTooltipSettings } from '../../../dataHub/tooltipSettings';
export const DetailedMetric = {
  social_volume_telegram: {
    color: '#5275FF',
    name: 'Telegram',
    label: 'Telegram Social Volume'
  },
  social_volume_reddit: {
    color: '#FF5B5B',
    name: 'Reddit',
    label: 'Reddit Social Volume'
  },
  social_volume_twitter: {
    color: '#1DA1F2',
    name: 'Twitter',
    label: 'Twitter Social Volume'
  },
  social_volume_4chan: {
    color: '#5235FF',
    name: '4chan',
    label: '4chan Social Volume'
  },
  community_messages_count_telegram: {
    color: '#5275FF',
    name: 'Telegram',
    label: 'Community Telegram Social Volume'
  }
};
Object.keys(DetailedMetric).forEach(key => {
  DetailedMetric[key].key = key;
});
Object.values(DetailedMetric).forEach(item => {
  DetailedMetric[item.key] = _objectSpread(_objectSpread({}, Metric.social_volume_total), item);
});
updateTooltipSettings(Object.values(DetailedMetric));