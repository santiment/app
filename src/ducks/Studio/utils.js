export const transformExchangeOutflow = (data) =>
  data.map(({ datetime, exchange_outflow }) => ({
    datetime,
    exchange_outflow: -exchange_outflow,
  }))
