import React from 'react'
import MetricAndConditions from './MetricAndConditions/MetricAndConditions'
import NotificationAndPrivacy from './NotificationAndPrivacy/NotificationAndPrivacy'
import NameAndDescription from './NameAndDescription/NameAndDescription'

const StepsContent = ({ selectorSettings }) => {
  const { selectedType, selectedStep } = selectorSettings

  switch (selectedType.subSteps[selectedStep].label) {
    case 'Metric & Conditions': {
      return <MetricAndConditions selectorSettings={selectorSettings} />
    }
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
