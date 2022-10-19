import React, { useState } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { gotoExplore } from '../../../../../components/Trends/Search/utils'
import styles from './TrendsExploreInput.module.scss'

const TrendsExploreInput = ({ showButton, defaultTopic = '', gotoExplore: submitExplore }) => {
  const [topic, setTopic] = useState(defaultTopic)

  function handleTopicChange(e) {
    setTopic(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    submitExplore(topic)
  }

  const btn = topic ? (
    <button type='submit' className={cx(styles.explore, 'btn-1')}>
      Explore
    </button>
  ) : (
    <Link to='/labs/trends/explore/' className={cx(styles.explore, 'btn-1')}>
      Explore
    </Link>
  )

  return (
    <form onSubmit={handleSubmit} className={cx(styles.wrapper, 'relative')}>
      <input
        placeholder='Type a word or a phrase then press enter'
        type='text'
        className={cx(styles.input, 'input fluid', showButton && styles.inputWithButton)}
        value={topic}
        onChange={handleTopicChange}
      />
      {showButton && btn}
    </form>
  )
}

export default connect(null, gotoExplore)(TrendsExploreInput)
