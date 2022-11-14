import React, { useState } from 'react'
import cx from 'classnames'
import { InputWithIcon } from '@santiment-network/ui'
import { useDebounceEffect } from '../../hooks'
import styles from './SearchBar.module.scss'

const DEFAULT_TEXT = 'Search for assets, trends...'

const SearchBar = ({ onChange, placeholder = DEFAULT_TEXT }) => {
  const [term, setTerm] = useState('')

  useDebounceEffect(() => onChange(term), 300, [term])

  function handleChange(event) {
    event.preventDefault()
    setTerm(event.target.value)
  }

  return (
    <form
      onSubmit={event => event.preventDefault()}
      className={cx(styles.wrapper, 'relative fluid flex v-center mrg-xl mrg--l')}
      onFocus={() => setTerm('')}
    >
      <InputWithIcon
        type='text'
        icon='search-small'
        iconPosition='left'
        className='fluid'
        inputClassName={styles.input}
        iconClassName={styles.icon}
        placeholder={placeholder}
        value={term}
        onChange={handleChange}
      />
    </form>
  )
}

export default SearchBar
