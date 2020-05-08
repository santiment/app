import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import styles from './Footer.module.scss'

const Footer = ({ classes = {} }) => (
  <div className={cx(styles.footer, classes.footer)}>
    <div className={styles.links}>
      <Button
        as='a'
        onClick={() => window.Intercom('show')}
        className={styles.contact}
      >
        Contact us
      </Button>
      <Link to={'/privacy-policy'}>Privacy</Link>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://academy.santiment.net/sanbase/requesting-display-new-project/'
      >
        Request token
      </a>
    </div>
    <div>
      <span className={classes.footerVersionDivider}>|&nbsp;&nbsp;&nbsp;</span>
      ver. {process.env.REACT_APP_VERSION}
    </div>
  </div>
)

export default Footer
