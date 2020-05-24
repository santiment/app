import { useState, useEffect } from 'react'
import { parse } from 'query-string'

export const UrlModal = {
  SIGN_UP: 'signUp',
}

export function useUrlModal() {
  const [urlModal, setUrlModal] = useState()

  useEffect(() => {
    setUrlModal(parse(window.location.search).modal)
  }, [])

  return urlModal
}
