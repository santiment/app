import React from 'react'
import cx from 'classnames'
import Svg from 'webkit/ui/Svg/react'
import styles from './NavItem.module.scss'

const NavItem = ({ isActive, activeSub, setActive, setActiveSubItem, ...item }) => {
  const { title, subItems } = item

  let subNav = null

  if (activeSub) {
    subNav = (
      <ul className={cx(styles.subWrapper)}>
        {subItems.map((subItem) => {
          const isActiveSub = subItem.key === activeSub.key

          return (
            <li
              key={subItem.key}
              className={cx(
                styles.subItemWrapper,
                isActiveSub && styles.activeSub,
                'mrg-xs mrg--b',
              )}
            >
              <button
                className={cx(styles.subItem, 'btn')}
                onClick={() => setActiveSubItem(subItem)}
              >
                {subItem.title}
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <li className={styles.wrapper}>
      <button
        className={cx(styles.item, isActive && styles.active, 'btn row v-center justify')}
        onClick={() => setActive(item)}
      >
        <span>{title}</span>
        {subItems && (
          <div className={cx(styles.arrowIcon, 'row hv-center')}>
            <Svg id='arrow-right' h={8} w={5} />
          </div>
        )}
      </button>
      {subNav}
    </li>
  )
}

export default NavItem
