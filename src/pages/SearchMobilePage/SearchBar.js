import React, { useEffect, useState } from 'react'
import { InputWithIcon } from '@santiment-network/ui'
import styles from './SearchBar.module.scss'

const DEFAULT_TEXT = 'Search for assets, trends...'

const SearchBar = ({onChange, placeholder=DEFAULT_TEXT}) => {
    const [term, setTerm] = useState('')

    useEffect(() => {
        let timer;

        timer = setTimeout(() => {
            onChange(term)
        }, 300)

        return () => clearInterval(timer)
    }, [term])

    const handleChange = (event) => {
        event.preventDefault()
        setTerm(event.target.value)
    }

    return (
        <form onSubmit={handleChange} className={styles.wrapper} onFocus={() => setTerm('')}>
            <InputWithIcon
                type='text'
                icon='search-small'
                iconPosition='left'
                className={styles.input}
                placeholder={placeholder}
                value={term}
                onChange={event => setTerm(event.target.value)}
            />
        </form>
    )
}

export default SearchBar
