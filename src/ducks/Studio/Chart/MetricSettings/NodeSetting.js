import React, { useMemo } from 'react'
import Button from '@santiment-network/ui/Button'
import Setting from './Setting'
import { useDropdown } from './Dropdown'
import { getMetricSetting } from './utils'
import { Node, BARS } from '../../../Chart/nodes'

const NodeToLabel = {}
const buildNode = (key, label) => {
  NodeToLabel[key] = label
  return { key, label }
}

const NODES = [
  buildNode(Node.AREA, 'Area'),
  buildNode(Node.LINE, 'Line'),
  buildNode(Node.FILLED_LINE, 'Filled line'),
  buildNode(Node.GRADIENT_LINE, 'Gradient line'),
  buildNode(Node.BAR, 'Bar')
]

const NodeSetting = ({ metric, widget }) => {
  const { activeRef, close, Dropdown } = useDropdown()
  const node = useMemo(
    () => {
      const settings = widget.MetricSettingMap.get(metric)
      return (settings && settings.node) || metric.node
    },
    [widget.MetricSettingMap, metric]
  )

  function onChange (newNode) {
    const newMap = new Map(widget.MetricSettingMap)
    const metricSetting = getMetricSetting(newMap, metric)

    if (
      newNode === metric.node ||
      (newNode === Node.BAR && BARS.has(metric.node))
    ) {
      delete metricSetting.node
    } else {
      metricSetting.node = newNode
    }

    widget.MetricSettingMap = newMap

    close()
    widget.rerender()
  }

  return (
    <Dropdown trigger={<Setting>Node: {NodeToLabel[node]}</Setting>}>
      {NODES.map(({ key, label }) => (
        <Button
          key={key}
          variant='ghost'
          isActive={node === key}
          onClick={() => onChange(key)}
          forwardedRef={node === key ? activeRef : undefined}
        >
          {label}
        </Button>
      ))}
    </Dropdown>
  )
}

export default NodeSetting
