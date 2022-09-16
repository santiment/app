import React from 'react'
import cx from 'classnames'
import Svg from 'webkit/ui/Svg/react'
import styles from './NavItem.module.scss'

const SubItem = ({ subItem, activeSub, setActiveSubItem, scrollToSubItem }) => {
  const { key, title } = subItem
  const isActiveSub = key === activeSub.key

  function handleSubItemClick() {
    setActiveSubItem(subItem)
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

const NavItem = ({
  isActive,
  activeSub,
  setActive,
  setActiveSubItem,
  scrollToSubItem,
  ...item
}) => {
  const { title, subItems } = item

  let subNav = null

  if (activeSub) {
    subNav = (
      <ul className={cx(styles.subWrapper)}>
        {subItems.map((subItem) => (
          <SubItem
            key={subItem.key}
            activeSub={activeSub}
            subItem={subItem}
            setActiveSubItem={setActiveSubItem}
            scrollToSubItem={scrollToSubItem}
          />
        ))}
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
