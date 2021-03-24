import React, { useCallback } from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Toggle from '@santiment-network/ui/Toggle'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import styles from './Widgets.module.scss'

const Widgets = ({ widgets, setWidgets }) => {
  const {
    isPriceChartActive,
    isMovement,
    isPriceTreeMap,
    isVolumeTreeMap
  } = widgets

  const priceToggle = useCallback(
    isPriceChartActive => {
      setWidgets({ ...widgets, isPriceChartActive })
    },
    [widgets]
  )
  const togglePriceTreeMap = useCallback(
    isPriceTreeMap => {
      setWidgets({ ...widgets, isPriceTreeMap })
    },
    [widgets]
  )
  const toggleVolumeTreeMap = useCallback(
    isVolumeTreeMap => {
      setWidgets({ ...widgets, isVolumeTreeMap })
    },
    [widgets]
  )
  const movementToggle = useCallback(
    isMovement => {
      setWidgets({ ...widgets, isMovement })
    },
    [widgets]
  )

  return (
    <ContextMenu
      trigger={
        <Button
          variant='flat'
          className={cx(
            styles.triggerButton,
            (isPriceChartActive ||
              isPriceTreeMap ||
              isVolumeTreeMap ||
              isMovement) &&
              styles.triggerButton__active
          )}
          icon='view-option'
        >
          Infographics
        </Button>
      }
      passOpenStateAs='isActive'
      position='bottom'
      align='end'
    >
      <Panel variant='modal' className={styles.wrapper}>
        <ToggleWidget
          index={0}
          title='Price Treemap'
          isActive={isPriceTreeMap}
          toggle={() => {
            togglePriceTreeMap(!isPriceTreeMap)
          }}
        />
        <ToggleWidget
          index={0}
          title='Social Volume Treemap'
          isActive={isVolumeTreeMap}
          toggle={() => {
            toggleVolumeTreeMap(!isVolumeTreeMap)
          }}
        />
        <ToggleWidget
          index={1}
          title='Price Bar Chart'
          isActive={isPriceChartActive}
          toggle={() => {
            priceToggle(!isPriceChartActive)
          }}
        />
        <ToggleWidget
          index={2}
          title='Marketcap & Volume'
          isActive={isMovement}
          toggle={() => {
            movementToggle(!isMovement)
          }}
        />
      </Panel>
    </ContextMenu>
  )
}

const ToggleWidget = ({ index, isActive, toggle, title }) => {
  return (
    <div className={styles.widgetInfo} onClick={toggle}>
      {SVGs[index]}

      <div className={styles.label}>{title}</div>

      <Toggle
        isActive={isActive}
        className={cx(styles.toggle, isActive && styles.toggle__active)}
      />
    </div>
  )
}

const SVGs = [
  <svg width='14' height='14' fill='none'>
    <path fill='#76E5C2' d='M0 0h7v8H0z' />
    <path fill='#8358FF' d='M7 0h7v8H7z' opacity='.6' />
    <path fill='#FFAD4D' d='M0 8h14v6H0z' opacity='.8' />
  </svg>,
  <svg width='14' height='14' fill='none'>
    <path fill='#89E1C9' d='M0 0h4.7v14H0z' />
    <path fill='#8358FF' d='M9.3 4H4.6v10h4.7z' opacity='.6' />
    <path fill='#FFAD4D' d='M9.3 8H14v6H9.3z' opacity='.8' />
  </svg>,
  <svg width='14' height='14' fill='none'>
    <path fill='#8358FF' d='M7 0h7v14H7z' opacity='.6' />
    <path fill='#76E5C2' d='M0 0h7v14H0z' />
    <path
      fill='#FFAD4D'
      d='M12.5 2.2l-3.7 8-4-1.6-2.4 3.7-.8-.6 2.7-4.3 4 1.5 3.2-7.1 1 .4z'
    />
  </svg>
]

export default Widgets
