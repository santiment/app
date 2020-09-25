export const MATRIX = [
  {
    label: 'Dex Traders',
    relations: [
      null, /// 'dex_traders_to_dex_traders_flow',
      'dex_traders_to_dexes_flow',
      'dex_traders_to_cexes_flow',
      'dex_traders_to_defi_flow',
      'dex_traders_to_whale_flow',
      'dex_traders_to_other_flow'
    ]
  },

  {
    label: 'Dexes',
    relations: [
      'dexes_to_dex_traders_flow',
      null, /// 'dexes_to_dexes_flow',
      'dex_to_cexes_flow',
      'dexes_to_defi_flow',
      'dexes_to_whale_flow',
      'dexes_to_other_flow'
    ]
  },

  {
    label: 'Cexes',
    relations: [
      'cexes_to_dex_traders_flow',
      'cexes_to_dex_flow',
      null, /// 'cexes_to_cexes_flow',
      'cexes_to_defi_flow',
      'cexes_to_whale_flow',
      'cexes_to_other_flow'
    ]
  },

  {
    label: 'DeFi',
    relations: [
      'defi_to_dex_traders_flow',
      'defi_to_dexes_flow',
      'defi_to_cexes_flow',
      null, /// 'defi_to_defi_flow',
      'defi_to_whale_flow',
      'defi_to_other_flow'
    ]
  },

  {
    label: 'Whales',
    relations: [
      'whale_to_dex_traders_flow',
      'whale_to_dexes_flow',
      'whale_to_cexes_flow',
      'whale_to_defi_flow',
      null, /// 'whale_to_whale_flow',
      'whale_to_other_flow'
    ]
  },

  {
    label: 'Others',
    relations: [
      'other_to_dex_traders_flow',
      'other_to_dexes_flow',
      'other_to_cexes_flow',
      'other_to_defi_flow',
      'other_to_whale_flow',
      null /// 'other_to_other_flow',
    ]
  }
]
export const MATRIX_SIZE = MATRIX.length
export const LABELS = MATRIX.map(({ label }) => label)
export const METRICS = MATRIX.flatMap(({ relations }) => relations)
export const METRICS_AMOUNT = METRICS.length
