import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Version from './Version/Version'
import ContactUs from './ContactUs/ContactUs'
import styles from './Footer.module.scss'

const Footer = ({ classes = {} }) => {
  return (
    <div className={cx(styles.footer, classes.footer)}>
      <div className={styles.links}>
        <ContactUs as='a' className={styles.contact} />
        <Link to={'/privacy-policy'}>Privacy</Link>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://academy.santiment.net/sanbase/requesting-display-new-project/'
        >
          Request token
        </a>
      </div>
      <Version classes={classes} />
    </div>
  )
}

export default Footer
