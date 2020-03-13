import React from 'react'
import SignalMasterModalForm from '../signalModal/SignalMasterModalForm'
import styles from './OpenSignalLink.module.scss'

const PERCENT_REGEXP = new RegExp(
  '((0x)?[0-9a-fA-F]{40})|( {1}[-\\$]?\\d+[,.]?\\d{0,}[,.$%]?\\d{0,}[$%]?[^x| ])|( {1}[-\\$]?\\d+[,.$%]?\\d{0,}[$%]? )',
  'gi'
)

const prepareTitle = title => {
  const digits = title.match(PERCENT_REGEXP)

  if (digits && digits.length) {
    let result = []

    let temporaryTitle = title

    for (let i = 0; i < digits.length; i++) {
      const item = digits[i]

      if (item) {
        let partsForHighline = temporaryTitle.split(item)

        let first = partsForHighline[0]

        result.push(first)

        const isForceNegative =
          first &&
          (first.indexOf('down') !== -1 || first.indexOf('below') !== -1)

        if (item[0] === '-' || isForceNegative) {
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

        if (partsForHighline[1]) {
          temporaryTitle = partsForHighline[1]

          if (i === digits.length - 1) {
            result.push(partsForHighline[1])
          }
        } else {
          break
        }
      }
    }

    return result
  }

  return title
}

const OpenSignalLink = ({ signal: { id, title }, children }) => (
  <SignalMasterModalForm
    id={id}
    defaultOpen={false}
    canRedirect={false}
    trigger={
      <div>
        <div className={styles.link}>{prepareTitle(title)}</div>
        {children}
      </div>
    }
  />
)

export default OpenSignalLink
