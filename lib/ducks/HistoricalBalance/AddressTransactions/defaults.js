import { getIntervalByTimeRange } from '../../../utils/dates';
export const getItemKey = ({
  trxHash
}) => trxHash;
const DEFAULT_TIME_RANGE = '3m';
const {
  from: FROM,
  to: TO
} = getIntervalByTimeRange(DEFAULT_TIME_RANGE);
export const DEFAULT_SETTINGS = {
  from: FROM.toISOString(),
  to: TO.toISOString()
};