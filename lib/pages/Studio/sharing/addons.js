import { SelectorNode } from 'studio/metrics/selector';
export function shareChartAddons(chartAddons) {
  const items = chartAddons || [];
  if (items.length === 0) return;
  return items.map(({
    key
  }) => key);
}
export function parseChartAddons(chartAddons) {
  const items = chartAddons || [];
  return items.map(key => SelectorNode[key]).filter(Boolean);
}