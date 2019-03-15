import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@santiment-network/ui'

export const LinkToSocialTool = ({ slug, ticker, name }) => {
  const social =
    window.encodeURIComponent(
      `${slug || ''}${ticker ? ' OR ' + ticker : ''}${
        name ? ' OR ' + name : ''
      }`
    ) + `?asset=${slug}`
  return (
    <Fragment>
      {slug ? (
        <Link to={`/labs/trends/explore/${social}`}>See Social Trends</Link>
      ) : (
        <span>...</span>
      )}
    </Fragment>
  )
}

export default LinkToSocialTool
