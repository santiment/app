import React from 'react';
import { ReactComponent as AboveSvg } from '../../../../../../../../assets/signals/priceTypes/above.svg';
import { ReactComponent as BelowSvg } from '../../../../../../../../assets/signals/priceTypes/below.svg';
import { ReactComponent as InsideSvg } from '../../../../../../../../assets/signals/priceTypes/inside.svg';
import { ReactComponent as OutsideSvg } from '../../../../../../../../assets/signals/priceTypes/outside.svg';
import { ReactComponent as MovingUpSvg } from '../../../../../../../../assets/signals/priceTypes/moving_up.svg';
import { ReactComponent as MovingDownSvg } from '../../../../../../../../assets/signals/priceTypes/moving_down.svg';
import { ReactComponent as SomeOfSvg } from '../../../../../../../../assets/signals/priceTypes/someOf.svg';
import styles from './OperationSelector.module.css';
export const ETH_WALLETS_OPERATIONS = {
  AMOUNT_DOWN: 'amount_down',
  AMOUNT_UP: 'amount_up'
};
export const PRICE_CHANGE_TYPES = {
  MOVING_UP: 'percent_up',
  MOVING_DOWN: 'percent_down',
  INSIDE_CHANNEL: 'inside_channel',
  OUTSIDE_CHANNEL: 'outside_channel',
  ABOVE: 'above',
  ABOVE_OR_EQUAL: 'above_or_equal',
  BELOW_OR_EQUAL: 'below_or_equal',
  BELOW: 'below',
  PERCENT_SOME_OF: 'some_of'
};
const METRIC_TO_SVG = {
  [PRICE_CHANGE_TYPES.ABOVE]: AboveSvg,
  [PRICE_CHANGE_TYPES.BELOW]: BelowSvg,
  [PRICE_CHANGE_TYPES.ABOVE_OR_EQUAL]: AboveSvg,
  [PRICE_CHANGE_TYPES.BELOW_OR_EQUAL]: BelowSvg,
  [PRICE_CHANGE_TYPES.INSIDE_CHANNEL]: InsideSvg,
  [PRICE_CHANGE_TYPES.OUTSIDE_CHANNEL]: OutsideSvg,
  [PRICE_CHANGE_TYPES.MOVING_UP]: MovingUpSvg,
  [PRICE_CHANGE_TYPES.MOVING_DOWN]: MovingDownSvg,
  [PRICE_CHANGE_TYPES.PERCENT_SOME_OF]: SomeOfSvg,
  [ETH_WALLETS_OPERATIONS.AMOUNT_UP]: AboveSvg,
  [ETH_WALLETS_OPERATIONS.AMOUNT_DOWN]: BelowSvg
};
export const formatOptionLabel = ({
  label,
  value
}) => {
  const Icon = METRIC_TO_SVG[value];
  return /*#__PURE__*/React.createElement("div", {
    className: styles.option
  }, /*#__PURE__*/React.createElement(Icon, null), label);
};