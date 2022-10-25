import React, { useEffect, useRef, useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import useAutosizeTextArea from '../../hooks/textarea'
import { useDebounceEffect } from '../../hooks'
import styles from './Search.module.scss'

const SearchMobile = ({ topic = '', onChangeTopics }) => {
  const textareaRef = useRef(null)
  const wrapperRef = useRef(null)
  const [textareaValue, setTextareaValue] = useState(topic)

  useAutosizeTextArea({ textareaRef, wrapperRef, value: textareaValue })

  useEffect(() => {
    onChangeTopics([topic])
    setTextareaValue(topic)
  }, [topic])

  useDebounceEffect(() => onChangeTopics(textareaValue ? [textareaValue.trim()] : []), 700, [
    textareaValue,
  ])
  useDebounceEffect(() => setTextareaValue(textareaValue.trim()), 500, [textareaValue])

  function handleTopicChange(e) {
    const val = e.target.value
    setTextareaValue(val)
  }

  return (
    <div className='fluid relative mrg-xxl mrg--b' ref={wrapperRef}>
      {textareaValue && (
        <Icon
          type='close-medium'
          className={styles.textareaIcon}
          onClick={() => setTextareaValue('')}
          height={12}
          width={12}
        />
      )}
      <textarea
        onChange={handleTopicChange}
        ref={textareaRef}
        rows={1}
        value={textareaValue}
        className={cx(
          styles.textarea,
          'input body-2 fluid',
          textareaValue && styles.textareaWithIcon,
        )}
        placeholder='Enter a word or a phrase..'
      />
    </div>
  )
}

export default SearchMobile
