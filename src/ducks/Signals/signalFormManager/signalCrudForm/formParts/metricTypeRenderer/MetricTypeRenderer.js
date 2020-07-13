import React, { useState } from 'react'
import MetricIcons from '../metricTypes/MetricIcons'
import HelpPopup from '../../../../../../components/HelpPopup/HelpPopup'
import metricStyles from '../metricTypes/TriggerFormMetricTypes.module.scss'

const MetricTypeRenderer = ({ metric = {}, onClick, showLabel = true }) => {
  const { label, description } = metric

  const [isHovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => onClick(metric)}
      className={metricStyles.metric}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={metricStyles.iconBlock}>
        <MetricIcons metric={metric} isActive={isHovered} />
      </div>
      <div className={metricStyles.textBlocks}>
        <div className={metricStyles.texts}>
          <div className={metricStyles.type}>{label}</div>
          {!showLabel && <HelpPopup on='hover'>{description}</HelpPopup>}
        </div>
        {showLabel && (
          <div className={metricStyles.label}>Change alert type</div>
        )}
      </div>
    </div>
  )
}

export default MetricTypeRenderer
