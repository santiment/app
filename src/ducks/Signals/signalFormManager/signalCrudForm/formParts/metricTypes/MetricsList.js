import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { Description } from '../../../../../dataHub/metrics/descriptions'
import HelpPopup from '../../../../../../components/HelpPopup/HelpPopup'
import MetricDescription from '../../../../../SANCharts/MetricDescription/MetricDescription'
import styles from './MetricsList.module.scss'

export const NO_GROUP = '_'

const MetricsList = ({ metrikKey, list, onSelect, project }) => {
  const [isOpen, setOpen] = useState(false)

  const keys = Object.keys(list)

  return (
    <div className={styles.container}>
      <div
        className={cx(styles.title, isOpen && styles.open)}
        onClick={() => setOpen(!isOpen)}
      >
        {metrikKey}
        <Icon
          type={isOpen ? 'arrow-up' : 'arrow-down'}
          className={styles.ddIcon}
        />
      </div>

      {isOpen && (
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
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

const Group = ({ groupLabel, onSelect, group, project }) => {
  return (
    <>
      {groupLabel !== NO_GROUP && (
        <div className={styles.group}>{groupLabel}</div>
      )}
      {group.map(({ item: metric }) => (
        <div
          key={metric.key}
          className={styles.item}
          onClick={() => onSelect(metric)}
        >
          {metric.label}

          {Description[metric.key] && (
            <HelpPopup position='bottom' align='start'>
              <MetricDescription metric={metric} project={project} />
            </HelpPopup>
          )}
        </div>
      ))}
    </>
  )
}

export default MetricsList
