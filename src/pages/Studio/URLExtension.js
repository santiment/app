import React, { useState, useRef, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import { parse, stringify } from 'query-string'
import { getIdFromSEOLink } from '../../utils/url'
import { generateUrlV2 } from '../../ducks/Studio/url/generate'
import { getChartWidgetsFromTemplate } from '../../ducks/Studio/Template/utils'
import { getTemplate } from '../../ducks/Studio/Template/gql/hooks'
import { shareWidgets, shareSettings } from './sharing/share'

const getFullUrl = config => '/charts?' + generateUrlV2(config)

const run = () => {}
const URLExtension = ({ history, settings, widgets, sidewidget }) => {
  const { ticker, name } = settings
  const [sharedWidgets, setSharedWidgets] = useState([])

  useEffect(
    () => {
      const update = () => setSharedWidgets(shareWidgets(widgets))
      let updateTimer
      function scheduleUpdate () {
        window.clearTimeout(updateTimer)
        updateTimer = window.setTimeout(update, 300)
      }

      const subscriptions = []
      widgets.forEach(({ widget }) => {
        if (widget.isExternal) return

        subscriptions.push([
          widget.ChartAxes.subscribe(scheduleUpdate),
          widget.ChartColors.subscribe(scheduleUpdate),
          widget.ChartDrawer.subscribe(scheduleUpdate),
          widget.MetricIndicators.subscribe(scheduleUpdate),
          widget.MetricSettings.subscribe(scheduleUpdate)
        ])
      })

      return () => {
        window.clearTimeout(updateTimer)
        subscriptions.flat().forEach(run)
      }
    },
    [widgets]
  )

  useEffect(
    () => {
      const res = stringify({
        settings: JSON.stringify(shareSettings(settings)),
        widgets: JSON.stringify(sharedWidgets)
      })

      history.replace('/charts?' + res)

      console.log(parse(res))
    },
    [settings, sharedWidgets]
  )

  return (
    <Helmet
      title={ticker ? `${ticker} project page` : 'Sanbase...'}
      meta={[
        {
          property: 'og:title',
          content: `Project overview: ${name} - Sanbase`
        },
        {
          property: 'og:description',
          content: `Financial, development, on-chain and social data for ${name}.`
        }
      ]}
    />
  )
}

export default withRouter(URLExtension)
