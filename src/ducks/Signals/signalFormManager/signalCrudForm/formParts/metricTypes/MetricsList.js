import React, { useMemo } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { Description } from '../../../../../dataHub/metrics/descriptions'
import HelpPopup from '../../../../../../components/HelpPopup/HelpPopup'
import MetricDescription from '../../../../../SANCharts/MetricDescription/MetricDescription'
import styles from './MetricsList.module.scss'
import { useDialogState } from '../../../../../../hooks/dialog'

export const NO_GROUP = '_'

const calculateWithSubitems = (groupItems, selected) =>
  groupItems.reduce((acc, data) => {
    const { item, subitems } = data

    let calculated = selected.indexOf(item) !== -1 ? 1 : 0
    if (subitems.length > 0) {
      calculated += calculateWithSubitems(subitems, selected)
    }

    return acc + calculated
  }, 0)

const MetricsList = ({
  index,
  metrikKey,
  list,
  onSelect,
  project,
  selected = [],
  showIcons = false
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
        return acc + calculateWithSubitems(groupItems, selected)
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
                showIcons={showIcons}
                selected={selected}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

const Group = ({
  groupLabel,
  onSelect,
  group,
  project,
  selected,
  showIcons
}) => {
  if (group.length === 0) {
    return null
  }

  return (
    <>
      {groupLabel !== NO_GROUP && (
        <div className={styles.group}>{groupLabel}</div>
      )}
      {group.map(({ item: metric }) => {
        const isActive = showIcons && selected.some(m => m === metric)
        return (
          <div
            key={metric.key}
            className={cx(styles.item, isActive && styles.itemActive)}
            onClick={() => onSelect(metric)}
          >
            <div className={styles.left}>
              {showIcons && (
                <Icon
                  type='plus-small'
                  className={cx(styles.plus, isActive && styles.active)}
                />
              )}
              <span className={styles.name}>{metric.label}</span>
            </div>
            {Description[metric.key] && (
              <HelpPopup on='hover'>
                <MetricDescription metric={metric} project={project} />
              </HelpPopup>
            )}
          </div>
        )
      })}
    </>
  )
}

export default MetricsList
