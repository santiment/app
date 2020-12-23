import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import LinkWithArrow from '../Link'
import commonStyles from '../NavbarDropdown.module.scss'
import ContactUs from '../../ContactUs/ContactUs'
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
      <LinkWithArrow
        to='https://academy.santiment.net/'
        title='Go to Academy'
      />
    </div>
    <div className={styles.list}>
      {Links.map((props, index) => (
        <Button
          variant='ghost'
          key={index}
          fluid
          className={cx(commonStyles.item, styles.item)}
          {...props}
        />
      ))}
    </div>
    <div className={styles.contact}>
      <span className={styles.contact__title}>
        Can’t find what you’re looking for?
      </span>
      <ContactUs
        as='a'
        variant='fill'
        accent='positive'
        className={styles.btn}
      />
    </div>
  </div>
)

export default NavbarHelpDropdown
