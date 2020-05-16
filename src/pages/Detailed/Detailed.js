import React from 'react'
import { Redirect } from 'react-router-dom'

export default ({ match: { params }, location: { search = '?' } }) => {
  const { slug } = params
  const to = search ? `${search}&slug=${slug}` : `?slug=${slug}`

  return <Redirect to={`/studio${to}`} />
}
