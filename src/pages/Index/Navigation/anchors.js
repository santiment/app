import React from 'react'
import styles from './index.module.scss'

export const SHEETS_ANCHOR = 'san-sheets'
export const QUICK_START_ANCHOR = 'quick-start'
export const CABINET_ANCHOR = 'cabinet'
export const KEYSTACKHOLDERS_ANCHOR = 'stakeholders'
export const SOCIAL_ANCHOR = 'social'
export const VIDEOS_ANCHOR = 'webinars'
export const CHARTS_ANCHOR = 'charts'
export const SCREENERS_ANCHOR = 'screeners'

export const SCROLLABLE_ANCHORS = [
  SHEETS_ANCHOR,
  KEYSTACKHOLDERS_ANCHOR,
  VIDEOS_ANCHOR,
  CABINET_ANCHOR,
  SOCIAL_ANCHOR,
  CHARTS_ANCHOR,
  SCREENERS_ANCHOR
]

export const TOP_LINKS = [
  {
    title: 'Signals',
    link: KEYSTACKHOLDERS_ANCHOR,
    Icon: () => (
      <svg className={styles.topIcon} width='12' height='16'>
        <path
          fillRule='evenodd'
          d='M8.7 1.4a1 1 0 0 0-1-1.4H3.4c-.4 0-.9.3-1 .7L0 8.2a1 1 0 0 0 1 1.4h4.1l-1 5.8c-.2.5.6.8 1 .4L11.7 7c.5-.6 0-1.7-1-1.7H7.6l1.2-4ZM5.5 13.7 11 6.4H6L7.8 1H3.3l-.2.2L1 8.5v.1h5.4l-1 5Z'
        />
      </svg>
    )
  },
  {
    title: 'Social Trends',
    link: SOCIAL_ANCHOR,
    Icon: () => (
      <svg className={styles.topIcon} width='16' height='16'>
        <path d='M13 12.7c0-.2 0-.3.2-.4A6.6 6.6 0 0 0 15 7.7C15 4 11.9 1 8 1S1 4 1 7.7c0 3.8 3.2 7 7 6.8l.8-.2.5-.2h.5l.6.1a55.8 55.8 0 0 1 2 .7l.5-2.2Zm1 .2-.6 2.3c-.2.6-.7 1-1.3.8l-2.5-1-1.6.5c-4.4.3-8-3.5-8-7.8C0 3.5 3.6 0 8 0s8 3.5 8 7.7c0 2-.8 3.9-2 5.2ZM4 6c0-.3.2-.5.5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 6Zm.5 3.5a.5.5 0 1 0 0 1h7a.5.5 0 0 0 0-1h-7Z' />
      </svg>
    )
  },
  //   {
  //     title: 'Explore Screeners',
  //     link: SCREENERS_ANCHOR,
  //     Icon: () => <svg className={styles.topIcon} width="16" height="16">
  //       <path fillRule="evenodd" d="M5.9 1H1v4.9h4.9V1ZM1 0a1 1 0 0 0-1 1v4.9c0 .5.4 1 1 1h4.9c.5 0 1-.5 1-1V1c0-.6-.5-1-1-1H1Zm14 1h-4.9v4.9H15V1Zm-4.9-1a1 1 0 0 0-1 1v4.9c0 .5.5 1 1 1H15c.6 0 1-.5 1-1V1c0-.6-.4-1-1-1h-4.9ZM0 12.5c0-.3.2-.5.5-.5h15a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5ZM.5 9a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1H.5ZM0 15.5c0-.3.2-.5.5-.5h15a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5Z" />
  //     </svg>
  //   },
  {
    title: 'Charts Gallery',
    link: CHARTS_ANCHOR,
    Icon: () => (
      <svg className={styles.topIcon} width='16' height='17'>
        <path d='M1 1.5a.5.5 0 1 0-1 0v14.7c0 .4.3.8.8.8h14.7a.5.5 0 1 0 0-1H1V1.5Zm14.5.7a.5.5 0 0 0-1-.4l-2.8 7-5.4-2.3a.5.5 0 0 0-.6.2l-3 6.3a.5.5 0 0 0 .9.4l2.8-5.8 5.4 2.3a.5.5 0 0 0 .7-.3l3-7.4Z' />
      </svg>
    )
  },
  {
    title: 'Video insights',
    link: VIDEOS_ANCHOR,
    Icon: () => (
      <svg className={styles.topIcon} width='16' height='16'>
        <path
          fillRule='evenodd'
          d='M1 2.1C1 1.5 1.5 1 2.1 1h1.6v2.7H1V2.1Zm3.8 2.2v3.2h6.4V1H4.8v3.2Zm7.5.5v2.7H15V4.8h-2.7Zm2.7-1h-2.7V1h1.6c.6 0 1.1.5 1.1 1.1v1.6Zm1 .4v-2C16 1 15 0 13.9 0H2C1 0 0 1 0 2.1V14c0 1 1 2 2.1 2H14c1.1 0 2.1-1 2.1-2.1V4.3ZM1 4.8h2.7v2.7H1V4.8Zm14 3.7v2.7h-2.7V8.5H15Zm0 3.8h-2.7V15h1.6c.6 0 1.1-.5 1.1-1.1v-1.6Zm-3.8-3.8V15H4.8V8.5h6.4ZM1 12.3v1.6c0 .6.5 1.1 1.1 1.1h1.6v-2.7H1Zm2.7-1H1V8.4h2.7v2.7Z'
        />
      </svg>
    )
  },
  {
    title: 'Cabinet',
    link: CABINET_ANCHOR,
    Icon: () => (
      <svg className={styles.topIcon} width='18' height='15'>
        <path
          fillRule='evenodd'
          d='M13 0H5a2.2 2.2 0 0 0-2 1.2l-.1.3L0 7l-.1.2v5.1c0 1.2 1 2.2 2.2 2.2h13.6a2.2 2.2 0 0 0 2.2-2.2V7.1l-3-5.9A2.2 2.2 0 0 0 13 0ZM4 1.7v-.3A1.2 1.2 0 0 1 5 1h8a1.2 1.2 0 0 1 1.2.7l2.5 5.1h-4.3c-.2 0-.4.1-.5.3a3 3 0 0 1-1 1.7 3 3 0 0 1-1.9.5 3 3 0 0 1-1.8-.5C6.7 8.5 6.3 8 6 7.1a.5.5 0 0 0-.5-.3H1.3L4 1.7ZM1 7.8v4.6c0 .7.5 1.2 1.2 1.2h13.6a1.2 1.2 0 0 0 1.2-1.2V7.8h-4.3c-.3.8-.7 1.4-1.3 1.8a4 4 0 0 1-2.4.8c-1 0-1.7-.3-2.4-.8-.6-.4-1-1-1.3-1.8H1Z'
        />
      </svg>
    )
  }
]
