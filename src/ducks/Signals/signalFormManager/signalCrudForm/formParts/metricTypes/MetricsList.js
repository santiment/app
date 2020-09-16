import React, { useMemo } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { useDialogState } from '../../../../../../hooks/dialog'
import { GroupNodes } from '../../../../../Studio/Sidebar/Group'
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

const MetricsList = ({
  index,
  metrikKey,
  list,
  onSelect,
  project,
  selected = []
}) => {
  const { openDialog, isOpened, closeDialog } = useDialogState(index === 0)

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

  return (
    <div className={styles.container}>
      <div
        className={styles.title}
        onClick={isOpened ? closeDialog : openDialog}
      >
        <div>
          {metrikKey}

          {selectedCount > 0 && (
            <span className={styles.counter}>({selectedCount})</span>
          )}
        </div>

        <Icon
          className={cx(styles.arrow, isOpened && styles.arrowOpened)}
          type={isOpened ? 'arrow-up-big' : 'arrow-down-big'}
        />
      </div>

      {isOpened && (
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
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

const noop = () => {}

const Group = ({ groupLabel, onSelect, group, project, selected, ...rest }) => {
  if (group.length === 0) {
    return null
  }

  return (
    <>
      {groupLabel !== NO_GROUP && (
        <div className={styles.group}>{groupLabel}</div>
      )}
      <GroupNodes
        nodes={group}
        activeMetrics={selected}
        setMetricSettingMap={noop}
        toggleMetric={onSelect}
        project={project}
        btnProps={{
          variant: undefined,
          btnClassName: styles.metricBtn,
          infoClassName: styles.info,
          tooltipPosition: 'top'
        }}
        {...rest}
      />
    </>
  )
}

export default MetricsList
