import React from 'react'
import Toggle from './Toggle'
import styles from './NavbarProfileDropdown.module.scss'

const NavbarProfileDropdown = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <div className={styles.profile__upper}>
          <div className={styles.profile__left}>
            <div className={styles.text + ' ' + styles.profile__pic} />
            <div className={styles.onlineIndicator + ' ' + styles.online} />
          </div>
          <div className={styles.profile__right}>
            <h3 className={styles.text + ' ' + styles.profile__name}>
              Andriy Yurchenko
            </h3>
            <h4 className={styles.text + ' ' + styles.profile__status}>
              Active
            </h4>
          </div>
        </div>
        <div className={styles.text + ' ' + styles.tokens}>
          <span className={styles.tokens__amount}>13 562</span> tokens available
        </div>
      </div>
      <ul className={styles.menuList}>
        <li className={styles.menuList__item + ' ' + styles.text}>
          <div className={styles.setting}>
            Nightmode <Toggle />
          </div>
        </li>
      </ul>
      <ul className={styles.menuList}>
        <li className={styles.menuList__item + ' ' + styles.text}>
          Account settings
        </li>
        <li className={styles.menuList__item + ' ' + styles.text}>
          Upgrade plan
        </li>
        <li className={styles.menuList__item + ' ' + styles.text}>Log out</li>
      </ul>
    </div>
  )
}

export default NavbarProfileDropdown
