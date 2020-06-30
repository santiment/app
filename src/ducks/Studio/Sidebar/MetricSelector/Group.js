import React, { Fragment, useState } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Icon from '@santiment-network/ui/Icon'
import MetricButton from './MetricButton'
import { NO_GROUP } from '../utils'
import styles from './index.module.scss'

const Group = ({
  title,
  nodes,
  activeMetrics,
  toggleMetric,
  isBeta,
  setMetricSettingMap,
  project,
}) => {
  const hasGroup = title !== NO_GROUP
  const [hidden, setHidden] = useState(hasGroup)

  function onToggleClick() {
    setHidden(!hidden)
  }

  return (
    <>
      {hasGroup && (
        <h4 className={styles.group} onClick={onToggleClick}>
          <Icon
            type='arrow-right-big'
            className={cx(styles.toggle, hidden && styles.toggle_active)}
          />
          {title}
        </h4>
      )}
      <div
        className={cx(styles.group__list, hidden && styles.group__list_hidden)}
      >
        {nodes.map(({ item, subitems }) => {
          const { hidden, isBeta: isBetaMetric, selectable = true } = item

          if (hidden) {
            return null
          }

          if (isBetaMetric && !isBeta) {
            return null
          }

          return (
            <Fragment key={item.key}>
              <MetricButton
                metric={item}
                label={item.label}
                onClick={() => toggleMetric(item)}
                setMetricSettingMap={setMetricSettingMap}
                project={project}
                isActive={activeMetrics.includes(item)}
                showTooltip={item.showTooltip}
                isDisabled={!selectable}
              />
              {subitems &&
                subitems.map((subitem) => (
                  <MetricButton
                    metric={subitem}
                    key={subitem.key}
                    className={styles.advanced}
                    label={subitem.label}
                    onClick={() => toggleMetric(subitem)}
                    project={project}
                    showBetaLabel={false}
                  />
                ))}
            </Fragment>
          )
        })}
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  isBeta: state.rootUi.isBetaModeEnabled,
})

export default connect(mapStateToProps)(Group)
