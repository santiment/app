import React from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import styles from './MetricBtns.module.scss'

const MetricBtns = ({ metrics, onClear, removeMetric }) => {
  return (
    <div className={styles.container}>
      {metrics.map(metric => {
        const { label } = metric
        return (
          <Button border key={label} className={styles.btn}>
            {label}

            <Icon
              type='close-small'
              className={styles.closeIcon}
              onClick={() => removeMetric(metric)}
            />
          </Button>
        )
      })}

      {metrics.length > 0 && (
        <Button
          onClick={onClear}
          border
          accent='negative'
          className={styles.clearBtn}
        >
          Clear selected
        </Button>
      )}
    </div>
  )
}

export default MetricBtns
