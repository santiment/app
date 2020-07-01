import React from 'react'
import Studio from '../../ducks/Studio'
import withBoundaries from '../Studio/withBoundaries'
import { parseUrlV2 } from '../../ducks/Studio/url/parse'
import { DEFAULT_SETTINGS } from '../../ducks/Studio/defaults'
import ChartWidget from '../../ducks/Studio/Widget/ChartWidget'

const DEFAULT_WIDGETS = [ChartWidget.new()]

export default withBoundaries(({ parsedUrl, ...props }) => {
  const { widgets, settings, sidepanel } =
    parsedUrl || parseUrlV2(window.location.search)

  return (
    <Studio
      {...props}
      defaultSettings={{
        ...DEFAULT_SETTINGS,
        ...settings,
      }}
      defaultWidgets={widgets && widgets.length > 0 ? widgets : DEFAULT_WIDGETS}
      defaultSidepanel={sidepanel}
    />
  )
})
