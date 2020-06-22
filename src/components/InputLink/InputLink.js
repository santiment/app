import React from 'react'
import Input from '@santiment-network/ui/Input'

function validURL (str) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ) // fragment locator
  return !!pattern.test(str)
}

const InputLink = props => {
  const { value, disabled } = props

  const isError = value && !disabled && !validURL(value)

  return (
    <Input type='text' {...props} isError={isError} placeholder='https://' />
  )
}

export default InputLink
