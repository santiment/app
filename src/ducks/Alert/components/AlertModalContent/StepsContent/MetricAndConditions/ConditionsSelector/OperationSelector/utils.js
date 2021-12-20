import React from 'react'
import aboveSvg from '../../../../../../../../assets/signals/priceTypes/above.svg'
import belowSvg from '../../../../../../../../assets/signals/priceTypes/below.svg'
import insideSvg from '../../../../../../../../assets/signals/priceTypes/inside.svg'
import outsideSvg from '../../../../../../../../assets/signals/priceTypes/outside.svg'
import movingUpSvg from '../../../../../../../../assets/signals/priceTypes/moving_up.svg'
import movingDownSvg from '../../../../../../../../assets/signals/priceTypes/moving_down.svg'
import someOfSvg from '../../../../../../../../assets/signals/priceTypes/someOf.svg'
import styles from './OperationSelector.module.scss'

export const ETH_WALLETS_OPERATIONS = {
  AMOUNT_DOWN: 'amount_down',
  AMOUNT_UP: 'amount_up'
}

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
}

const METRIC_TO_SVG = {
  [PRICE_CHANGE_TYPES.ABOVE]: aboveSvg,
  [PRICE_CHANGE_TYPES.BELOW]: belowSvg,
  [PRICE_CHANGE_TYPES.ABOVE_OR_EQUAL]: aboveSvg,
  [PRICE_CHANGE_TYPES.BELOW_OR_EQUAL]: belowSvg,
  [PRICE_CHANGE_TYPES.INSIDE_CHANNEL]: insideSvg,
  [PRICE_CHANGE_TYPES.OUTSIDE_CHANNEL]: outsideSvg,
  [PRICE_CHANGE_TYPES.MOVING_UP]: movingUpSvg,
  [PRICE_CHANGE_TYPES.MOVING_DOWN]: movingDownSvg,
  [PRICE_CHANGE_TYPES.PERCENT_SOME_OF]: someOfSvg,
  [ETH_WALLETS_OPERATIONS.AMOUNT_UP]: aboveSvg,
  [ETH_WALLETS_OPERATIONS.AMOUNT_DOWN]: belowSvg
}

export const formatOptionLabel = ({ label, value }) => {
  const icon = METRIC_TO_SVG[value]

  return (
    <div className={styles.option}>
      {icon && <img src={icon} alt='type' />}
      {label}
    </div>
  )
}
