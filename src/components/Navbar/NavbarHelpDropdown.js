import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import DropdownDevider from './DropdownDevider'
import commonStyles from './NavbarDropdown.module.scss'
import styles from './NavbarHelpDropdown.module.scss'

const Links = [
  {
    as: 'a',
    href: 'https://academy.santiment.net/for-traders/',
    children: 'Getting started for traders'
  },
  {
    as: 'a',
    href: 'https://academy.santiment.net/for-developers/',
    children: 'Getting started for developers'
  },
  {
    as: 'a',
    href: 'https://academy.santiment.net/education-and-use-cases/',
    children: 'Education and Use cases'
  },
  {
    as: 'a',
    href: 'https://academy.santiment.net/metrics/',
    children: 'Metrics'
  },
  {
    as: 'a',
    href: 'https://academy.santiment.net/changelog/',
    children: 'Changelog'
  }
]

const NavbarHelpDropdown = ({ activeLink }) => (
  <div className={styles.wrapper}>
    <div className={styles.top}>
      <span>Help center</span>
      <a
        href='https://academy.santiment.net/'
        target='_blank'
        rel='noopener noreferrer'
        className={styles.link}
      >
        Go to Academy
        <Icon type='pointer-right' className={styles.icon} />
      </a>
    </div>
    <DropdownDevider />
    <div className={commonStyles.list}>
      {Links.map((props, index) => (
        <Button
          variant='ghost'
          key={index}
          fluid
          className={commonStyles.item}
          {...props}
        />
      ))}
    </div>
    <DropdownDevider />
    <div className={styles.contact}>
      <span className={styles.contact__title}>
        Can’t find what you’re looking for?
      </span>
      <Button
        as='a'
        variant='fill'
        accent='positive'
        onClick={() => window.Intercom('show')}
      >
        Contact us
      </Button>
    </div>
  </div>
)

export default NavbarHelpDropdown
