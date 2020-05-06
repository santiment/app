import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '@santiment-network/ui/Tooltip'
import Button from '@santiment-network/ui/Button'
import WordCloud from '../WordCloud/WordCloud'
import DarkTooltip from '../Tooltip/DarkTooltip'
import { Metric } from '../../ducks/dataHub/metrics'
import Chart from './Chart'
import styles from './Item.module.scss'

const Item = ({ topic, onTopicClick, settings }) => {
  const charts = [Metric.social_volume_total]
  let MetricSettingMap = new Map()

  MetricSettingMap.set(Metric.social_volume_total, {
    selector: 'text',
    slug: topic
  })

  return (
    <article className={styles.wrapper}>
      <div className={styles.top}>
        <Link to={`/labs/trends/explore/${topic}`} className={styles.text}>
          {topic}
        </Link>
        <div className={styles.actions}>
          {/* <div className={styles.action}> */}
          {/*   <DarkTooltip */}
          {/*     trigger={ */}
          {/*       <Icon */}
          {/*         type='signal' */}
          {/*         className={cx(styles.signal, styles.icon)} */}
          {/*       /> */}
          {/*     } */}
          {/*     position='top' */}
          {/*   > */}
          {/*     Create an alert if the phrase */}
          {/*     <br /> */}
          {/*     appears in Emerging trends */}
          {/*   </DarkTooltip> */}
          {/* </div> */}
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
                    align='start'
                  >
                    Social context
                  </DarkTooltip>
                </Button>
              }
            >
              <WordCloud hideWord className={styles.wordCloud} word={topic} />
            </Tooltip>
          </div>
        </div>
      </div>
      <Chart
        topic={topic}
        charts={charts}
        settingMap={MetricSettingMap}
        settings={settings}
        className={styles.chart}
      />
    </article>
  )
}

export default Item
