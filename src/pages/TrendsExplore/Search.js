import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MultiInput from '@santiment-network/ui/Input/MultiInput'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Toggle from '@santiment-network/ui/Toggle'
import DarkTooltip from '../../components/Tooltip/DarkTooltip'
import { DEFAULT_TEXT } from '../../components/Trends/Search'
import styles from './Search.module.scss'

const MAX_VALUES = 5

function trimTopics (topics) {
  return topics.map(topic => topic.trim()).filter(Boolean)
}

const Search = ({
  topics,
  linkedAssets,
  activeLinkedAssets,
  onChangeTopics,
  setActiveLinkedAssets
}) => {
  const [isInFocus, setIsInFocus] = useState(false)
  const [values, setValues] = useState(topics)
  const inputRef = useRef(null)

  const isMaxValuesReached = values.length === MAX_VALUES

  useEffect(
    () => {
      if (values.length === 0) {
        setFocus()
      } else if (isMaxValuesReached) {
        setIsInFocus(false)
      }

      if (topics !== values) {
        onChangeTopics(trimTopics(values))
      }
    },
    [values]
  )

  function setFocus () {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  function toggleLinkedAsset (text, asset, isActive) {
    const newActiveLinkedAssets = new Map(activeLinkedAssets)
    if (isActive) {
      newActiveLinkedAssets.delete(text)
    } else {
      newActiveLinkedAssets.set(text, asset)
    }

    setActiveLinkedAssets(newActiveLinkedAssets)
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
        const isActive = activeLinkedAssets.get(text)

        return detectedAsset ? (
          <div className={styles.content}>
            <div
              className={styles.wrapper}
              onClick={() => toggleLinkedAsset(text, detectedAsset, isActive)}
            >
              <DarkTooltip
                position='top'
                align='start'
                on='hover'
                className={styles.tooltip}
                // NOTE: hidden div for tooltip trigger (doesn't work with Toggle/Link)
                trigger={<div className={styles.hiddenToggle}>hidden</div>}
              >
                Click to switch to asset
              </DarkTooltip>
              <Toggle isActive={isActive} className={styles.toggle} />
            </div>
            <div className={styles.wrapper}>
              <Link
                className={styles.link}
                to={`/projects/${detectedAsset.slug}`}
              >
                <DarkTooltip
                  position='top'
                  align='start'
                  on='hover'
                  className={styles.tooltip}
                  trigger={<div className={styles.hidden}>{text}</div>}
                >
                  Click to explore project page
                </DarkTooltip>
                {text}
              </Link>
            </div>
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
          <Icon type='close' className={styles.plus} />
          Compare
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
