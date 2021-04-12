import { WIDGET } from './Button/types'

export const HOLDER_DISTRIBUTION_NODE = {
  key: 'holder_distribution',
  type: WIDGET,
  label: 'By number of addresses',
  abbreviation: 'hd',
  group: 'Supply distribution',
  category: 'On-chain',
  node: 'line'
}
export const HOLDER_LABELED_DISTRIBUTION_NODE = {
  key: 'holder_labeled_distribution',
  type: WIDGET,
  label: 'By number of addresses (labeled)',
  abbreviation: 'hdl',
  group: 'Supply distribution',
  category: 'On-chain',
  node: 'line',
  isBeta: true
}

export const HOLDER_DISTRIBUTION_COMBINED_BALANCE_NODE = {
  key: 'holder_distribution_combined_balance',
  type: WIDGET,
  label: 'By balance of addresses',
  abbreviation: 'hdcb',
  group: 'Supply distribution',
  category: 'On-chain',
  node: 'line'
}
