import React, { useMemo } from 'react'
import { getTemplateSharePath } from '../utils'
import ShareModalTrigger from '../../../../components/Share/ShareModalTrigger'

const ShareTemplate = ({ template, ...rest }) => {
  const shareLink = useMemo(
    () => window.location.origin + getTemplateSharePath(template),
    [template]
  )

  if (!template.isPublic) {
    return null
  }

  return (
    <ShareModalTrigger
      dialogTitle='Share Chart Layout'
      shareLink={shareLink}
      border={false}
      {...rest}
    />
  )
}

export default ShareTemplate
