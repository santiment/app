function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Metric } from './metrics';
import { updateTooltipSettings } from './tooltipSettings';
import { CONNECTED_WIDGET, SIDEPANEL, ICO_PRICE, WIDGET } from '../Studio/Sidebar/Button/types';
import { SPENT_COIN_COST, SOCIAL_CONTEXT } from '../Studio/Chart/Sidepanel/panes';
export const SOCIAL_TWITTER_INTERVALS = ['24h', '7d'];
export const TopTransactionsTableMetric = {
  key: 'TopTransactionsTable',
  type: CONNECTED_WIDGET,
  label: 'Top Transactions Table',
  requiredMetric: Metric.transaction_volume,
  parentMetric: Metric.transaction_volume,
  abbreviation: 'ttt'
};
export const TopHoldersTableMetric = {
  key: 'HoldersDistributionTable',
  type: WIDGET,
  label: 'Top Holders Table',
  parentMetric: Metric.amount_in_top_holders
};
export const FeesDistributionMetric = {
  key: 'FeesDistribution',
  type: WIDGET,
  checkIsVisible: ({
    slug
  }) => slug === 'ethereum',
  label: 'Fees Distribution',
  parentMetric: Metric.median_fees_usd
};
export const SOCIAL_ACTIVE_USERS_TELEGRAM = _objectSpread(_objectSpread({}, Metric.social_active_users), {}, {
  showRoot: true,
  key: 'social_active_users_telegram',
  label: 'Active social users (Telegram)',
  shortLabel: 'Act. Soc. Us. Tg.',
  channel: 'telegram',
  reqMeta: {
    source: 'telegram'
  }
});
export const SOCIAL_ACTIVE_USERS_TWITTER = _objectSpread(_objectSpread({}, Metric.social_active_users), {}, {
  showRoot: true,
  key: 'social_active_users_twitter',
  label: 'Active social users (Twitter)',
  shortLabel: 'Act. Soc. Us. Tw.',
  channel: 'twitter',
  reqMeta: {
    source: 'twitter_crypto'
  }
});
export const Submetrics = {
  [Metric.price_usd.key]: [{
    key: 'ico_price',
    type: ICO_PRICE,
    label: 'ICO Price',
    checkIsActive: ({
      isICOPriceActive
    }) => isICOPriceActive,
    checkIsVisible: ({
      isICOPriceDisabled
    }) => isICOPriceDisabled !== undefined && !isICOPriceDisabled
  }, {
    key: SPENT_COIN_COST,
    type: SIDEPANEL,
    label: 'Spent Coin Cost',
    checkIsActive: ({
      sidepanel
    }) => sidepanel === SPENT_COIN_COST
  }],
  [Metric.amount_in_top_holders.key]: [TopHoldersTableMetric],
  [Metric.transaction_volume.key]: [TopTransactionsTableMetric],
  [Metric.median_fees_usd.key]: [FeesDistributionMetric],
  [Metric.social_volume_total.key]: [{
    key: SOCIAL_CONTEXT,
    type: SIDEPANEL,
    label: 'Social Context',
    checkIsActive: ({
      sidepanel
    }) => sidepanel === SOCIAL_CONTEXT
  }, SOCIAL_ACTIVE_USERS_TELEGRAM, SOCIAL_ACTIVE_USERS_TWITTER],
  [Metric.twitter_followers.key]: SOCIAL_TWITTER_INTERVALS.map(interval => _objectSpread(_objectSpread({}, Metric.twitter_followers), {}, {
    key: `twitter_followers_${interval}`,
    queryKey: 'twitter_followers',
    label: `Twitter Followers ${interval}`,
    description: "Shows the number changes of followers on the project's official Twitter account over time.",
    reqMeta: {
      interval,
      transform: {
        type: 'changes'
      }
    },
    replacements: {
      timebound: interval
    }
  }))
};
Object.values(Submetrics).forEach(submetrics => updateTooltipSettings(submetrics));