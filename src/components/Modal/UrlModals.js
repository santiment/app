import React, { useState, useEffect } from 'react'
import { parse } from 'query-string'
import Loadable from 'react-loadable'
import Switch, { Case } from '../Switch'

const UrlModal = {
  SIGN_UP: 'signup',
  LOGIN: 'login'
}

function useUrlModal () {
  const [urlModal, setUrlModal] = useState()

  useEffect(() => {
    setUrlModal(parse(window.location.search).modal)
  }, [])

  return urlModal
}

const loading = () => null

const LoadableSignUp = Loadable({
  loader: () => import('./SignUp'),
  loading
})

const UrlModals = () => {
  const urlModal = useUrlModal()

  return (
    <Switch case={urlModal}>
      <Case of={UrlModal.SIGN_UP} render={LoadableSignUp} />
      <Case of={UrlModal.LOGIN} render={LoadableSignUp} defaultRoute='/login' />
    </Switch>
  )
}

export default UrlModals
