import React, { useRef, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import { parse } from 'query-string'
import { updateShortUrl, buildChartShortPath } from './utils'
import { store } from '../../redux'
import { useUser } from '../../stores/user'
import { getIdFromSEOLink } from '../../utils/url'
import { showNotification } from '../../actions/rootActions'
import { getShortUrl } from '../../components/Share/utils'
import { generateUrlV2 } from '../../ducks/Studio/url/generate'
import { getChartWidgetsFromTemplate } from '../../ducks/Studio/Template/utils'
import { getTemplate } from '../../ducks/Studio/Template/gql/hooks'

const getFullUrl = config => '/charts?' + generateUrlV2(config)

const checkIsNotAuthorError = ({ message }) => message.includes('another user')

const onShortUrlUpdateError = () =>
  store.dispatch(
    showNotification({
      title: 'Short URL update failed',
      variant: 'error'
    })
  )

const URLExtension = ({
  history,
  settings,
  widgets,
  sidepanel,
  shortUrlHashState,
  prevFullUrlRef,
  setSettings,
  setWidgets
}) => {
  const { slug, name, ticker } = settings
  const { isLoggedIn } = useUser()
  const slugRef = useRef(slug)
  slugRef.current = slug

  // NOTE: This version of withRouter does not trigger rerender on location change (it depends on the root component rerender [@vanguard | Oct 8, 2020]
  useEffect(
    () => {
      let prevPathname = ''
      history.listen(({ search, pathname }) => {
        if (prevPathname !== pathname) {
          prevPathname = pathname
          const templateId = getIdFromSEOLink(pathname)

          if (templateId) {
            return getTemplate(templateId)
              .then(template => {
                const newSettings = { ...settings, ...template.project }
                const newWidgets = getChartWidgetsFromTemplate(template)
                setSettings(newSettings)
                setWidgets(newWidgets)
              })
              .catch(console.error)
          }
        }

        const searchSlug = parse(search).slug
        if (searchSlug && searchSlug !== slugRef.current) {
          setSettings(settings => ({ ...settings, slug: searchSlug }))
        }
      })
    },

    []
  )

  useEffect(
    () => {
      const fullUrl = getFullUrl({
        settings,
        widgets,
        sidepanel
      })

      if (fullUrl !== prevFullUrlRef.current) {
        const replaceHistory = () => history.replace(fullUrl)
        let [shortUrlHash, setShortUrlHash] = shortUrlHashState

        prevFullUrlRef.current = fullUrl

        if (!isLoggedIn) {
          setShortUrlHash(undefined)
          return replaceHistory()
        }

        mutateShortUrl()
        function mutateShortUrl () {
          const shortUrlPromise = shortUrlHash
            ? updateShortUrl(shortUrlHash, fullUrl)
            : getShortUrl(fullUrl).then(newShortUrlHash => {
              shortUrlHash = newShortUrlHash
              setShortUrlHash(newShortUrlHash)
            })

          shortUrlPromise
            .then(() => history.replace(buildChartShortPath(shortUrlHash)))
            .catch(error => {
              if (checkIsNotAuthorError(error)) {
                shortUrlHash = undefined
                return mutateShortUrl()
              }

              replaceHistory()
              onShortUrlUpdateError()
            })
        }
      }
    },
    [settings, widgets, sidepanel]
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
