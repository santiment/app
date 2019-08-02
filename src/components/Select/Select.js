import React from 'react'
import Select from '@santiment-network/ui/Search/Select/Select'
import cx from 'classnames'
import styles from './Select.module.scss'

const SanUiSelect = ({ className, topDropdown, ...props }) => {
  return (
    <Select
      className={cx(className, topDropdown && styles.topDropdown)}
      {...props}
      optionHeight={32}
    />
  )
}

export default SanUiSelect
