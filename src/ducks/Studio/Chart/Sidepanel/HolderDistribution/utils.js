import { FORMATTER } from '../../../../dataHub/tooltipSettings'

export const LABEL_PERCENT_POSTFIX = ' %'

export const removeLabelPostfix = str => str.replace(LABEL_PERCENT_POSTFIX, '')

export const percentFormatter = value => {
  const result = FORMATTER(value)
  return Number.isFinite(+result) ? result + '%' : result
}

function normalizeAxisPercent (value) {
  if (!Number.isFinite(+value)) return

  if (value >= 10) {
    return value.toFixed(2)
  }

  return value.toFixed(3)
}

export const axisPercentFormatter = value => normalizeAxisPercent(value) + '%'
