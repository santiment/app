import React, { useState, useEffect, useRef } from 'react'
import cx from 'classnames'
import {
  selectNextGroup,
  fixDateRangeString,
  checkInvalidDate,
  getValidityMsg,
  extractGroupValue
} from './utils'
import { useDebounce } from '../../hooks'
import styles from './index.module.scss'

const TO_RIGHT = true

const BlockingNeighbourChar = {
  ' ': true,
  '-': true
}

const NavigationChar = {
  ArrowLeft: true,
  ArrowRight: true
}

const canModifyChar = char => !Number.isNaN(parseInt(char, 10))

const Input = ({ value, onCalendarChange }) => {
  const [input, setInput] = useState(value)
  const [isFocused, setIsFocused] = useState()
  const [isInvalid, setIsInvalid] = useState()
  const debouncedChangeCalendar = useDebounce(changeCalendar, 500)
  const inputRef = useRef()

  useEffect(
    () => {
      if (!isFocused) {
        setInput(value)
      }
    },
    [value]
  )

  function changeCalendar (dates) {
    onCalendarChange(dates)
  }

  function toggleFocus () {
    setIsFocused(state => !state)
  }

  function onChange ({ target }) {
    const { value, selectionStart } = target
    updateInput(value)

    if (extractGroupValue(value, selectionStart - 1).length > 1) {
      selectNextGroup(target, TO_RIGHT)
    }
  }

  function updateInput (value) {
    const validDates = validateInput(value)
    setInput(value)
    setIsInvalid(!validDates)

    if (validDates) {
      debouncedChangeCalendar(validDates)
    }
  }

  function validateInput (input) {
    const dateSettings = input.split(' - ').map(item => item.split('/'))

    const dates = dateSettings.map(
      ([day, month, year]) => new Date(`${month}/${day}/20${year}`)
    )
    const [from, to] = dates

    let msg = ''
    if (checkInvalidDate(from)) {
      msg = getValidityMsg(dateSettings[0])
    } else if (checkInvalidDate(to)) {
      msg = getValidityMsg(dateSettings[1])
    }

    inputRef.current.setCustomValidity(msg)
    inputRef.current.reportValidity()

    return msg ? null : dates
  }

  function onClick ({ target }) {
    const caret = target.selectionStart
    if (target.selectionEnd - caret !== 2) {
      updateInput(fixDateRangeString(target))
      selectNextGroup(target, null, caret)
    } else {
      target.selectionStart = caret
      target.selectionEnd = caret // NOTE: Needed to preserve active selection [@vanguard | Jun 1, 2020]
      target.selectionEnd = caret + 2
    }
  }

  function onKeyDown (e) {
    const { key, target } = e

    if (target.selectionEnd - target.selectionStart > 2) {
      selectNextGroup(target)
    }

    const beforeCaretIndex = target.selectionStart - 1
    const charBeforeCaret = target.value[beforeCaretIndex]
    const charAfterCaret = target.value[target.selectionStart]

    if (key === 'Backspace') {
      if (canModifyChar(charBeforeCaret)) return
    } else if (NavigationChar[key]) {
      updateInput(fixDateRangeString(target))
      selectNextGroup(target, key === 'ArrowRight', beforeCaretIndex + 1)
    } else if (
      canModifyChar(key) ^
      (BlockingNeighbourChar[charBeforeCaret] &&
        BlockingNeighbourChar[charAfterCaret])
    ) {
      return
    }

    return e.preventDefault()
  }

  return (
    <input
      ref={inputRef}
      size='10'
      value={input}
      className={cx(styles.input, isInvalid && styles.error)}
      onKeyDown={onKeyDown}
      onClick={onClick}
      onChange={onChange}
      onFocus={toggleFocus}
      onBlur={toggleFocus}
    />
  )
}

export default Input
