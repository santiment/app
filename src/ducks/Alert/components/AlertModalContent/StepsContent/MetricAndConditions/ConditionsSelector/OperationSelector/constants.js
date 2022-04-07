export const AVAILABLE_OPERATIONS = [
  {
    label: 'More than',
    value: 'above',
  },
  {
    label: 'More than or equal',
    value: 'above_or_equal',
  },
  {
    label: 'Less than',
    value: 'below',
  },
  {
    label: 'Less than or equal',
    value: 'below_or_equal',
  },
  {
    label: 'Entering channel',
    value: 'inside_channel',
  },
  {
    label: 'Outside channel',
    value: 'outside_channel',
  },
  {
    label: 'Moving up %',
    value: 'percent_up',
  },
  {
    label: 'Moving down %',
    value: 'percent_down',
  },
  {
    label: 'Moving up or down %',
    value: 'some_of',
  },
]

export const ETH_WALLETS_OPERATIONS = [
  {
    label: 'Amount down',
    value: 'amount_down',
  },
  {
    label: 'Amount up',
    value: 'amount_up',
  },
]

export const MULTIPLE_VALUES_OPERATIONS = [
  AVAILABLE_OPERATIONS[4],
  AVAILABLE_OPERATIONS[5],
  AVAILABLE_OPERATIONS[8],
].map((operation) => operation.value)

export const PERCENT_OPERATIONS = [
  AVAILABLE_OPERATIONS[6],
  AVAILABLE_OPERATIONS[7],
  AVAILABLE_OPERATIONS[8],
].map((operation) => operation.value)
