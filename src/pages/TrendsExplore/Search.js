import React, { useState, useRef, useEffect } from 'react'
import MultiInput from '@santiment-network/ui/Input/MultiInput'
import Button from '@santiment-network/ui/Button'
import Toggle from '@santiment-network/ui/Toggle'
import { DEFAULT_TEXT } from '../../components/Trends/Search'
import styles from './Search.module.scss'

const MAX_VALUES = 5

function trimTopics (topics) {
  return topics.map(topic => topic.trim())
}

const Search = ({ topics, linkedAssets, onChangeTopics }) => {
  const [isInFocus, setIsInFocus] = useState(false)
  const [values, setValues] = useState(topics)
  const inputRef = useRef(null)

  const isMaxValuesReached = values.length === MAX_VALUES

  useEffect(() => {
    if (values.length === 0) {
      setFocus()
      return
    } else if (isMaxValuesReached) {
      setIsInFocus(false)
    }

    if (topics !== values) {
      onChangeTopics(trimTopics(values))
    }
  }, [values])

  function setFocus () {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <MultiInput
      onValueAdd={(value, newValues) => setValues(newValues)}
      onValueRemove={(value, newValues) => setValues(newValues)}
      onFocus={() => setIsInFocus(true)}
      onBlur={() => setIsInFocus(false)}
      maxValues={MAX_VALUES}
      placeholder={DEFAULT_TEXT}
      values={topics}
      defaultValues={values}
      valueContent={text => {
        const detectedAsset = linkedAssets.get(text)
        return detectedAsset ? (
          <div className={styles.content}>
            <Toggle
              className={styles.toggle}
              onClick={() => console.log('toggle!')}
            />
            {text}
          </div>
        ) : (
          text
        )
      }}
      className={styles.input}
      forwardedRef={inputRef}
    >
      {(!isInFocus || isMaxValuesReached) && (
        <Button border className={styles.button} disabled={isMaxValuesReached}>
          +
        </Button>
      )}
      {isMaxValuesReached && (
        <span className={styles.limit}>
          To add a new word, please delete one
        </span>
      )}
    </MultiInput>
  )
}

export default Search
