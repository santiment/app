import React, { useState } from 'react'
import cx from 'classnames'
import { InputWithIcon } from '@santiment-network/ui'
import { useDebounceEffect } from '../../hooks'
import styles from './SearchBar.module.scss'

const DEFAULT_TEXT = 'Search for assets, trends...'

const SearchBar = ({ onChange, placeholder = DEFAULT_TEXT }) => {
  const [term, setTerm] = useState('')

  useDebounceEffect(() => term && onChange(term), 300, [term])

  function handleChange(event) {
    event.preventDefault()
    setTerm(event.target.value)
  }

  return (
    <form
      onSubmit={handleChange}
      className={cx(styles.wrapper, 'relative fluid flex v-center mrg--r mrg-m')}
      onFocus={() => setTerm('')}
    >
      <InputWithIcon
        type='text'
        icon='search-small'
        iconPosition='left'
        className={styles.input}
        placeholder={placeholder}
        value={term}
        onChange={(event) => setTerm(event.target.value)}
      />
    </form>
  )
}

export default SearchBar
