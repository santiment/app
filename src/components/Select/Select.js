import React from 'react'
import LibSelect from 'react-virtualized-select'
import cx from 'classnames'
import './Select.scss'
import styles from './Select.module.scss'

const Select = ({ className, topDropdown, ...props }) => {
  return (
    <LibSelect
      className={cx(className, topDropdown && styles.topDropdown)}
      {...props}
      optionHeight={32}
    />
  )
}

export default Select
