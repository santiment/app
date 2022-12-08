import React, { useEffect } from 'react'
import { isTrackingEnabled } from 'webkit/analytics'
import PageLoader from '../../components/Loader/PageLoader'

export default ({ match }) => {
  useEffect(() => {
    setTimeout(
      () => {
        const path = window.location.href
          .replace(window.location.origin, '')
          .replace(match.path, '')

        const stage = process.env.IS_STAGE_BACKEND ? '-stage' : ''
        const href = `https://insights${stage}.santiment.net${path}`

        window.location = href
      },
      isTrackingEnabled ? 200 : 0,
    )
  }, [])

  return <PageLoader />
}
