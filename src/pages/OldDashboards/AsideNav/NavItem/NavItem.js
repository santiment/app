import React from 'react'
import cx from 'classnames'
import Tooltip from '@santiment-network/ui/Tooltip'
import Icon from '@santiment-network/ui/Icon'
import { scrollToCurrentAnchor } from '../../utils'
import styles from './NavItem.module.scss'

const Trigger = ({ forwardedRef, isActive, ...props }) => (
  <div
    ref={forwardedRef}
    {...props}
    className={cx('btn row hv-center', styles.trigger, isActive && styles.triggerActive)}
  >
    <Icon type='info-round' />
  </div>
)

const NavItem = ({
  name,
  description,
  submenu,
  onClick,
  isActive,
  currentAnchor,
  setCurrentAnchor,
  currentDashboard,
}) => {
  if (!isActive) {
    return (
      <div onClick={onClick} className={cx(styles.wrapper, 'row justify v-center btn body-3')}>
        {name}
        {description && (
          <Tooltip
            passOpenStateAs='isActive'
            trigger={<Trigger />}
            position='right'
            className={cx(styles.tooltip, 'border box')}
          >
            <div className='relative column body-3'>{description}</div>
          </Tooltip>
        )}
      </div>
    )
  }

  function handleSelectAnchor(anchor) {
    return () => {
      setCurrentAnchor(anchor)

      scrollToCurrentAnchor({ hash: anchor.key, currentDashboard })
    }
  }

  return (
    <div className={cx('border', styles.active, !submenu && styles.noSubmenu)}>
      <div className={cx('txt-m', submenu && 'mrg--b mrg-l')}>{name}</div>
      {submenu && (
        <div className={cx('column mrg--l mrg-s', styles.submenuWrapper)}>
          {submenu.map((menuItem) => {
            const isActiveAnchor = currentAnchor && currentAnchor.key === menuItem.key
            const onClick = menuItem.key ? handleSelectAnchor(menuItem) : undefined
            const groupClass = !menuItem.key && cx('caption', styles.groupTitle)

            return (
              <div
                key={menuItem.title}
                className={cx(
                  'btn',
                  styles.menuItem,
                  groupClass,
                  isActiveAnchor && styles.activeAnchor,
                )}
                onClick={onClick}
              >
                {menuItem.title}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default NavItem
