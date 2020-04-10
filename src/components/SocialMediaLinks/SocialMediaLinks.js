import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './SocialMediaLinks.module.scss'

const SOCIAL_MEDIAS = [
  {
    link: 'https://santiment.net/discord',
    item: (
      <svg
        className={styles.discord}
        width='20'
        height='15'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M13.63 13.5c.51.64 1.13 1.38 1.13 1.38a6.26 6.26 0 005.24-2.6c-.06-3.47-.9-6.88-2.47-9.98a8.47 8.47 0 00-4.8-1.8l-.25.27a11.4 11.4 0 014.27 2.17 13.96 13.96 0 00-8.9-1.55c-1.34.15-2.65.51-3.89 1.07-.63.28-1 .5-1 .5A11.56 11.56 0 017.44.7L7.28.5a8.47 8.47 0 00-4.81 1.8A22.93 22.93 0 000 12.28a6.2 6.2 0 005.22 2.6l.47-.57.68-.85a5.33 5.33 0 01-3-2.02c.61.4 1.27.75 1.96 1.01.81.32 1.65.57 2.51.74a11.99 11.99 0 006.92-.72 9.8 9.8 0 001.97-1.01 5.4 5.4 0 01-3.1 2.04zm-8.08-6a1.9 1.9 0 011.25-.61 1.81 1.81 0 011.74 1.9 1.82 1.82 0 01-1.74 1.9 1.9 1.9 0 01-1.25-3.2zm6.4-.37a1.9 1.9 0 011.1-.24 1.82 1.82 0 011.74 1.9 1.9 1.9 0 11-2.84-1.66z'
        />
      </svg>
    )
  },
  {
    link: 'https://twitter.com/santimentfeed',
    item: <Icon type='twitter' className={styles.twitter} />
  },
  {
    link: 'https://github.com/santiment',
    item: (
      <svg
        className={styles.github}
        width='21'
        height='20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M10 0A10 10 0 000 10a10.1 10.1 0 006.81 9.5c.5.07.67-.24.67-.48V17.3c-2.76.61-3.37-1.35-3.37-1.35-.43-1.16-1.1-1.47-1.1-1.47-.92-.62.06-.62.06-.62.98.07 1.53 1.05 1.53 1.05.92 1.53 2.33 1.1 2.88.86.07-.68.37-1.1.62-1.35-2.21-.25-4.54-1.1-4.54-4.97 0-1.1.37-1.97 1.04-2.7-.06-.19-.43-1.23.12-2.58 0 0 .86-.24 2.76 1.04.8-.24 1.66-.3 2.52-.3.86 0 1.72.12 2.52.3 1.9-1.28 2.76-1.04 2.76-1.04.55 1.35.18 2.4.12 2.64.61.67 1.04 1.6 1.04 2.7 0 3.86-2.33 4.66-4.54 4.9.37.31.68.93.68 1.85v2.76c0 .24.18.55.67.49A10.01 10.01 0 0010 0z'
        />
      </svg>
    )
  },
  {
    link: 'https://t.me/santiment_network',
    item: <Icon type='telegram' className={styles.telegram} />
  },
  {
    link: 'https://www.youtube.com/c/santimentnetwork',
    item: (
      <svg
        className={styles.youtube}
        width='20'
        height='16'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M19.47 3.15a2.5 2.5 0 00-1.74-1.77C16.18.95 10 .95 10 .95s-6.18 0-7.73.41C1.44 1.6.76 2.3.53 3.16.13 4.72.13 8 .13 8s0 3.29.4 4.85c.23.86.9 1.54 1.74 1.77 1.56.43 7.73.43 7.73.43s6.18 0 7.73-.41a2.5 2.5 0 001.74-1.78c.4-1.57.4-4.84.4-4.84s.02-3.29-.4-4.87z' />
        <path d='M8.59 10.82L12.82 8 8.6 5.18v5.64z' fill='var(--white)' />
      </svg>
    )
  }
]

const SocialMediaLinks = ({ classes = {} }) => {
  return (
    <div className={styles.container}>
      {SOCIAL_MEDIAS.map(({ link, item }, index) => {
        return (
          <a
            key={index}
            href={link}
            target='_blank'
            rel='noopener noreferrer'
            className={cx(classes.link, styles.mediaLink)}
          >
            {item}
          </a>
        )
      })}
    </div>
  )
}

export default SocialMediaLinks
