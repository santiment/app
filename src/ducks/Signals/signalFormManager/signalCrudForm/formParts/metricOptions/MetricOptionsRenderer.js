import React from 'react'
import styles from './MetricOptionsRenderer.module.scss'
import aboveSvg from '../../../../../../assets/signals/priceTypes/above.svg'
import belowSvg from '../../../../../../assets/signals/priceTypes/below.svg'
import insideSvg from '../../../../../../assets/signals/priceTypes/inside.svg'
import outsideSvg from '../../../../../../assets/signals/priceTypes/outside.svg'
import movingUpSvg from '../../../../../../assets/signals/priceTypes/moving_up.svg'
import movingDownSvg from '../../../../../../assets/signals/priceTypes/moving_down.svg'
import someOfSvg from '../../../../../../assets/signals/priceTypes/someOf.svg'
import {
  ETH_WALLETS_OPERATIONS,
  PRICE_CHANGE_TYPES
} from '../../../../utils/constants'
import { formatTokensCount } from '../../../../../../utils/formatting'

const METRIC_TO_SVG = {
  [PRICE_CHANGE_TYPES.ABOVE]: aboveSvg,
  [PRICE_CHANGE_TYPES.BELOW]: belowSvg,
  [PRICE_CHANGE_TYPES.INSIDE_CHANNEL]: insideSvg,
  [PRICE_CHANGE_TYPES.OUTSIDE_CHANNEL]: outsideSvg,
  [PRICE_CHANGE_TYPES.MOVING_UP]: movingUpSvg,
  [PRICE_CHANGE_TYPES.MOVING_DOWN]: movingDownSvg,
  [PRICE_CHANGE_TYPES.PERCENT_SOME_OF]: someOfSvg,
  [ETH_WALLETS_OPERATIONS.AMOUNT_UP]: aboveSvg,
  [ETH_WALLETS_OPERATIONS.AMOUNT_DOWN]: belowSvg
}

const MetricOptionsRenderer = ({
  focusedOption,
  focusedOptionIndex,
  focusOption,
  key,
  labelKey,
  option,
  optionIndex,
  options,
  selectValue,
  style,
  valueArray,
  valueKey
}) => {
  const classNames = [styles.option]

  const { label, value, type, divider } = option

  if (divider) {
    classNames.push(styles.divider)
  }

  if (type === 'header') {
    classNames.push(styles.header)

    return (
      <div className={classNames.join(' ')} key={key} style={style}>
        {label}
      </div>
    )
  }

  if (option === focusedOption) {
    classNames.push(styles.focused)
  }
  if (valueArray.indexOf(option) >= 0) {
    classNames.push(styles.selected)
  }

  const svg = METRIC_TO_SVG[value]

  return (
    <div
      className={classNames.join(' ')}
      key={key}
      onClick={() => selectValue(option)}
      onMouseEnter={() => focusOption(option)}
      style={style}
    >
      {svg && <img className={styles.icon} src={svg} alt={value} />}
      {label}
    </div>
  )
}

export const WalletBalanceOptionRenderer = ({
  focusedOption,
  focusedOptionIndex,
  focusOption,
  key,
  labelKey,
  option,
  optionIndex,
  options,
  selectValue,
  style,
  valueArray,
  valueKey
}) => {
  const classNames = [styles.option]

  const { slug, balance } = option

  if (option === focusedOption) {
    classNames.push(styles.focused)
  }
  if (valueArray.indexOf(option) >= 0) {
    classNames.push(styles.selected)
  }

  const hasBalance = balance >= 0

  return (
    <div
      className={classNames.join(' ')}
      key={key}
      onClick={() => selectValue(option)}
      onMouseEnter={() => focusOption(option)}
      style={style}
    >
      <span>{slug}</span>
      {hasBalance && (
        <span className={styles.balance}>({formatTokensCount(balance)})</span>
      )}
    </div>
  )
}

export default MetricOptionsRenderer
