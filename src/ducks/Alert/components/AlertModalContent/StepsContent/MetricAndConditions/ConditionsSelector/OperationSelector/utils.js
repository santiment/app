import React from 'react'
// import { ReactComponent as AboveSvg } from '../../../../../../../../assets/signals/priceTypes/above.svg'
// import { ReactComponent as BelowSvg } from '../../../../../../../../assets/signals/priceTypes/below.svg'
// import { ReactComponent as InsideSvg } from '../../../../../../../../assets/signals/priceTypes/inside.svg'
// import { ReactComponent as OutsideSvg } from '../../../../../../../../assets/signals/priceTypes/outside.svg'
// import { ReactComponent as MovingUpSvg } from '../../../../../../../../assets/signals/priceTypes/moving_up.svg'
// import { ReactComponent as MovingDownSvg } from '../../../../../../../../assets/signals/priceTypes/moving_down.svg'
// import { ReactComponent as SomeOfSvg } from '../../../../../../../../assets/signals/priceTypes/someOf.svg'
import styles from './OperationSelector.module.scss'

export const ETH_WALLETS_OPERATIONS = {
  AMOUNT_DOWN: 'amount_down',
  AMOUNT_UP: 'amount_up',
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
  PERCENT_SOME_OF: 'some_of',
}

export const formatOptionLabel = ({ label, value }) => {
  return <div className={styles.option}>{label}</div>
}
