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
    <LoginDialogWrapper title='Create signal'>
      <div className={styles.alert} onClick={onClick}>
        {render}
      </div>
    </LoginDialogWrapper>
  )
}

export default ({ className, metricValues, onDialogClose, ...rest }) => {
  const suggestions = useSuggestions(metricValues)

  return (
    <div className={cx(styles.wrapper, className)}>
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
        {suggestions.map(({ title, suggesters, ...values }) => (
          <div key={title} className={styles.suggestion}>
            <div className={styles.title}>{title}</div>
            {suggesters.map((suggest, i) => (
              <Alert key={i} {...rest} {...suggest({ ...rest, ...values })} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
