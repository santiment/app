import React, { useState, useEffect, useRef } from 'react'
import {
  selectNextGroup,
  fixDateRangeString,
  checkInvalidDate,
  getValidityMsg,
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

const groupStartIndeces = [0, 3, 6, 11, 14, 17]

const canModifyChar = (char) => !Number.isNaN(parseInt(char, 10))
const shouldBreakOnChar = (char) => char === '/' || char === ' '

function extractGroupValue(str, index) {
  let left = index
  let right = index + 1
  const { length } = str

  for (; left > -1; left--) {
    if (shouldBreakOnChar(str[left])) break
  }
  for (; right < length; right++) {
    if (shouldBreakOnChar(str[right])) break
  }

  return str.slice(left + 1, right)
}

const Input = ({ value, onCalendarChange }) => {
  const inputRef = useRef()
  const [input, setInput] = useState(value)

  useEffect(
    () => {
      setInput(value)
    },
    [value],
  )

  useEffect(
    () => {
      const dates = input.split(' - ').map((item) => item.split('/'))

      const [from, to] = dates.map(
        ([day, month, year]) => new Date(`${month}/${day}/20${year}`),
      )

      let msg = ''
      if (checkInvalidDate(from)) {
        msg = getValidityMsg(dates[0])
      } else if (checkInvalidDate(to)) {
        msg = getValidityMsg(dates[1])
      }

      inputRef.current.setCustomValidity(msg)
      inputRef.current.reportValidity()
    },
    [input],
  )

  function onChange({ target }) {
    const { value, selectionStart } = target
    setInput(value)

    if (extractGroupValue(value, selectionStart - 1).length > 1) {
      selectNextGroup(target, TO_RIGHT)
    }
  }

  function onClick({ target }) {
    const caret = target.selectionStart
    setInput(fixDateRangeString(target))
    selectNextGroup(target, null, caret)
  }

  function onKeyDown(e) {
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
      setInput(fixDateRangeString(target))
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
      className={styles.input}
      onKeyDown={onKeyDown}
      onClick={onClick}
      onChange={onChange}
    />
  )
}

export default Input
