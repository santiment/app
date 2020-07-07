import React from 'react'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Icon from '@santiment-network/ui/Icon'
import Toggle from '@santiment-network/ui/Toggle'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import styles from './Widgets.module.scss'
import TopPanel from './index'

const Widgets = ({
  isAuthor,
  id,
  name,
  shareLink,
  widgets: { isPriceChart, isPriceTreeMap, isVolumeTreeMap } = {},
  togglers: { priceToggle, togglePriceTreeMap, toggleVolumeTreeMap } = {}
}) => {
  return (
    <ContextMenu
      trigger={
        <Button variant='flat' className={styles.triggerButton}>
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'>
            <path
              fill-rule='evenodd'
              d='M1 1h4.86v4.86H1V1zM0 1a1 1 0 011-1h4.86a1 1 0 011 1v4.86a1 1 0 01-1 1H1a1 1 0 01-1-1V1zm10.14 0H15v4.86h-4.86V1zm-1 0a1 1 0 011-1H15a1 1 0 011 1v4.86a1 1 0 01-1 1h-4.86a1 1 0 01-1-1V1zM15 10.14h-4.86V15H15v-4.86zm-4.86-1a1 1 0 00-1 1V15a1 1 0 001 1H15a1 1 0 001-1v-4.86a1 1 0 00-1-1h-4.86zm-9.14 1h4.86V15H1v-4.86zm-1 0a1 1 0 011-1h4.86a1 1 0 011 1V15a1 1 0 01-1 1H1a1 1 0 01-1-1v-4.86z'
              clip-rule='evenodd'
            />
          </svg>
        </Button>
      }
      passOpenStateAs='isActive'
      position='bottom'
      align='end'
    >
      <Panel variant='modal' className={styles.wrapper}>
        <ToggleWidget
          index={1}
          title='Top 10: Price up'
          isActive={isPriceTreeMap}
          toggle={() => togglePriceTreeMap(!isPriceTreeMap)}
        />
        <ToggleWidget
          index={1}
          title='Top 10: Social volume'
          isActive={isVolumeTreeMap}
          toggle={() => toggleVolumeTreeMap(!isVolumeTreeMap)}
        />
        <ToggleWidget
          index={0}
          title='Price changes, %'
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

      <Toggle isActive={isActive} onClick={toggle} className={styles.toggle} />
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
