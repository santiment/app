export const Metrics = {
  price: {
    color: 'jungle-green',
    label: 'Price'
  },
  socialVolume: {
    color: 'persimmon',
    label: 'Social Volume'
  }
}

export const getMetricCssVarColor = metric => `var(--${Metrics[metric].color})`
