import React, { useMemo } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '@santiment-network/ui/Tooltip'
import Button from '@santiment-network/ui/Button'
import LoginPopup from '../banners/feature/PopupBanner'
import WordCloud from '../WordCloud/WordCloudWithHeader'
import DarkTooltip from '../Tooltip/DarkTooltip'
import NewLabel from '../NewLabel/NewLabel'
import Chart from './Chart'
import { Metric } from '../../ducks/dataHub/metrics'
import { createTrigger } from '../../ducks/Signals/common/actions'
import { buildInTrendingWordsSignal } from '../../ducks/Signals/utils/utils'
import { dividePhraseInWords, SETTINGS } from './topics'
import styles from './Item.module.scss'

const METRICS = [Metric.social_volume_total]

const Item = ({
  topic,
  title,
  link,
  createdAt,
  price,
  priceTicker,
  show,
  onLoad,
  createSignal,
  isCompact,
}) => {
  const { settings, metrics } = useMemo(() => {
    if (price) {
      return {
        metrics: METRICS.concat(Metric.price_usd),
        settings: Object.assign({ slug: price }, SETTINGS),
      }
    }
    return { metrics: METRICS, settings: SETTINGS }
  }, [])

  const MetricSettingMap = useMemo(() => {
    const MetricSettingMap = new Map()

    MetricSettingMap.set(metrics[0], {
      selector: 'text',
      slug: topic,
    })

    return MetricSettingMap
  }, [metrics])

  return show ? (
    <article className={styles.wrapper}>
      <div className={styles.top}>
        <Link to={`/labs/trends/explore/${link}`} className={styles.text}>
          {[<NewLabel date={createdAt} className={styles.new} key='new' />, title]}
        </Link>
        {!isCompact && (
          <div className={styles.actions}>
            <LoginPopup>
              <div
                className={styles.action}
                onClick={() => {
                  const words = dividePhraseInWords(topic)
                  createSignal(buildInTrendingWordsSignal(words))
                }}
              >
                <DarkTooltip
                  align='end'
                  trigger={<Icon type='signal' className={cx(styles.signal, styles.icon)} />}
                  position='top'
                >
                  Create an alert if the phrase
                  <br />
                  appears in Social Trends
                </DarkTooltip>
              </div>
            </LoginPopup>
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
                        <Icon type='cloud-big' className={cx(styles.context, styles.icon)} />
                      }
                      position='top'
                      align='end'
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
        )}
      </div>
      <Chart
        topic={topic}
        metrics={metrics}
        price={price}
        priceTicker={priceTicker}
        settings={settings}
        onLoad={onLoad}
        settingMap={MetricSettingMap}
        className={styles.chart}
        isCompact={isCompact}
      />
    </article>
  ) : null
}

const mapDispatchToProps = (dispatch) => ({
  createSignal: (payload) => {
    dispatch(createTrigger(payload))
  },
})

export default connect(null, mapDispatchToProps)(Item)
