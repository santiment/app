import React from 'react'
import Button from '@santiment-network/ui/Button'
import { VideoLinks } from './video'
import styles from './MetricVideoBtn.module.scss'

const MetricVideoBtn = ({ metric: { key } }) => {
  const link = VideoLinks[key]

  if (!link) {
    return null
  }

  return (
    <Button
      border
      as='a'
      href={link}
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
  )
}

export default MetricVideoBtn
