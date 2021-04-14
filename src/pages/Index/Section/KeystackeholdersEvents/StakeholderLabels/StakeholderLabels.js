import React, { useMemo } from 'react'
import cx from 'classnames'
import { READABLE_NAMES } from '../hooks'
import Panel from '@santiment-network/ui/Panel'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import styles from './StakeholderLabels.module.scss'

const MAX_COUNT = 6

const Label = ({ label, hidden, toggle }) => {
  return (
    <div
      key={label}
      className={cx(styles.label, hidden[label] && styles.label__hidden)}
      onClick={() => toggle(label)}
    >
      {READABLE_NAMES[label] || label}
    </div>
  )
}

const StakeholderLabels = ({ labels, hidden, setHidden }) => {
  const visibleLabels = useMemo(
    () => {
      return labels.slice(0, MAX_COUNT)
    },
    [labels]
  )

  const unvisibleLabels = useMemo(
    () => {
      return labels.slice(MAX_COUNT)
    },
    [labels]
  )

  function toggle (label) {
    if (hidden[label]) {
      delete hidden[label]
      setHidden({
        ...hidden
      })
    } else {
      setHidden({
        ...hidden,
        [label]: true
      })
    }
  }

  if (labels.length === 0) {
    return null
  }

  return (
    <div className={styles.container}>
      {visibleLabels.map(label => (
        <Label key={label} hidden={hidden} label={label} toggle={toggle}>
          {READABLE_NAMES[label] || label}
        </Label>
      ))}

      {labels.length > MAX_COUNT && (
        <ContextMenu
          passOpenStateAs='data-isactive'
          position='bottom'
          align='start'
          className={styles.dropdown}
          trigger={
            <div className={styles.label}>+{unvisibleLabels.length}</div>
          }
        >
          <Panel className={styles.panel}>
            {unvisibleLabels.map(label => (
              <Label key={label} hidden={hidden} label={label} toggle={toggle}>
                {READABLE_NAMES[label] || label}
              </Label>
            ))}

            {Object.keys(hidden).length !== labels.length && (
              <div
                className={cx(styles.label, styles.deselect)}
                onClick={() =>
                  setHidden(
                    labels.reduce((acc, l) => {
                      acc[l] = true
                      return acc
                    }, {})
                  )
                }
              >
                Deselect all
              </div>
            )}
          </Panel>
        </ContextMenu>
      )}
    </div>
  )
}

export default StakeholderLabels
