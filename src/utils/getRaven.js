import Raven from 'raven-js'

const getRaven = () => {
  window.Raven = Raven

  if (!window.env) {
    window.env = {
      RAVEN_DSN: '', // [GarageInc | 24.09.2020, added for testing] https://0bde1b161a1043929cc3b8ab6686dd6a@sentry.stage.internal.santiment.net/3',
      WEBSITE_URL: process.env.REACT_APP_WEBSITE_URL || ''
    }
  }
  Raven.config(window.env.RAVEN_DSN || '', {
    release: process.env.REACT_APP_VERSION,
    environment: process.env.NODE_ENV,
    tags: {
      git_commit: (process.env.REACT_APP_VERSION || '').split('-')[1]
    }
  }).install()
  return Raven
}

export default getRaven
