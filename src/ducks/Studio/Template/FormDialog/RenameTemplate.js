import React, { useState } from 'react'
import cx from 'classnames'
import Dialog from './index'

export default props => {
  return (
    <Dialog
      {...props}
      title='Rename Template'
      onFormSubmit={console.log}
      buttonLabel='Rename'
      defaultValue='123'
    />
  )
}
