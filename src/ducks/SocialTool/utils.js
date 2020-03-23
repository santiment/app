export const buildTextSelectorMetric = ({ metric, text }) =>
  metric.supportTextSelector
    ? Object.assign(Object.create(null), { ...metric, reqMeta: { text } })
    : metric
