import React, { useState } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '@santiment-network/ui/Tooltip'
import Button from '@santiment-network/ui/Button'
import { createTrigger } from '../../ducks/Signals/common/actions'
import { buildInTrendingWordsSignal } from '../../ducks/Signals/utils/utils'
import LoginDialogWrapper from '../LoginDialog/LoginDialogWrapper'
import WordCloud from '../WordCloud/WordCloud'
import DarkTooltip from '../Tooltip/DarkTooltip'
import { dividePhraseInWords } from './topics'
import Chart from './Chart'
import styles from './Item.module.scss'

const Item = ({
  topic,
  link,
  charts,
  onTopicClick,
  settingMap,
  show,
  onLoad,
  settings,
  createSignal
}) => {
  const MetricSettingMap = new Map()

  MetricSettingMap.set(charts[0], {
    selector: 'text',
    slug: link
  })

  const [map] = useState(MetricSettingMap)

  return show ? (
    <article className={styles.wrapper}>
      <div className={styles.top}>
        <Link to={`/labs/trends/explore/${link}`} className={styles.text}>
          {topic}
        </Link>
        <div className={styles.actions}>
          <LoginDialogWrapper title='Create signal'>
            <div
              className={styles.action}
              onClick={() => {
                const words = dividePhraseInWords(link)
                createSignal(buildInTrendingWordsSignal(words))
              }}
            >
              <DarkTooltip
                align='end'
                trigger={
                  <Icon
                    type='signal'
                    className={cx(styles.signal, styles.icon)}
                  />
                }
                position='top'
              >
                Create an alert if the phrase
                <br />
                appears in Emerging trends
              </DarkTooltip>
            </div>
          </LoginDialogWrapper>
          <div className={styles.action}>
            <Tooltip
              on='click'
              closeTimeout={200}
              position='left'
              passOpenStateAs='isActive'
              trigger={
                <Button variant='flat' className={styles.button}>
                  <DarkTooltip
                    trigger={
                      <Icon
                        type='cloud-big'
                        className={cx(styles.context, styles.icon)}
                      />
                    }
                    position='top'
                    align='end'
                  >
                    Social context
                  </DarkTooltip>
                </Button>
              }
            >
              <WordCloud hideWord className={styles.wordCloud} word={link} />
            </Tooltip>
          </div>
        </div>
      </div>
      <Chart
        topic={link}
        charts={charts}
        settings={settings}
        onLoad={onLoad}
        settingMap={map}
        className={styles.chart}
      />
    </article>
  ) : null
}

const mapDispatchToProps = dispatch => ({
  createSignal: payload => {
    dispatch(createTrigger(payload))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(Item)
