import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Tooltip from '@santiment-network/ui/Tooltip'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel'
import Calendar from '../../ducks/Studio/AdvancedView/Calendar'
import WordCloud from '../../components/WordCloud/WordCloudWithHeader'
import HelpPopup from '../../components/HelpPopup/HelpPopup'
import { SOCIAL_CONTEXT_DESCRIPTION } from '../../ducks/dataHub/metrics/descriptions'
import { getTimePeriod } from './utils'
import styles from './EnhancedWordCloud.module.scss'
import stylesTooltip from '../../components/HelpPopup/HelpPopup.module.scss'

const MAX_DATE = new Date()

const EnhancedWordCloud = ({ words, isDesktop = true }) => {
  const [word, setWord] = useState(words[0])
  const [date, setDate] = useState([MAX_DATE])
  const [period, setPeriod] = useState(getTimePeriod(MAX_DATE))

  useEffect(() => {
    if (words.length > 1) {
      setDate([MAX_DATE])
      setPeriod(getTimePeriod(MAX_DATE))
    }

    if (!words.includes(word)) {
      setWord(words[0])
    }
  }, [words])

  function onCalendarChange(datetime) {
    setDate([datetime])
    setPeriod(getTimePeriod(datetime))
  }

  return (
    <div className={styles.wrapper}>
      {words.length > 1 ? (
        <Tooltip
          on='click'
          trigger={
            <Button variant='flat' border className={styles.trigger}>
              {word}
            </Button>
          }
          position='bottom'
          align='end'
        >
          <Panel className={styles.panel}>
            {words.map((item) => (
              <span
                className={cx(styles.word, item === word && styles.selected)}
                key={item}
                onClick={() => setWord(item)}
              >
                {item}
              </span>
            ))}
          </Panel>
        </Tooltip>
      ) : (
        <div className={cx('row v-center justify', !isDesktop && styles.header)}>
          {!isDesktop && (
            <div className='row v-center'>
              <h3 className='body-1 mrg-l mrg--r'>Social context</h3>
              <HelpPopup>
                <h4 className={stylesTooltip.title}>Social context</h4>
                {SOCIAL_CONTEXT_DESCRIPTION}
              </HelpPopup>
            </div>
          )}
          <Calendar
            dates={date}
            onChange={onCalendarChange}
            className={cx(styles.calendar, !isDesktop && cx(styles.mobileCalendar, 'body-3'))}
            maxDate={MAX_DATE}
            isDesktop={isDesktop}
          />
        </div>
      )}
      <WordCloud
        isDesktop={isDesktop}
        hideWord
        size={15}
        className={styles.cloud}
        infoClassName={styles.cloud__header}
        contentClassName={styles.cloud__content}
        word={word}
        {...period}
      />
    </div>
  )
}

export default EnhancedWordCloud
