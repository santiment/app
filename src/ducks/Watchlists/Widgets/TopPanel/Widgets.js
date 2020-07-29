import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Toggle from '@santiment-network/ui/Toggle'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel/Panel'
import styles from './Widgets.module.scss'

const Widgets = ({
  widgets: { isPriceChart, isPriceTreeMap, isVolumeTreeMap } = {},
  togglers = {}
}) => {
  const { priceToggle, togglePriceTreeMap } = togglers
  const [isOpen, setOpen] = useState(false)

  useEffect(
    () => {
      setTimeout(() => setOpen(false), 300)
    },
    [togglers]
  )

  return (
    <ContextMenu
      open={isOpen}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      trigger={
        <Button variant='flat' className={styles.triggerButton}>
          <Icon type='view-option' />
        </Button>
      }
      passOpenStateAs='isActive'
      position='bottom'
      align='end'
    >
      <Panel variant='modal' className={styles.wrapper}>
        <ToggleWidget
          index={1}
          title='Price Treemap'
          isActive={isPriceTreeMap}
          toggle={() => togglePriceTreeMap(!isPriceTreeMap)}
        />
        <ToggleWidget
          index={0}
          title='Price Bar chart'
          isActive={isPriceChart}
          toggle={() => priceToggle(!isPriceChart)}
        />
      </Panel>
    </ContextMenu>
  )
}

const ToggleWidget = ({ index, isActive, toggle, title }) => {
  return (
    <div className={styles.widgetInfo}>
      {SVGs[index]}

      <div className={styles.label}>{title}</div>

      <Toggle
        isActive={isActive}
        onClick={toggle}
        className={cx(styles.toggle, isActive && styles.toggle__active)}
      />
    </div>
  )
}

const SVGs = [
  <svg
    width='14'
    height='14'
    viewBox='0 0 14 14'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect width='4.66667' height='14' fill='var(--jungle-green)' />
    <rect
      width='4.66662'
      height='10'
      transform='matrix(-1 0 0 1 9.33203 4)'
      fill='#E7E4FF'
    />
    <rect
      x='9.33203'
      y='8'
      width='4.66662'
      height='6'
      fill='var(--texas-rose)'
    />
  </svg>,
  <svg
    width='14'
    height='14'
    viewBox='0 0 14 14'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect width='7' height='8' fill='#DCF6EF' />
    <rect x='7' width='7' height='8' fill='#E7E4FF' />
    <rect y='8' width='14' height='6' fill='#FFE7CA' />
  </svg>
]

export default Widgets
