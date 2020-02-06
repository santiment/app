import React from 'react'
import SignalMasterModalForm from '../signalModal/SignalMasterModalForm'
import styles from './OpenSignalLink.module.scss'

const OpenSignalLink = ({ signal: { id, title } }) => (
  <SignalMasterModalForm
    id={id}
    defaultOpen={false}
    canRedirect={false}
    trigger={<div className={styles.link}>{title}</div>}
  />
)

export default OpenSignalLink
