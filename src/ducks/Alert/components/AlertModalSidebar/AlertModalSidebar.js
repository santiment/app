import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { useFormikContext } from 'formik'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import AlertStepsSelector from '../AlertStepsSelector/AlertStepsSelector'
import AlertTooltip from '../../../../components/AlertTooltip/AlertTooltip'
import styles from './AlertModalSidebar.module.scss'

const AlertModalSidebar = ({
  isMetricsDisabled,
  selectorSettings,
  values,
  hasSignal,
  isSharedTrigger,
  isEdited,
  isRecommendedSignal,
  isRestrictedMessageClosed,
}) => {
  const { submitForm, isSubmitting } = useFormikContext()

  const {
    selectedType,
    id,
    setSelectedStep,
    setFormPreviousValues,
    setInvalidSteps,
    shouldHideRestrictionMessage,
  } = selectorSettings

  const shouldHideSubmitButton = id && !isSharedTrigger && !isEdited && !isRecommendedSignal

  function handleReturnBack() {
    setSelectedStep(undefined)
    setFormPreviousValues(values)
    setInvalidSteps([])
  }

  function handleSubmit() {
    if (isSubmitting) {
      submitForm()
    }
  }

  return (
    <div
      className={cx(
        styles.wrapper,
        !shouldHideSubmitButton && styles.submitPadding,
        !shouldHideRestrictionMessage && styles.wrapperResized,
        'relative column justify fluid',
      )}
    >
      <div>
        <div className={cx(styles.titleWrapper, 'row justify v-center')}>
          <div className='h4 c-black'>{selectedType.title}</div>
          {!hasSignal ? (
            <button className={cx(styles.backButton, 'btn body-3')} onClick={handleReturnBack}>
              <Icon type='arrow-left' className={cx(styles.backIcon, 'mrg--r mrg-s')} /> Categories
            </button>
          ) : (
            <AlertTooltip
              isVisible={!shouldHideRestrictionMessage && isRestrictedMessageClosed}
              content={
                <span>
                  <span className='txt-m'>Alert with Duration Restriction.</span> Your Alert will be
                  valid for 30 days from the day it’s created. To extend Alert please{' '}
                  <Link to='/pricing' className={cx(styles.link, styles.tooltipLink, 'txt-m')}>
                    Upgrade your Plan!
                  </Link>
                </span>
              }
            />
          )}
        </div>
        <div className={styles.divider} />
        <AlertStepsSelector
          items={selectedType.steps}
          selectorSettings={selectorSettings}
          isMetricsDisabled={isMetricsDisabled}
        />
      </div>
      {!shouldHideSubmitButton ? (
        <div className={styles.submitWrapper}>
          <Button
            type='submit'
            variant='fill'
            border={false}
            accent='positive'
            className={cx(styles.submit, 'row h-center')}
            onClick={handleSubmit}
          >
            {id && !isSharedTrigger && !isRecommendedSignal ? 'Apply changes' : 'Create alert'}
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export default AlertModalSidebar
