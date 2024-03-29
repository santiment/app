import React from 'react'
import cx from 'classnames'
import Svg from 'webkit/ui/Svg/react'
import styles from './NavItem.module.scss'

const SubItem = ({ subItem, activeSub, scrollToSubItem }) => {
  const { key, title } = subItem
  const isActiveSub = key === activeSub.key

  function handleSubItemClick() {
    scrollToSubItem(subItem)
  }

  return (
    <li className={cx(styles.subItemWrapper, isActiveSub && styles.activeSub, 'mrg-xs mrg--b')}>
      <button className={cx(styles.subItem, 'btn')} onClick={handleSubItemClick}>
        {title}
      </button>
    </li>
  )
}

const NavItem = ({ isActive, activeSub, setActive, scrollToSubItem, ...item }) => {
  const { title, subItems } = item

  return (
    <li className={styles.wrapper}>
      <button
        className={cx(styles.item, isActive && styles.active, 'btn row v-center justify')}
        onClick={() => {
          window.scrollTo({ left: 0, top: 0, behavior: 'auto' })
          setActive(item)
        }}
      >
        <span>{title}</span>
        {subItems && (
          <div className={cx(styles.arrowIcon, 'row hv-center')}>
            <Svg id='arrow-right' h={8} w={5} />
          </div>
        )}
      </button>
      {activeSub && (
        <ul className={cx(styles.subWrapper)}>
          {subItems.map((subItem) => (
            <SubItem
              key={subItem.key}
              activeSub={activeSub}
              subItem={subItem}
              scrollToSubItem={scrollToSubItem}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export default NavItem
