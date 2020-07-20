import React, { useMemo } from 'react'
import Setting from './Setting'
import Input from './Input'
import { mergeMetricSettingMap } from '../../utils'

const TopHoldersSetting = ({ metric, widget, rerenderWidgets }) => {
  const { MetricSettingMap } = widget
  const defaultValue = useMemo(() => {
    const MetricSetting = MetricSettingMap.get(metric)
    return MetricSetting && MetricSetting.holdersCount
  }, [])

  function onChange (holdersCount) {
    const newMap = new Map()

    newMap.set(metric, {
      holdersCount
    })

    widget.MetricSettingMap = mergeMetricSettingMap(
      widget.MetricSettingMap,
      newMap
    )

    rerenderWidgets()
  }

  return (
    <Setting isDropdown={false}>
      Top Holders
      <Input type='number' onChange={onChange} defaultValue={defaultValue} />
    </Setting>
  )
}

export default TopHoldersSetting
