import React from 'react'
import cx from 'classnames'
import Share from '../Share/Share'
import styles from './Header.module.scss'

const Header = ({ shareLinkText, description }) => (
  <div className={cx('row v-center justify', styles.header)}>
    <div className='body-3'>{description}</div>
    <Share shareLinkText={shareLinkText} />
  </div>
)

export default Header
