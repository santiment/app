import React, { useMemo } from 'react'
import Setting from './Setting'
import Input from './Input'
import { mergeMetricSettingMap } from '../../utils'
import { useDebounce } from '../../../../hooks/index'

const TopHoldersSetting = ({ metric, widget, rerenderWidgets }) => {
  const defaultValue = useMemo(() => {
    const { MetricSettingMap } = widget
    const MetricSetting = MetricSettingMap.get(metric)
    return MetricSetting && MetricSetting.holdersCount
  }, [])
  const debouncedRerender = useDebounce(rerenderWidgets, 700)

  function onChange (holdersCount) {
    const newMap = new Map()

    newMap.set(metric, {
      holdersCount
    })

    widget.MetricSettingMap = mergeMetricSettingMap(
      widget.MetricSettingMap,
      newMap
    )

    debouncedRerender()
  }

  return (
    <Setting isDropdown={false}>
      Top Holders
      <Input type='number' onChange={onChange} defaultValue={defaultValue} />
    </Setting>
  )
}

export default TopHoldersSetting
