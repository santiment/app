import React, { useState, useEffect, useMemo } from 'react'
import withBoundaries from '../Studio/withBoundaries'
import Studio from '../../ducks/Studio'
import { newProjectMetric } from '../../ducks/Studio/metrics'
import { Metric } from '../../ducks/dataHub/metrics'
import { parseUrlV2 } from '../../ducks/Studio/url/parse'
import { DEFAULT_SETTINGS } from '../../ducks/Studio/defaults'
import ChartWidget from '../../ducks/Studio/Widget/ChartWidget'
import { getProject } from '../../ducks/Studio/Compare/withProjects'
import PageLoader from '../../components/Loader/PageLoader'

const DEFAULT_WIDGETS = [ChartWidget.new()]

const newPriceProjectMetric = project =>
  newProjectMetric(project, Metric.price_usd)

export default withBoundaries(({ parsedUrl, ...props }) => {
  const { widgets, settings = {}, sidepanel } = useMemo(
    () => parsedUrl || parseUrlV2(window.location.search),
    []
  )
  const [defaultWidgets, setDefaultWidgets] = useState(
    settings.slug ? widgets : DEFAULT_WIDGETS
  )

  useEffect(() => {
    if (defaultWidgets) return

    getProject(settings.slug).then(project =>
      setDefaultWidgets([
        ChartWidget.new({
          metrics: [newPriceProjectMetric(project)]
        })
      ])
    )
  }, [])

  if (!defaultWidgets) {
    return <PageLoader />
  }

  return (
    <Studio
      {...props}
      defaultSettings={{
        ...DEFAULT_SETTINGS,
        ...settings
      }}
      defaultWidgets={defaultWidgets}
      defaultSidepanel={sidepanel}
    />
  )
})
