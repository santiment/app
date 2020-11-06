import React from 'react'
import cx from 'classnames'
import { useSuggestions } from './suggestions/hooks'
import SignalMasterModalForm from '../../Signals/signalModal/SignalMasterModalForm'
import { mapToOption } from '../../Signals/utils/utils'
import LoginDialogWrapper from '../../../components/LoginDialog/LoginDialogWrapper'
import styles from './index.module.scss'

const Alert = ({ alert, render, createAlert }) => {
  function onClick () {
    createAlert(alert)
  }

  return (
    <LoginDialogWrapper title='Create alert'>
      <div className={styles.alert} onClick={onClick}>
        {render}
      </div>
    </LoginDialogWrapper>
  )
}

const Header = ({ title, project }) => (
  <div className={styles.title}>
    {title}
    {project && ` (${project.ticker})`}
  </div>
)

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
        {suggestions.map(({ title, project, suggesters, ...values }) => (
          <div key={title} className={styles.suggestion}>
            <Header title={title} project={project} />
            {suggesters.map((suggest, i) => (
              <Alert
                key={i}
                {...rest}
                {...suggest({ ...rest, ...values, ...project })}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
