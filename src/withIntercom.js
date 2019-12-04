import React, { Component } from 'react'
import { loadState } from './utils/localStorage'

if (process.env.NODE_ENV === 'production') {
  const loadedState = loadState()
  const user = loadedState ? loadedState.data : {}
  const settings = {
    app_id: 'cyjjko9u',
    email: user.email,
    name: user.username,
    user_id: user.id
  }
  window.Intercom('boot', settings)
  window.intercomSettings = settings
}

const withIntercom = (WrappedComponent, options = {}) => {
  const updateIntercom = () => {
    if (process.env.NODE_ENV === 'production') {
      window.Intercom('update')
    }

    // Wait for the iframe to become ready (max 30 seconds)
    const timeout = setTimeout(() => clearInterval(interval), 30000)
    const interval = setInterval(() => {
      const iframe = document.querySelector('.intercom-launcher-frame')

      if (iframe) {
        const intercomLauncher = iframe.contentDocument.querySelector(
          '#intercom-container .intercom-launcher'
        )
        intercomLauncher.setAttribute(
          'style',
          'background: var(--jungle-green) !important;'
        )

        iframe.setAttribute('style', 'background: var(--jungle-green);')

        clearInterval(interval)
        clearTimeout(timeout)
      }
    }, 100)
  }

  const HOC = class extends Component {
    componentDidMount () {
      updateIntercom()
    }

    componentWillReceiveProps (nextProps) {
      const currentPage = this.props.location.pathname
      const nextPage = nextProps.location.pathname

      if (currentPage !== nextPage) {
        updateIntercom()
      }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }

  return HOC
}

export default withIntercom
