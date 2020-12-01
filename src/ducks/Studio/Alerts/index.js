import React from 'react'
import cx from 'classnames'
import { useSuggestions } from './suggestions/hooks'
import SignalMasterModalForm from '../../Signals/signalModal/SignalMasterModalForm'
import { mapToOption } from '../../Signals/utils/utils'
import LoginPopup from '../../../components/banners/feature/PopupBanner'
import styles from './index.module.scss'

const Alert = ({ alert, render, createAlert }) => {
  function onClick () {
    createAlert(alert)
  }

  return (
    <LoginPopup>
      <div className={styles.alert} onClick={onClick}>
        {render}
      </div>
    </LoginPopup>
  )
}

function getHeader (title, project) {
  let header = title

  if (project) {
    header += ` (${project.ticker})`
  }

  return header
}

export default ({
  className,
  metricValues,
  containerRef,
  onDialogClose,
  ...rest
}) => {
  const suggestions = useSuggestions(metricValues)

  return (
    <div ref={containerRef} className={cx(styles.wrapper, className)}>
      <div className={styles.header}>
        Create alert if:
        <SignalMasterModalForm
          onClose={onDialogClose}
          canRedirect={false}
          trigger={<span className={styles.manual}>Create alert manually</span>}
          metaFormSettings={{
            target: {
              value: mapToOption(rest.slug)
            }
          }}
        />
      </div>
      <div className={styles.suggestions}>
        {suggestions.map(({ title, project, suggesters, ...values }) => {
          const header = getHeader(title, project)
          return (
            <div key={header} className={styles.suggestion}>
              <div className={styles.title}>{header}</div>
              {suggesters.map((suggest, i) => (
                <Alert
                  key={i}
                  {...rest}
                  {...suggest({ ...rest, ...values, ...project })}
                />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
