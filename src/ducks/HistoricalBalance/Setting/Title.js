import React from 'react'
import cx from 'classnames'
import styles from './Title.module.scss'

const Title = ({ text, className }) => (
  <label className={cx(styles.wrapper, className)}>{text}</label>
)

export default Title
