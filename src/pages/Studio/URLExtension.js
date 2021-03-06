import React, { useMemo, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import { stringify } from 'query-string'
import { updateShortUrl, buildChartShortPath } from './utils'
import { shareWidgets, shareSettings } from './sharing/share'
import { useUser } from '../../stores/user'
import { getShortUrl } from '../../components/Share/utils'

const checkIsNotAuthorError = ({ message }) => message.includes('another user')

function getSharedUrl (shortUrlHash, settings, widgets, sidewidget) {
  const path = shortUrlHash ? '/charts' : window.location.pathname
  return (
    path +
    '?' +
    stringify({
      settings,
      widgets,
      sidepanel: sidewidget
        ? JSON.stringify({ type: sidewidget.key || sidewidget })
        : undefined
    })
  )
}

const getSharedSettings = settings => JSON.stringify(shareSettings(settings))
const getSharedWidgets = widgets => JSON.stringify(shareWidgets(widgets))

const unsub = unsubscribe => unsubscribe()
const URLExtension = ({
  history,
  settings,
  widgets,
  sidewidget,
  subwidgets,
  prevFullUrlRef,
  shortUrlHashState,
  setSlug
}) => {
  const { ticker, name } = settings
  const [sharedWidgets, setSharedWidgets] = useState('')
  const { isLoggedIn } = useUser()
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
    [widgets, subwidgets]
  )

  useEffect(
    () => {
      if (!sharedSettings || !sharedWidgets) return

      let [shortUrlHash, setShortUrlHash] = shortUrlHashState
      const url = getSharedUrl(
        shortUrlHash,
        sharedSettings,
        sharedWidgets,
        sidewidget
      )
      if (url === prevFullUrlRef.current) return

      prevFullUrlRef.current = url
      if (!isLoggedIn) return history.replace(url)

      let isRacing = false

      mutateShortUrl()
      function mutateShortUrl () {
        const shortUrlPromise = shortUrlHash
          ? updateShortUrl(shortUrlHash, url)
          : getShortUrl(url).then(newShortUrlHash => {
            if (isRacing) return

            shortUrlHash = newShortUrlHash
            setShortUrlHash(newShortUrlHash)

            history.push(buildChartShortPath(shortUrlHash))
          })

        shortUrlPromise
          .then(() => {
            if (isRacing) return

            history.replace(buildChartShortPath(shortUrlHash))
          })
          .catch(error => {
            if (isRacing) return

            if (checkIsNotAuthorError(error)) {
              shortUrlHash = undefined
              return mutateShortUrl()
            }

            history.replace(url)
            // onShortUrlUpdateError()
          })
      }
      return () => (isRacing = true)
    },
    [sharedSettings, sharedWidgets, sidewidget]
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
