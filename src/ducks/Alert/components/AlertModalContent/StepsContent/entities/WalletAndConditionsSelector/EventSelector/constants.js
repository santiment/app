export const WALLET_EVENTS = [
  {
    id: 1,
    title: 'Asset Movements',
    description:
      'Track value changes of the specific asset in the particular wallet. Choose constant or percentage conditions',
    isNew: false,
    settings: {
      type: 'wallet_movement',
      target: { address: '' },
      selector: { infrastructure: '', slug: '' },
      channel: [],
      time_window: '1d',
      operation: {},
    },
  },
  {
    id: 2,
    title: 'Capitalisation',
    description:
      'Track the combined value of all assets in the wallet. Full capitalisation calculated as a total portfolio in USD',
    isNew: true,
    settings: {
      type: 'wallet_usd_valuation',
      channel: [],
      target: { address: '' },
      time_window: '1d',
      selector: { infrastructure: '' },
      operation: {},
    },
  },
  {
    id: 3,
    title: 'Wallet Activities',
    description:
      'Track a list of assets inside the particular wallet for entering or exiting the wallet. Assets have to be with non-zero balance.',
    isNew: true,
    settings: {
      type: 'wallet_assets',
      channel: [],
      target: { address: '' },
      selector: { infrastructure: '' },
    },
  },
]
