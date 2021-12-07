import React from 'react'
import NotificationAndPrivacy from './NotificationAndPrivacy/NotificationAndPrivacy'
import NameAndDescription from './NameAndDescription/NameAndDescription'

function StepsContent ({ selectorSettings }) {
  const { selectedType, selectedStep } = selectorSettings

  switch (selectedType.subSteps[selectedStep].label) {
    case 'Notification & Privacy settings': {
      return <NotificationAndPrivacy selectorSettings={selectorSettings} />
    }
    case 'Name & Description': {
      return <NameAndDescription />
    }
    default:
      return <div />
  }
}

export default StepsContent
