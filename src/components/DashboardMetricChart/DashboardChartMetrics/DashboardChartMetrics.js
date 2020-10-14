import React, { useCallback } from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import ProjectIcon from '../../ProjectIcon/ProjectIcon'
import { usePressedModifier } from '../../../hooks/keyboard'
import styles from './DashboardChartMetrics.module.scss'

const DashboardMetricButton = ({ children, isDisabled, ...rest }) => {
  return (
    <Button
      border
      className={cx(styles.assetBtn, isDisabled && styles.disabled)}
      {...rest}
    >
      {children}
    </Button>
  )
}

const DashboardChartMetrics = ({
  metrics,
  loadings,
  disabledMetrics,
  toggleDisabled,
  colors,
  dataKey = 'key'
}) => {
  const PressedModifier = usePressedModifier()

  const onMetricClick = useCallback(
    metric => {
      const clickedKey = metric[dataKey]

      if (PressedModifier.cmdKey) {
        const newDisabled = metrics.reduce((acc, metric) => {
          const key = metric[dataKey]
          if (key !== clickedKey) {
            acc[key] = true
          }

          return acc
        }, {})

        toggleDisabled(newDisabled)
      } else {
        if (disabledMetrics[clickedKey]) {
          delete disabledMetrics[clickedKey]
        } else {
          disabledMetrics[clickedKey] = true
        }

        toggleDisabled({ ...disabledMetrics })
      }
    },
    [PressedModifier, toggleDisabled, disabledMetrics, dataKey]
  )

  return (
    <div className={styles.container}>
      {metrics &&
        metrics.map(metric => {
          const { label } = metric
          const key = metric[dataKey]
          const color = colors[key]
          return (
            <DashboardMetricButton
              key={label}
              isLoading={loadings.includes(metric)}
              onClick={() => onMetricClick(metric)}
              isDisabled={disabledMetrics[key]}
            >
              <div className={cx(styles.btnInner, styles.icon)}>
                <svg
                  width='14'
                  height='10'
                  viewBox='0 0 14 10'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M11 5C11 7.20914 9.20914 9 7 9C4.79086 9 3 7.20914 3 5M11 5C11 2.79086 9.20914 1 7 1C4.79086 1 3 2.79086 3 5M11 5H13M3 5H1'
                    stroke={disabledMetrics[key] ? 'var(--casper)' : color}
                    strokeWidth='1.2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>

              <div className={styles.divider} />

              {dataKey === 'slug' && (
                <ProjectIcon
                  size={18}
                  slug={key}
                  className={styles.projectIcon}
                />
              )}

              <div className={styles.btnInner}>{label}</div>
            </DashboardMetricButton>
          )
        })}
    </div>
  )
}

export default DashboardChartMetrics
