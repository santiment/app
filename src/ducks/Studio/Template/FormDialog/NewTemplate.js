import React, { useState } from 'react'
import cx from 'classnames'
import Dialog from './index'

export default ({ onNew, ...props }) => {
  function onSubmit (value) {
    const newTemplate = {
      id: Date.now(),
      title: value,
      metrics: ['price_usd'],
      project: {
        name: 'Ethereum'
      }
    }

    onNew(newTemplate)
  }

  return (
    <Dialog
      {...props}
      title='New Template'
      placeholder='Name of the template...'
      onFormSubmit={onSubmit}
      buttonLabel='Create'
    />
  )
}
