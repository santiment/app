import React, { useMemo, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import { parse, stringify } from 'query-string'
import { shareWidgets, shareSettings } from './sharing/share'
import { parseUrl } from './sharing/parse'

const getSharedUrl = (settings, widgets) =>
  '/charts?' +
  stringify({
    settings,
    widgets
  })
const getSharedSettings = settings => JSON.stringify(shareSettings(settings))
const getSharedWidgets = widgets => JSON.stringify(shareWidgets(widgets))

const unsub = unsubscribe => unsubscribe()
const URLExtension = ({
  history,
  settings,
  widgets,
  sidewidget,
  prevFullUrlRef,
  setSlug
}) => {
  const { ticker, name } = settings
  const [sharedWidgets, setSharedWidgets] = useState('')

  const sharedSettings = useMemo(() => getSharedSettings(settings), [settings])

  useEffect(() => setSlug(settings.slug), [settings.slug])

  useEffect(
    () => {
      const update = () => setSharedWidgets(getSharedWidgets(widgets))
      let updateTimer
      function scheduleUpdate () {
        window.clearTimeout(updateTimer)
        updateTimer = window.setTimeout(update, 250)
      }

      const unsubs = []
      widgets.forEach(widget => {
        if (!widget.OnUpdate) return
        unsubs.push(widget.OnUpdate.subscribe(scheduleUpdate))
      })

      return () => {
        window.clearTimeout(updateTimer)
        unsubs.forEach(unsub)
      }
    },
    [widgets]
  )

  useEffect(
    () => {
      if (!sharedSettings || !sharedWidgets) return

      const url = getSharedUrl(sharedSettings, sharedWidgets)
      if (url === prevFullUrlRef.current) return

      prevFullUrlRef.current = url
      history.replace(url)
      console.log('URLExtension replace', parseUrl(url))
    },
    [sharedSettings, sharedWidgets]
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
