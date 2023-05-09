import { Metric } from './index';
import BlockchainLabelsSelector from '../../../components/BlockchainLabelsSelector/BlockchainLabelsSelector'; // NOTE: It's safe to pass it as reference, because it will not be modified [@vanguard | May12, 2020]

const TOP_HOLDERS = {
  key: 'holdersCount',
  label: 'Top Holders',
  defaultValue: 10,
  constraints: {
    min: 1,
    max: 1000000
  }
};
const TOP_HOLDERS_LABELS = {
  key: 'labels',
  defaultValue: [],
  component: BlockchainLabelsSelector,
  preTransformer: labels => !labels || labels.length === 0 ? undefined : labels
};
export const MetricSettings = {
  [Metric.amount_in_top_holders.key]: [TOP_HOLDERS, TOP_HOLDERS_LABELS],
  [Metric.amount_in_exchange_top_holders.key]: [TOP_HOLDERS],
  [Metric.amount_in_non_exchange_top_holders.key]: [TOP_HOLDERS]
};