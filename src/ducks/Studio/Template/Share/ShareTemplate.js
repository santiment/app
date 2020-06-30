import React from 'react'
import { getTemplateShareLink } from '../utils'
import ShareModalTrigger from '../../../../components/Share/ShareModalTrigger'

const ShareTemplate = ({ template, ...rest }) => {
  if (!template.isPublic) {
    return null
  }

  return (
    <ShareModalTrigger
      dialogTitle='Share Chart Layout'
      shareLink={getTemplateShareLink(template)}
      border={false}
      {...rest}
    />
  )
}

export default ShareTemplate
