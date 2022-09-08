import React from 'react'
import EmptySection from './EmptySection'
import styles from './NoEntries.module.scss'

const NoEntries = ({ title, desc, children, maxWidth }) => (
  <EmptySection>
    <div className={styles.description} style={{ maxWidth }}>
      {title && <div className='body-2 txt-b mrg--b mrg-xs'>{title}</div>}
      {desc && <div className='body-2 mrg--b mrg-l'>{desc}</div>}
      {children}
    </div>
  </EmptySection>
)

export default NoEntries
