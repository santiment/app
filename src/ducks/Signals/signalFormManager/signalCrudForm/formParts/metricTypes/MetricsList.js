import React, { useMemo } from 'react'
import cx from 'classnames'
import { GroupNodes } from '../../../../../Studio/Sidebar/Group'
import { getAssetNewMetrics } from '../../../../../dataHub/metrics/news'
import ExpansionItem from '../../../../../../components/ExpansionItem/ExpansionItem'
import MetricButton from '../../../../../Studio/Sidebar/Button'
import styles from './MetricsList.module.scss'

export const NO_GROUP = '_'

const getSelectedCount = (groupItems, selected) =>
  groupItems.reduce((acc, data) => {
    const { item, subitems } = data

    let calculated = selected.indexOf(item) !== -1 ? 1 : 0
    if (subitems && subitems.length > 0) {
      calculated += getSelectedCount(subitems, selected)
    }

    return acc + calculated
  }, 0)

const noop = () => {}

const MetricsList = ({
  index,
  metrikKey,
  list,
  onSelect,
  project,
  selected = [],
  availableMetrics = [],
  isBeta,
  selectedMetricSettingsMap,
  setSelectedMetricSettingsMap = noop
}) => {
  const keys = useMemo(() => Object.keys(list), [list])

  const selectedCount = useMemo(
    () => {
      if (selected.length === 0) {
        return 0
      }

      return keys.reduce((acc, key) => {
        const groupItems = list[key]
        return acc + getSelectedCount(groupItems, selected)
      }, 0)
    },
    [keys, selected]
  )

  const newMetricsProps = getAssetNewMetrics(availableMetrics, {
    slug: project ? project.slug : undefined,
    isBeta
  })

  const { NewMetricsCategory } = newMetricsProps

  return (
    <ExpansionItem
      isOpen={index === 0}
      title={
        <div className={NewMetricsCategory[metrikKey] && styles.news}>
          {metrikKey}

          {selectedCount > 0 && (
            <span className={styles.counter}>({selectedCount})</span>
          )}
        </div>
      }
    >
      <div className={styles.list}>
        {keys.map(key => {
          const items = list[key]
          return (
            <Group
              key={key}
              groupLabel={key}
              group={items}
              onSelect={onSelect}
              project={project}
              selected={selected}
              selectedMetricSettingsMap={selectedMetricSettingsMap}
              setMetricSettingMap={setSelectedMetricSettingsMap}
              {...newMetricsProps}
            />
          )
        })}
      </div>
    </ExpansionItem>
  )
}

const Group = ({ groupLabel, onSelect, group, project, selected, ...rest }) => {
  if (group.length === 0) {
    return null
  }

  const { NewMetricsGroup } = rest

  return (
    <>
      {groupLabel !== NO_GROUP && (
        <div
          className={cx(
            styles.group,
            NewMetricsGroup[groupLabel] && styles.news
          )}
        >
          {groupLabel}
        </div>
      )}
      <GroupNodes
        nodes={group}
        activeMetrics={selected}
        toggleMetric={onSelect}
        project={project}
        btnProps={{
          btnClassName: styles.metricBtn,
          infoClassName: styles.info,
          tooltipPosition: 'top'
        }}
        Button={MetricButton}
        {...rest}
      />
    </>
  )
}

export default MetricsList
