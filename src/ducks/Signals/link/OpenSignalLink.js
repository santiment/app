import React from 'react'
import cx from 'classnames'
import AlertModal from '../../Alert/AlertModal'
import styles from './OpenSignalLink.module.scss'

const PERCENT_REGEXP = new RegExp(
  '((0x)?[0-9a-fA-F]{40})|( {1}[-\\$]?\\d+[,.]?\\d{0,}[,.$%]?\\d{0,}[$%]?[^x| ])|( {1}[-\\$]?\\d+[,.$%]?\\d{0,}[$%]? )',
  'gi'
)

const NEGATIVE_WORDS = ['down', 'below', 'decreases']

export const prepareAlertTitle = (title, isFrozen) => {
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
            <span
              key={i}
              className={cx(styles.down, isFrozen && styles.frozenDown)}
            >
              {item}
            </span>
          )
        } else {
          result.push(
            <span
              key={i}
              className={cx(styles.up, isFrozen && styles.frozenUp)}
            >
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
  signal,
  children,
  isUserTheAuthor,
  shouldDisableActions
}) => {
  const { id, title, isFrozen } = signal

  const trigger = (
    <div>
      <div className={cx(styles.link, isFrozen && styles.frozenLink)}>
        {prepareAlertTitle(title, isFrozen)}
      </div>
      {children}
    </div>
  )

  return (
    <AlertModal
      shouldDisableActions={shouldDisableActions}
      id={id}
      trigger={trigger}
      isUserTheAuthor={isUserTheAuthor}
      prepareAlertTitle={prepareAlertTitle}
    />
  )
}

export default OpenSignalLink
