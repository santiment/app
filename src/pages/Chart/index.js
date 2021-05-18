import React, { useMemo } from 'react'
/* import Studio from '../../ducks/Studio' */
import { parseUrlV2 } from '../../ducks/Studio/url/parse'
import { DEFAULT_SETTINGS } from '../../ducks/Studio/defaults'
import ChartWidget from '../../ducks/Studio/Widget/ChartWidget'
import Studio from '../Studio/Studio'
import { useUrlParse } from '../Studio/parse'

const DEFAULT_WIDGETS = [ChartWidget.new()]

export default ({ parsedUrl, ...props }) => {
  useMemo(() => {
    const { widgets, settings, sidepanel } =
      parsedUrl || parseUrlV2(window.location.search)

    console.log(widgets, settings, sidepanel)
  }, [])
  const defaults = useUrlParse(parsedUrl)

  return (
    <Studio
      // {...props}
      // defaultSettings={{
      // ...DEFAULT_SETTINGS,
      // ...settings
      // }}
      // defaultWidgets={widgets && widgets.length > 0 ? widgets : DEFAULT_WIDGETS}
      {...defaults}
    />
  )
}
