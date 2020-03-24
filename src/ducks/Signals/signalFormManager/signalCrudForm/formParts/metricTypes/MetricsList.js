import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { NO_GROUP } from '../../../../../Studio/Sidebar/utils'
import styles from './MetricsList.module.scss'

const MetricsList = ({ metrikKey, list, onSelect }) => {
  const [isOpen, setOpen] = useState(false)

  const keys = Object.keys(list)

  return (
    <div className={styles.container}>
      <div
        className={cx(styles.title, isOpen && styles.open)}
        onClick={() => setOpen(!isOpen)}
      >
        {metrikKey}
        <Icon type={isOpen ? 'arrow-up' : 'arrow-down'} />
      </div>

      {isOpen && (
        <div className={styles.list}>
          {keys.map(key => (
            <Group
              key={key}
              groupLabel={key}
              group={list[key]}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const Group = ({ groupLabel, onSelect, group }) => {
  return (
    <>
      {groupLabel !== NO_GROUP && (
        <div className={styles.group}>{groupLabel}</div>
      )}
      {group.map(metric => (
        <div
          key={metric.key}
          className={styles.item}
          onClick={() => onSelect(metric)}
        >
          {metric.label}
        </div>
      ))}
    </>
  )
}

export default MetricsList
