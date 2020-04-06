import { Metric } from '../../../dataHub/metrics'
import { suggestPercentUpDown, suggestValueChange } from './price'

export const socialVolumeSuggesters = [
  suggestValueChange(Metric.social_volume_total),
  suggestPercentUpDown(Metric.social_volume_total)
]
