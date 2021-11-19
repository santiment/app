import React from 'react'

import Steps from '../../../../components/Steps/Steps'
import ProjectIcon from '../../../../components/ProjectIcon/ProjectIcon'

import AssetSelector from '../../TypeSteps/AssetSelector/AssetSelector'
import MetricsAndConditionsSelector from '../../TypeSteps/MetricsAndConditionsSelector/MetricsAndConditionsSelector'

import styles from './AlertModalContent.module.scss'
import { getSlugFromSignalTarget } from '../../../Signals/utils/utils'

const AlertModalContent = ({
  currentAlertType,
  selectedStep,
  setSelectedStep,
  handleFormValueChange,
  formValues,
  metaFormSettings
}) => {
  const handleStepClick = step => () => {
    setSelectedStep(step)
  }

  switch (selectedStep) {
    case 0:
      return (
        <div className={styles.content}>
          <AssetSelector
            handleFormValueChange={handleFormValueChange}
            handleStepClick={handleStepClick}
            initialValues={formValues.target}
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
          />
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
        </div>
      )
  }
}

export default AlertModalContent
