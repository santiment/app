import React from 'react'
import Button from '@santiment-network/ui/Button'
import { connect } from 'react-redux'

import Steps from '../../../../components/Steps/Steps'
import ProjectIcon from '../../../../components/ProjectIcon/ProjectIcon'

import AssetSelector from '../../TypeSteps/AssetSelector/AssetSelector'
import MetricsAndConditionsSelector from '../../TypeSteps/MetricsAndConditionsSelector/MetricsAndConditionsSelector'
import NotificationsSettings from '../../TypeSteps/NotificationsSettings/NotificationsSettings'
import NameAndDescription from '../../TypeSteps/NameAndDescription/NameAndDescription'

import {
  getNewDescription,
  getNewTitle,
  getSlugFromSignalTarget,
  mapFormPropsToTrigger,
  titleMetricValuesHeader
} from '../../../Signals/utils/utils'
import { createTrigger } from '../../../Signals/common/actions'

import styles from './AlertModalContent.module.scss'

function getLastWord (words) {
  const wordsArr = words.split(' ')
  return wordsArr[wordsArr.length - 1]
}

const AlertModalContent = ({
  currentAlertType,
  selectedStep,
  setSelectedStep,
  handleFormValueChange,
  formValues,
  metaFormSettings,
  createTrigger,
  handleClose,
  resetForm
}) => {
  const handleStepClick = step => () => {
    setSelectedStep(step)
  }

  const handleTitlesChange = (fieldName, value) => {
    const subtitle = titleMetricValuesHeader(
      !!formValues.type.dependencies,
      {
        ...formValues,
        [fieldName]: value
      },
      `of ${formValues.target.map(item => item.name).join(', ')}`
    )
    handleFormValueChange({
      field: 'title',
      value: getNewTitle({ ...formValues, [fieldName]: value })
    })
    handleFormValueChange({
      field: 'description',
      value: getNewDescription({ ...formValues, [fieldName]: value })
    })
    handleFormValueChange({
      field: 'subtitle',
      value: subtitle
        ? {
            first: subtitle.titleLabel && getLastWord(subtitle.titleLabel),
            last: subtitle.titleDescription
          }
        : {}
    })
  }

  const handleCreateAlert = () => {
    const data = mapFormPropsToTrigger(formValues, {
      title: '',
      description: '',
      isActive: true,
      isPublic: false
    })

    createTrigger(data)
    handleClose()
    resetForm()
  }

  switch (selectedStep) {
    case 0:
      return (
        <div className={styles.content}>
          <AssetSelector
            handleFormValueChange={handleFormValueChange}
            handleStepClick={handleStepClick}
            initialValues={formValues.target}
            values={formValues}
          />
        </div>
      )
    case 1:
      const slug = getSlugFromSignalTarget({
        settings: {
          target: {
            slug: formValues.target.map(item => item.slug)
          }
        }
      })

      return (
        <div className={styles.content}>
          <MetricsAndConditionsSelector
            handleFormValueChange={handleFormValueChange}
            values={formValues}
            handleStepClick={handleStepClick}
            trigger={{
              settings: {
                target: {
                  slug: formValues.target.map(item => item.slug)
                }
              }
            }}
            slug={slug}
            metaFormSettings={metaFormSettings}
            handleTitlesChange={handleTitlesChange}
          />
        </div>
      )
    case 2:
      return (
        <div className={styles.content}>
          <NotificationsSettings
            values={formValues}
            metaFormSettings={metaFormSettings}
            handleStepClick={handleStepClick}
            handleTitlesChange={handleTitlesChange}
            handleFormValueChange={handleFormValueChange}
          />
        </div>
      )
    case 3:
      return (
        <div className={styles.content}>
          <NameAndDescription
            handleTitlesChange={handleTitlesChange}
            values={formValues}
            handleFormValueChange={handleFormValueChange}
          />
          <div className={styles.submitWrapper}>
            <Button
              accent='positive'
              variant='fill'
              disabled={!formValues.title}
              className={styles.submitButton}
              onClick={handleCreateAlert}
            >
              Create alert
            </Button>
          </div>
        </div>
      )
    default:
      return (
        <div className={styles.steps}>
          <Steps initial={0} current={selectedStep}>
            {currentAlertType.mainSteps.map((item, index) => {
              let description = item.description

              switch (index) {
                case 0:
                  if (formValues.target.length > 0) {
                    const shouldRenderTicker = formValues.target.length > 1
                    description = (
                      <div className={styles.assetsWrapper}>
                        {formValues.target.slice(0, 3).map(asset => (
                          <div key={asset.id} className={styles.projectWrapper}>
                            <ProjectIcon
                              size={16}
                              slug={asset.slug}
                              logoUrl={asset.logoUrl}
                            />
                            <div className={styles.projectTitle}>
                              {shouldRenderTicker ? asset.ticker : asset.name}
                            </div>
                          </div>
                        ))}
                        {formValues.target.length > 3 && (
                          <div className={styles.projectWrapper}>
                            <div className={styles.projectLengthTitle}>
                              + {formValues.target.length - 3}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  }
                  break
                case 1:
                  if (formValues.metric.label) {
                    description = (
                      <div className={styles.metricWrapper}>
                        {formValues.title}
                      </div>
                    )
                  }
                  break

                case 2:
                  if (
                    formValues.target.length > 0 &&
                    formValues.channels.length > 0
                  ) {
                    description = (
                      <div className={styles.channelsWrapper}>
                        <div className={styles.channel}>
                          {formValues.isPublic
                            ? 'Public alert'
                            : 'Private alert'}
                        </div>
                        <div className={styles.channel}>
                          Notify me on{' '}
                          {formValues.channels
                            .map(channel => {
                              if (typeof channel !== 'string') {
                                return 'Webhook'
                              }
                              return (
                                channel.charAt(0).toUpperCase() +
                                channel.slice(1)
                              )
                            })
                            .join(', ')}
                        </div>
                      </div>
                    )
                  }

                  break
                case 3:
                  if (formValues.title) {
                    description = (
                      <div className={styles.metricWrapper}>
                        {formValues.title}
                      </div>
                    )
                  }
                  break
                default:
                  break
              }

              const isDisabled = formValues.target.length === 0 && index !== 0

              return (
                <Steps.Step
                  disabled={isDisabled}
                  onClick={handleStepClick(index)}
                  key={item.label}
                  title={item.label}
                  description={description}
                />
              )
            })}
          </Steps>
          <div className={styles.submitWrapper}>
            <Button
              accent='positive'
              variant='fill'
              disabled={!formValues.title}
              className={styles.submitButton}
              onClick={handleCreateAlert}
            >
              Create alert
            </Button>
          </div>
        </div>
      )
  }
}

const mapDispatchToProps = dispatch => ({
  createTrigger: payload => {
    dispatch(createTrigger(payload))
  }
})

export default connect(null, mapDispatchToProps)(AlertModalContent)
