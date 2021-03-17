import React, { useMemo } from 'react'
import UIButton from '@santiment-network/ui/Button'
import Setting from './Setting'
import { useDropdown } from './Dropdown'
import { getMetricSetting } from '../../utils'
import { Node, BARS } from '../../../Chart/nodes'

const NodeToLabel = {
  [Node.BAR]: 'Bar'
}
const buildNode = (id, label) => {
  NodeToLabel[id] = label
  return { id, label }
}

const NODES = [
  buildNode(Node.AREA, 'Area'),
  buildNode(Node.LINE, 'Line'),
  buildNode(Node.FILLED_LINE, 'Filled line'),
  buildNode(Node.GRADIENT_LINE, 'Gradient line'),
  buildNode(Node.AUTO_WIDTH_BAR, 'Bar')
]
const CANDLES_NODE = buildNode(Node.CANDLES, 'Candles')

const Button = ({ id, label, activeKey, activeRef, onChange }) => (
  <UIButton
    variant='ghost'
    isActive={activeKey === id}
    onClick={() => onChange(id)}
    forwardedRef={activeKey === id ? activeRef : undefined}
  >
    {label}
  </UIButton>
)

const NodeSetting = ({ metric, widget, rerenderWidgets }) => {
  const { activeRef, close, Dropdown } = useDropdown()
  const node = useMemo(
    () => {
      const settings = widget.MetricSettingMap.get(metric)
      const node = (settings && settings.node) || metric.node
      return BARS.has(node) ? Node.AUTO_WIDTH_BAR : node
    },
    [widget.MetricSettingMap, metric]
  )

  function onChange (newNode) {
    const newMap = new Map(widget.MetricSettingMap)
    const metricSetting = getMetricSetting(newMap, metric)

    if (
      newNode === metric.node ||
      (newNode === Node.AUTO_WIDTH_BAR && BARS.has(metric.node))
    ) {
      delete metricSetting.node
    } else {
      metricSetting.node = newNode
    }

    widget.MetricSettingMap = newMap

    close()
    rerenderWidgets()
  }

  return (
    <Dropdown trigger={<Setting>Style: {NodeToLabel[node]}</Setting>}>
      {!metric.indicator && (metric.base || metric).key === 'price_usd' && (
        <Button
          {...CANDLES_NODE}
          activeKey={node}
          activeRef={activeRef}
          onChange={onChange}
        />
      )}
      {NODES.map(nodeType => (
        <Button
          key={nodeType.id}
          {...nodeType}
          activeKey={node}
          activeRef={activeRef}
          onChange={onChange}
        />
      ))}
    </Dropdown>
  )
}

export default NodeSetting
