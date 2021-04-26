import React, { Fragment, useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import MetricButton from './Button'
import { NO_GROUP } from './utils'
import { useIsBetaMode } from '../../../stores/ui'
import styles from './MetricSelector/index.module.scss'

const Group = ({
  title,
  nodes,
  activeMetrics,
  project,
  ErrorMsg,
  NewMetric,
  NewMetricsGroup,
  OpenedGroup,
  toggleMetric,
  setMetricSettingMap,
  ...rest
}) => {
  const hasGroup = title !== NO_GROUP
  const [hidden, setHidden] = useState(hasGroup && !OpenedGroup[title])

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

      <GroupNodes
        nodes={nodes}
        hidden={hidden}
        activeMetrics={activeMetrics}
        setMetricSettingMap={setMetricSettingMap}
        toggleMetric={toggleMetric}
        project={project}
        NewMetric={NewMetric}
        ErrorMsg={ErrorMsg}
        {...rest}
      />
    </>
  )
}

export const GroupNodes = ({
  nodes,
  hidden,
  activeMetrics,
  setMetricSettingMap,
  toggleMetric,
  project,
  NewMetric,
  ErrorMsg,
  btnProps = {},
  Button,
  ...rest
}) => {
  const isBeta = useIsBetaMode()

  return (
    <div
      className={cx(styles.group__list, hidden && styles.group__list_hidden)}
    >
      {nodes.map(({ item, subitems }, index) => {
        if (!item || item.hidden) {
          return null
        }

        const {
          showRoot = true,
          label,
          rootLabel = label,
          checkIsVisible
        } = item

        if (
          checkIsVisible &&
          !checkIsVisible({ ...rest, ...project, isBeta })
        ) {
          return null
        }

        return (
          <Fragment key={item.key}>
            {showRoot && (
              <Button
                index={index}
                metric={item}
                label={rootLabel}
                onClick={() => toggleMetric(item, project)}
                setMetricSettingMap={setMetricSettingMap}
                project={project}
                isActive={activeMetrics.includes(item)}
                isNew={NewMetric && NewMetric[item.key]}
                isError={ErrorMsg && ErrorMsg[item.key]}
                btnProps={btnProps}
              />
            )}
            {subitems &&
              subitems.map(subitem => {
                const { checkIsVisible, checkIsActive } = subitem
                if (
                  checkIsVisible &&
                  !checkIsVisible({ ...rest, ...project, isBeta })
                ) {
                  return null
                }

                const isActive =
                  (checkIsActive && checkIsActive(rest)) ||
                  activeMetrics.includes(subitem)

                return (
                  <Button
                    metric={subitem}
                    key={subitem.key}
                    className={showRoot && styles.advanced}
                    label={subitem.label}
                    onClick={() => toggleMetric(subitem, project)}
                    project={project}
                    showBetaLabel={!showRoot}
                    isActive={isActive}
                    isNew={NewMetric && NewMetric[subitem.key]}
                    btnProps={btnProps}
                  />
                )
              })}
          </Fragment>
        )
      })}
    </div>
  )
}

Group.defaultProps = {
  OpenedGroup: {},
  Button: MetricButton
}

export default Group
