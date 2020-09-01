import { FORMATTER } from '../../../../dataHub/tooltipSettings'

export const LABEL_PERCENT_POSTFIX = ' %'

export const removeLabelPostfix = str => str.replace(LABEL_PERCENT_POSTFIX, '')

export const percentFormatter = value => FORMATTER(value) + '%'

function normalizeAxisPercent (value) {
  if (value >= 10) {
    return value.toFixed(2)
  }

  return value.toFixed(3)
}

export const axisPercentFormatter = value => normalizeAxisPercent(value) + '%'
