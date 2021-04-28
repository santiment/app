import React, { useEffect, useState } from 'react'
import Setting from '../Setting'
import { mergeMetricSettingMap } from '../../../utils'
import { useDebounce } from '../../../../../hooks'
import BlockchainLabelsSelector from '../../../../../components/BlockchainLabelsSelector/BlockchainLabelsSelector'
import { getBlockchainLabelReadable } from '../../../../../components/BlockchainLabelsSelector/hooks'
import styles from './BlockchainLabelsSetting.module.scss'

const Trigger = ({ labels }) => (
  <div className={styles.trigger}>
    Labels:{' '}
    {labels.length > 0
      ? labels.map(getBlockchainLabelReadable).join(', ')
      : 'Click to select'}
  </div>
)

const BlockchainLabelsSetting = ({ metric, widget, rerenderWidgets }) => {
  const [labels, setLabels] = useState(() => {
    const { MetricSettingMap } = widget
    const MetricSetting = MetricSettingMap.get(metric)
    return (MetricSetting && MetricSetting.labels) || []
  })

  const debouncedRerender = useDebounce(rerenderWidgets, 700)

  useEffect(
    () => {
      if (!labels) return

      const newMap = new Map()

      newMap.set(metric, {
        labels
      })

      widget.MetricSettingMap = mergeMetricSettingMap(
        widget.MetricSettingMap,
        newMap
      )

      debouncedRerender()
    },
    [labels]
  )

  return (
    <Setting isDropdown={false}>
      <BlockchainLabelsSelector
        onChange={setLabels}
        value={labels}
        trigger={Trigger}
      />
    </Setting>
  )
}

export default BlockchainLabelsSetting
