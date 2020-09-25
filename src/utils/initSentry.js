import * as Sentry from '@sentry/react'

const initSentry = () => {
  if (!window.env) {
    window.env = {
      RAVEN_DSN: '',
      WEBSITE_URL: process.env.REACT_APP_WEBSITE_URL || ''
    }
  }

  const configs = {
    dsn: window.env.RAVEN_DSN || '',
    release: `Ver. ${process.env.REACT_APP_VERSION}`
  }

  Sentry.init(configs)

  Sentry.setTags({
    git_commit: (process.env.REACT_APP_VERSION || '').split('-')[1],
    environment: process.env.NODE_ENV
  })
}

export default initSentry
