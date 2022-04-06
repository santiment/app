import React from 'react'
import cx from 'classnames'
import { useFormikContext } from 'formik'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import AlertStepsSelector from '../AlertStepsSelector/AlertStepsSelector'
import styles from './AlertModalSidebar.module.scss'

const AlertModalSidebar = ({
  isMetricsDisabled,
  selectorSettings,
  values,
  hasSignal,
  isSharedTrigger,
  isEdited,
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

  const shouldHideSubmitButton = id && !isSharedTrigger && !isEdited

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
          {!hasSignal && (
            <button className={cx(styles.backButton, 'btn body-3')} onClick={handleReturnBack}>
              <Icon type='arrow-left' className={cx(styles.backIcon, 'mrg--r mrg-s')} /> Alert types
            </button>
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
            {id && !isSharedTrigger ? 'Apply changes' : 'Create alert'}
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export default AlertModalSidebar
