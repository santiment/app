export const buildTextSelectorMetric = ({ metric, text }) =>
  metric.extraSelector === 'text'
    ? Object.assign(Object.create(null), { ...metric, reqMeta: { text } })
    : metric
