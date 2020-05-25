import React, { useState } from 'react'
import Calendar from '../../ducks/Studio/AdvancedView/Calendar'
import WordCloud from '../../components/WordCloud/WordCloud'
import { getTimePeriod } from './Sidebar'
import styles from './Sidebar.module.scss'

const MAX_DATE = new Date()

const EnhancedWordCloud = ({ words, isDesktop, ...props }) => {
  const [word, setWord] = useState(words[0])
  const [date, setDate] = useState([MAX_DATE])
  const [period, setPeriod] = useState(getTimePeriod(MAX_DATE))

  function onCalendarChange (datetime) {
    setDate([datetime])
    setPeriod(getTimePeriod(datetime))
  }

  return (
    <div className={styles.cloud__wrapper}>
      {isDesktop && (
        <Calendar
          dates={date}
          onChange={onCalendarChange}
          className={styles.cloud__calendar}
          maxDate={MAX_DATE}
        />
      )}
      <WordCloud
        hideWord
        size={15}
        className={styles.cloud}
        infoClassName={styles.cloud__header}
        word={word}
        {...period}
      />
    </div>
  )
}

export default EnhancedWordCloud
