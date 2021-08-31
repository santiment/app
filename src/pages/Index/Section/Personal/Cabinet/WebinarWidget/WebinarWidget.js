import React from 'react'
import styles from './WebinarWidget.module.scss'

const WebinarWidget = () => (
  <div className={styles.container}>
    <div className={styles.videos} />
    <a
      href='https://www.youtube.com/c/SantimentNetwork'
      className={styles.more}
    >
      Watch more on <span className={styles.word}>Youtube</span>
      <svg width='16' height='12' className={styles.youtube}>
        <path d='M15.574 2.123a2 2 0 00-1.392-1.42C12.945.356 8 .356 8 .356s-4.946 0-6.182.332A2.041 2.041 0 00.425 2.123C.1 3.384.1 6 .1 6s0 2.629.325 3.877a2 2 0 001.393 1.42c1.249.346 6.182.346 6.182.346s4.945 0 6.182-.332a2 2 0 001.392-1.42c.325-1.262.325-3.878.325-3.878s.014-2.629-.325-3.89z' />
        <path d='M6.871 8.257L10.257 6 6.87 3.743v4.514z' fill='#fff' />
      </svg>
    </a>
  </div>
)

export default WebinarWidget
