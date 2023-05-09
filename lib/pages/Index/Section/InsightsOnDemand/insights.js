import { MetricColor } from '../../../../ducks/Chart/colors';
import { newProjectMetric } from '../../../../ducks/Studio/metrics';
export const mapProjectMetrics = (project, metrics) => metrics.map(metric => newProjectMetric(project, metric));
export function setupMetricColors(metrics) {
  const colors = {};
  metrics.forEach(({
    key,
    base
  }) => {
    colors[key] = MetricColor[base.key];
  });
  return colors;
}