import React, { useState } from 'react'
import cx from 'classnames'
import Dialog from './index'

export default props => {
  return (
    <Dialog
      {...props}
      title='New Template'
      placeholder='Name of the template...'
      onFormSubmit={console.log}
      buttonLabel='Create'
    />
  )
}
