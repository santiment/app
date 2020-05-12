import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
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

  const isMaxValuesReached =
    values.length >= MAX_VALUES || topics.length >= MAX_VALUES

  if (topics.length > MAX_VALUES) {
    onChangeTopics(topics.slice(0, MAX_VALUES))
  }

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
            <DarkTooltip
              position='top'
              align='start'
              on='hover'
              className={styles.tooltip}
              trigger={
                <Button
                  className={styles.btn}
                  onClick={() =>
                    toggleLinkedAsset(text, detectedAsset, isActive)
                  }
                >
                  <Toggle
                    Icon={() => (
                      <path
                        fill='#fff'
                        d='M9.8 15h-.2v-1l-1.4-.4c-.4-.2-.7-.5-.9-.8a2 2 0 01-.3-1v-.1h1.4l.2.1c0 .3.2.5.5.7l1 .2c.6 0 1 0 1.2-.2.3-.2.4-.5.4-.8 0-.2 0-.3-.2-.5L11 11l-1.2-.4c-.8-.3-1.6-.6-2-.9-.4-.3-.6-.8-.6-1.5 0-.5.2-1 .6-1.4A3 3 0 019.5 6v-.7l.1-.2.2-.1h.9v1.1c.5 0 1 .2 1.3.4l.8.7.3.9a.2.2 0 01-.3.2h-1c-.2 0-.3 0-.3-.2s-.2-.4-.5-.6l-.9-.2c-.4 0-.7 0-1 .2a1 1 0 00-.3.7c0 .2 0 .4.2.5l.5.4 1.1.3a5 5 0 011.6.5c.4.2.6.4.8.7.2.3.3.6.3 1a2 2 0 01-.7 1.6c-.5.4-1 .7-1.8.8v.7l-.1.2-.2.1h-.7z'
                      />
                    )}
                    isActive={isActive}
                    className={cx(styles.toggle, isActive && styles.active)}
                  />
                </Button>
              }
            >
              Click to switch to asset
            </DarkTooltip>
            <Link
              className={styles.link}
              to={`/projects/${detectedAsset.slug}`}
            >
              <DarkTooltip
                position='top'
                align='start'
                on='hover'
                className={styles.tooltip}
                trigger={<Button className={styles.btn}>{text}</Button>}
              >
                Click to explore project page
              </DarkTooltip>
            </Link>
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
