import React from 'react'
import SignalMasterModalForm from '../signalModal/SignalMasterModalForm'
import styles from './OpenSignalLink.module.scss'

const PERCENT_REGEXP = new RegExp('( )?\\d+(\\s{0,1}\\%?( )?|\\s\\b)', 'gi')

const prepareTitle = title => {
  const digits = title.match(PERCENT_REGEXP)

  if (digits && digits.length) {
    let result = []

    let temporaryTitle = title

    for (let i = 0; i < digits.length; i++) {
      const item = digits[i]

      if (item) {
        let partsForHighline = temporaryTitle.split(item)

        result.push(partsForHighline[0])

        if (item[0] === '-') {
          result.push(
            <span key={i} className={styles.down}>
              {item}
            </span>
          )
        } else {
          result.push(
            <span key={i} className={styles.up}>
              {item}
            </span>
          )
        }

        temporaryTitle = partsForHighline[1]

        if (i === digits.length - 1) {
          result.push(partsForHighline[1])
        }
      }
    }

    return result
  }

  return title
}

const OpenSignalLink = ({ signal: { id, title } }) => (
  <SignalMasterModalForm
    id={id}
    defaultOpen={false}
    canRedirect={false}
    trigger={<div className={styles.link}>{prepareTitle(title)}</div>}
  />
)

export default OpenSignalLink
