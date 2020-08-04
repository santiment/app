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
                    IconActive={props => (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='7'
                        height='10'
                        {...props}
                      >
                        <path
                          fill='#fff'
                          d='M2.8 10h-.2V9l-1.4-.4C.8 8.4.5 8 .3 7.8a2 2 0 01-.3-1v-.1h1.4l.2.1c0 .3.2.5.5.7l1 .2c.6 0 1 0 1.2-.2.3-.2.4-.5.4-.8 0-.2 0-.3-.2-.5L4 6l-1.2-.4C2 5.3 1.2 5 .8 4.7.4 4.4.2 3.9.2 3.2c0-.5.2-1 .6-1.4A3 3 0 012.5 1V.3l.1-.2.2-.1H3.7v1.1c.5 0 1 .2 1.3.4l.8.7.3.9a.2.2 0 01-.3.2h-1c-.2 0-.3 0-.3-.2s-.2-.4-.5-.6l-.9-.2c-.4 0-.7 0-1 .2-.2.2-.3.4-.3.7 0 .2 0 .4.2.5l.5.4 1.1.3c.7.1 1.2.3 1.6.5.4.2.6.4.8.7.2.3.3.6.3 1a2 2 0 01-.7 1.6c-.5.4-1 .7-1.8.8v.7l-.1.2-.2.1h-.7z'
                        />
                      </svg>
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
          <Icon type='plus' className={styles.plus} />
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
