import React from 'react'
import SignalMasterModalForm from '../signalModal/SignalMasterModalForm'
import styles from './OpenSignalLink.module.scss'
import ScreenerSignalDialog from '../ScreenerSignal/ScreenerSignalDialog'
import { METRIC_TYPES } from '../utils/constants'

const PERCENT_REGEXP = new RegExp(
  '((0x)?[0-9a-fA-F]{40})|( {1}[-\\$]?\\d+[,.]?\\d{0,}[,.$%]?\\d{0,}[$%]?[^x| ])|( {1}[-\\$]?\\d+[,.$%]?\\d{0,}[$%]? )',
  'gi'
)

const NEGATIVE_WORDS = ['down', 'below', 'decreases']

const prepareTitle = title => {
  let checkingTitle = title
  if (Array.isArray(title)) {
    checkingTitle = title.join('')
  }

  if (!checkingTitle || typeof checkingTitle !== 'string') {
    return title
  }

  const digits = checkingTitle.match(PERCENT_REGEXP)

  if (digits && digits.length) {
    let result = []

    let temporaryTitle = checkingTitle

    for (let i = 0; i < digits.length; i++) {
      const item = digits[i]

      if (item) {
        let partsForHighline = temporaryTitle.split(item)

        let first = partsForHighline[0]

        result.push(first)

        const isForceNegative =
          first && NEGATIVE_WORDS.some(word => first.indexOf(word) !== -1)

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

  return checkingTitle
}

const OpenSignalLink = ({
  signal: {
    id,
    title,
    settings: { type }
  },
  signal,
  children
}) => {
  const trigger = (
    <div>
      <div className={styles.link}>{prepareTitle(title)}</div>
      {children}
    </div>
  )

  switch (type) {
    case METRIC_TYPES.SCREENER_SIGNAL: {
      return <ScreenerSignalDialog signal={signal} trigger={trigger} />
    }
    default: {
      return (
        <SignalMasterModalForm
          id={id}
          defaultOpen={false}
          canRedirect={false}
          trigger={trigger}
        />
      )
    }
  }
}

export default OpenSignalLink
