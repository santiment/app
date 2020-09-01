import { FORMATTER } from '../../../../dataHub/tooltipSettings'

export const LABEL_PERCENT_POSTFIX = ' %'

export const removeLabelPostfix = str => str.replace(LABEL_PERCENT_POSTFIX, '')

export const percentFormatter = value => `${FORMATTER(value)}%`
