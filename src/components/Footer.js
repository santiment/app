import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import styles from './Footer.module.scss'
import './Footer.css'

const Footer = ({ classes = {} }) => (
  <div className={cx('sanbase-footer', classes.footer)}>
    <div className='sanbase-footer__links'>
      <Button
        as='a'
        onClick={() => window.Intercom('show')}
        className={styles.contact}
      >
        Contact Us
      </Button>
      <Link to={'/privacy-policy'}>Privacy</Link>
      <a href='https://docs.google.com/forms/d/e/1FAIpQLSeFuCxjJjId98u1Bp3qpXCq2A9YAQ02OEdhOgiM9Hr-rMDxhQ/viewform'>
        Request Token
      </a>
    </div>
    <div>
      <span className={classes.footerVersionDivider}>|&nbsp;&nbsp;&nbsp;</span>
      ver. {process.env.REACT_APP_VERSION}
    </div>
  </div>
)

export default Footer
