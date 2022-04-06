import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Chart from './Chart'
import { setupMetricColors, mapProjectMetrics } from './insights'
import { Metric } from '../../../../ducks/dataHub/metrics'
import { Section } from '../index'
import { CHARTS_ANCHOR } from '../../Navigation/anchors'
import { useFeaturedTemplates } from '../../../../ducks/Studio/Template/gql/hooks'
import { getTemplateSharePath as prepareTemplateLink } from '../../../../ducks/Studio/Template/utils'
import styles from './index.module.scss'

const InsightsOnDemand = React.memo(() => {
  const [templates] = useFeaturedTemplates()

  const charts = useMemo(
    () =>
      templates.map((template) => {
        const { metrics: metricKeys, project } = template
        const url = prepareTemplateLink(template)

        const settings = {
          slug: project.slug,
          ticker: project.ticker,
          from: 'utc_now-90d',
          to: 'utc_now',
          interval: '1d',
        }

        const metrics = metricKeys.map((key) => Metric[key]).filter(Boolean)

        const metricsArr = mapProjectMetrics(project, metrics)
        const MetricColor = setupMetricColors(metricsArr)

        return {
          ...template,
          url,
          widget: () => (
            <Chart metrics={metricsArr} settings={settings} MetricColor={MetricColor} />
          ),
        }
      }),
    [templates],
  )

  return (
    <Section title='Charts Gallery' id={CHARTS_ANCHOR}>
      <div className={styles.container}>
        <div className={styles.charts}>
          <div className={styles.scroller}>
            {charts.map(({ title, widget, url }, idx) => (
              <div className={styles.chart} key={idx}>
                <Link to={url} className={styles.hoverChart}>
                  Click to move into charts
                </Link>
                <div className={styles.widget}>{widget()}</div>
                <h4 className={styles.title}>{title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
})

export default InsightsOnDemand
