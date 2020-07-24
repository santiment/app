import React, { useState, useEffect, useRef } from 'react'
import styles from './index.module.scss'

const Input = ({ defaultValue, onChange, ...props }) => {
  const [value, setValue] = useState(defaultValue)
  const [lastValidValue, setLastValidValue] = useState(defaultValue)
  const inputRef = useRef()

  useEffect(resize, [value])
  useEffect(() => setValue(defaultValue), [defaultValue])

  function resize () {
    inputRef.current.style.width = value.toString().length + 1 + 'ch'
  }

  function onInputChange ({ target: { value } }) {
    setValue(value)
    if (value) {
      setLastValidValue(value)
    }
    onChange(+value)
  }

  function onFocus () {
    if (!+value) {
      setValue('')
    }
  }

  function onBlur () {
    if (!+value) {
      setValue(lastValidValue)
    }
  }

  return (
    <input
      className={styles.input}
      onChange={onInputChange}
      onFocus={onFocus}
      onBlur={onBlur}
      ref={inputRef}
      {...props}
      value={value}
    />
  )
}

Input.defaultProps = {
  defaultValue: 0
}

export default Input
