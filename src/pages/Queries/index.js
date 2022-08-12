import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Redirect } from 'react-router-dom'
import { parse } from 'webkit/utils/url'
import SanQueries from 'san-queries/lib/index.svelte'

const Queries = () => {
  const ref = useRef()

  useEffect(() => {
    const page = ref.current

    const { shared } = parse(window.location.search)
    const panel = shared ? JSON.parse(shared) : undefined
    window.history.pushState(null, '', '/queries')

    const queries = new SanQueries({
      target: page,
      props: { dashboard: panel && { panels: [panel] } },
    })

    return () => queries.$destroy()
  }, [])

  return <div ref={ref} />
}

export default (props) => {
  const { isDesktop, location } = props

  if (!isDesktop) {
    return <Redirect to='/' />
  }

  return <Queries {...props} search={location.search} />
}
