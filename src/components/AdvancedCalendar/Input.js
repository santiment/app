import React, { useState, useEffect, useRef } from 'react'
import cx from 'classnames'
import {
  selectNextGroup,
  fixDateRangeString,
  checkInvalidDate,
  getValidityMsg,
  extractGroupValue,
} from './utils'
import styles from './index.module.scss'

const TO_RIGHT = true

const BlockingNeighbourChar = {
  ' ': true,
  '-': true,
}

const NavigationChar = {
  ArrowLeft: true,
  ArrowRight: true,
}

const canModifyChar = (char) => !Number.isNaN(parseInt(char, 10))

const Input = ({ value, onCalendarChange }) => {
  const [input, setInput] = useState(value)
  const [isFocused, setIsFocused] = useState()
  const [isInvalid, setIsInvalid] = useState()
  const inputRef = useRef()

  useEffect(
    () => {
      setInput(value)
    },
    [value],
  )

  function onFocus() {
    setIsFocused(true)
  }

  function onBlur({ target }) {
    if (!isFocused) return

    changeCalendar()
    setIsFocused(false)
  }

  function onChange({ target }) {
    const { value, selectionStart } = target
    updateInput(value)

    if (extractGroupValue(value, selectionStart - 1).length > 1) {
      selectNextGroup(target, TO_RIGHT)
    }
  }

  function updateInput(value) {
    setInput(value)
    setIsInvalid(!validateInput(value))
  }

  function changeCalendar() {
    const validDates = validateInput(input)

    if (validDates) {
      onCalendarChange(validDates)
    }
  }

  function validateInput(input) {
    const dateSettings = input.split(' - ').map((item) => item.split('/'))

    const dates = dateSettings.map(
      ([day, month, year]) => new Date(`${month}/${day}/20${year}`),
    )

    let [from, to] = dates

    if (+from === +to) {
      from.setHours(0, 0, 0)
      to.setHours(23, 59, 59)
    } else if (!to) {
      const fixedTo = new Date(from)
      fixedTo.setHours(23, 59, 59)
      to = fixedTo
      dates[1] = fixedTo
    }

    let msg = ''
    if (checkInvalidDate(from)) {
      msg = getValidityMsg(dateSettings[0])
    } else if (checkInvalidDate(to)) {
      msg = getValidityMsg(dateSettings[1])
    } else if (from > to) {
      msg = 'Left date should be before right date'
    }

    inputRef.current.setCustomValidity(msg)
    inputRef.current.reportValidity()

    return msg ? null : dates
  }

  function onClick({ target }) {
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

  function onKeyDown(e) {
    const { key, target } = e

    if (target.selectionEnd - target.selectionStart > 2) {
      selectNextGroup(target)
    }

    const beforeCaretIndex = target.selectionStart - 1
    const charBeforeCaret = target.value[beforeCaretIndex]
    const charAfterCaret = target.value[target.selectionStart]

    if (key === 'Enter') {
      changeCalendar()
    } else if (key === 'Backspace') {
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
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}

export default Input
