import React, { useMemo } from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
// import Chart from './Chart'
// import { setupMetricColors, mapProjectMetrics } from './insights'
import { insights } from './insights'
import { Section, Container } from '../index'
import { CHARTS_ANCHOR } from '../../Navigation/anchors'
// import { useFeaturedTemplates } from '../../../../ducks/Studio/Template/gql/hooks'
import Accordion from '../../Accordion'
import styles from './index.module.scss'

const InsightsOnDemand = () => {
  // const [layouts] = useFeaturedTemplates()
  // const charts = useMemo(() => layouts.map(insight => {
  //     let { options: settings, metrics, project } = insight

  //     insight.metrics = mapProjectMetrics(project, metrics)
  //     metrics = insight.metrics

  //     const MetricColor = setupMetricColors(metrics)

  //     return {...insight, widget: () => <Chart metrics={metrics} settings={settings} MetricColor={MetricColor} />}
  //   }), [layouts])

  return (
    <Section title='Charts Gallery' id={CHARTS_ANCHOR}>
      <Container>
        {insights.map(({ title, widget, url }) => (
          <Accordion key={url} title={title}>
            {widget()}
            <Button
              as='a'
              target='_blank'
              href={url}
              accent='positive'
              variant='fill'
              className={styles.btn}
            >
              Open Chart
              <Icon type='external-link' className={styles.external} />
            </Button>
          </Accordion>
        ))}
      </Container>
    </Section>
  )
}

export default InsightsOnDemand
