import React from 'react'
import ShareModalTrigger from '../../../../components/Share/ShareModalTrigger'

const ShareTemplate = ({ template, ...rest }) => {
  if (!template.isPublic) {
    return null
  }
  const {
    location: { origin, pathname }
  } = window

  return (
    <ShareModalTrigger
      dialogTitle='Share Chart Layout'
      shareLink={origin + pathname}
      border={false}
      {...rest}
    />
  )
}

export default ShareTemplate
