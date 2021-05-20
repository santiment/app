import React from 'react'
import Studio from '../Studio/Studio'
import { useUrlParse } from '../Studio/parse'

export default ({ parsedUrl, ...props }) => {
  const defaults = useUrlParse(parsedUrl)

  return <Studio {...defaults} />
}
