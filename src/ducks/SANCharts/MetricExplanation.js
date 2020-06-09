import React from 'react'
import Tooltip from '@santiment-network/ui/Tooltip'
import Button from '@santiment-network/ui/Button'
import { Event } from '../dataHub/events'
import { Description } from '../dataHub/metrics/descriptions'
import MoreInfoLink from '../../components/MoreInfoLink/MoreInfoLink'
import styles from './MetricExplanation.module.scss'

const Note = ({ children }) => (
  <p className={styles.note}>
    <span className={styles.warning}>Important!</span>
    <span className={styles.text}>{children}</span>
  </p>
)

Event.trendPositionHistory.note = <Note>It will disable Anomalies</Note>

const COMPLEXITY_NOTE =
  'The requested period is outside of your plan boundaries'

function prepareDescription (descriptionElement, project) {
  if (!descriptionElement || !project) {
    return descriptionElement
  }

  if (typeof descriptionElement === 'object') {
    return descriptionElement
  }

  return descriptionElement.replace('[Project Ticker]', project.ticker)
}

const MetricExplanation = ({
  metric,
  withChildren = false,
  isComplexityError,
  children,
  project = {},
  ...rest
}) => {
  const { key, label, fullTitle = label, video, note, moreInfoLink } = metric
  const description = prepareDescription(Description[key], project)

  if (!description && isComplexityError) {
    return (
      <Tooltip className={styles.explanation} trigger={children} {...rest}>
        <div className={styles.explanation__content}>
          <Note>{COMPLEXITY_NOTE}</Note>
        </div>
      </Tooltip>
    )
  }

  return description ? (
    <Tooltip className={styles.explanation} trigger={children} {...rest}>
      <div className={styles.explanation__content}>
        <h4 className={styles.title}>{fullTitle}</h4>
        <p className={styles.text}>
          {description}
          {moreInfoLink && <MoreInfoLink href={moreInfoLink} />}
        </p>
        {note && note}
        {video && (
          <Button
            border
            as='a'
            href={video}
            target='_blank'
            rel='noopener noreferrer'
            className={styles.button}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='14'
              fill='none'
            >
              <rect
                width='14.5'
                height='12.5'
                x='.75'
                y='.75'
                stroke='#9FAAC4'
                strokeWidth='1.5'
                rx='2.25'
              />
              <path
                fill='#9FAAC4'
                d='M10.87 6.74c.2.12.2.4 0 .52L6.75 9.73a.3.3 0 0 1-.45-.26V4.53a.3.3 0 0 1 .45-.26l4.12 2.47z'
              />
            </svg>
            <span className={styles.button__text}>Watch how to use it</span>
          </Button>
        )}
        {isComplexityError && <Note>{COMPLEXITY_NOTE}</Note>}
      </div>
    </Tooltip>
  ) : withChildren ? (
    children
  ) : null
}

export default MetricExplanation
