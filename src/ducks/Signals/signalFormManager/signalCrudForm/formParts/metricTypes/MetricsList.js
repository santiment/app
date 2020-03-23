import React, { useState } from 'react'
import Icon from '@santiment-network/ui/Icon'
import styles from './MetricsList.module.scss'

const MetricsList = ({ metrikKey, list, onSelect }) => {
  console.log(metrikKey, list)
  const [isOpen, setOpen] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.title} onClick={() => setOpen(!isOpen)}>
        {metrikKey}
        <Icon type={isOpen ? 'arrow-up' : 'arrow-down'} />
      </div>

      {isOpen && (
        <div className={styles.list}>
          {list.map(metric => (
            <div
              key={metric.key}
              className={styles.item}
              onClick={() => onSelect(metric)}
            >
              {metric.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MetricsList
