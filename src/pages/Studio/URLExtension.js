import { useEffect } from 'react'
import { generateUrlV2 } from '../../ducks/Studio/url/generate'

const URLExtension = ({ history, settings, widgets, sidepanel }) => {
  useEffect(
    () => {
      history.replace(`${window.location.pathname}${window.location.search}`)
    },
    [settings.slug]
  )

  useEffect(
    () => {
      history.replace(
        `${window.location.pathname}?${generateUrlV2({
          settings,
          widgets,
          sidepanel
        })}`
      )
    },
    [settings, widgets, sidepanel]
  )

  return null
}

export default URLExtension
