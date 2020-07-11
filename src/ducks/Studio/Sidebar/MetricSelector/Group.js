import React, { Fragment, useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import MetricButton from './MetricButton'
import { NO_GROUP } from '../utils'
import styles from './index.module.scss'

const Group = ({
  title,
  nodes,
  activeMetrics,
  project,
  NewMetric,
  NewMetricsGroup,
  toggleMetric,
  isBeta,
  setMetricSettingMap,
  ...rest
}) => {
  const hasGroup = title !== NO_GROUP
  const [hidden, setHidden] = useState(hasGroup)

  function onToggleClick () {
    setHidden(!hidden)
  }

  return (
    <>
      {hasGroup && (
        <h4
          className={cx(styles.group, NewMetricsGroup[title] && styles.news)}
          onClick={onToggleClick}
        >
          <Icon
            type='arrow-right-small'
            className={cx(styles.toggle, hidden && styles.toggle_active)}
          />
          {title}
        </h4>
      )}
      <div
        className={cx(styles.group__list, hidden && styles.group__list_hidden)}
      >
        {nodes.map(({ item, subitems }) => {
          const {
            hidden,
            isBeta: isBetaMetric,
            selectable = true,
            label,
            rootLabel = label,
            checkIsVisible
          } = item

          if (hidden) {
            return null
          }

          if (isBetaMetric && !isBeta) {
            return null
          }

          if (checkIsVisible && !checkIsVisible(rest)) {
            return null
          }

          return (
            <Fragment key={item.key}>
              <MetricButton
                metric={item}
                label={rootLabel}
                onClick={() => toggleMetric(item)}
                setMetricSettingMap={setMetricSettingMap}
                project={project}
                isActive={activeMetrics.includes(item)}
                isDisabled={!selectable}
                isNew={NewMetric[item.key]}
              />
              {subitems &&
                subitems.map(subitem => {
                  const { checkIsVisible, checkIsActive } = subitem
                  if (checkIsVisible && !checkIsVisible(rest)) {
                    return null
                  }

                  const isActive = checkIsActive && checkIsActive(rest)

                  return (
                    <MetricButton
                      metric={subitem}
                      key={subitem.key}
                      className={styles.advanced}
                      label={subitem.label}
                      onClick={() => toggleMetric(subitem)}
                      project={project}
                      showBetaLabel={false}
                      isActive={isActive}
                      isNew={NewMetric[subitem.key]}
                    />
                  )
                })}
            </Fragment>
          )
        })}
      </div>
    </>
  )
}

export default Group
