import React from 'react'
import EmptySection from '../../../components/EmptySection/EmptySection'
import styles from './NoInsights.module.scss'

const NoInsights = ({ target }) => (
  <EmptySection>
    <div className={styles.description}>
      <div>There’s no related insights</div>
      <div>connected with this {target}</div>
    </div>
  </EmptySection>
)

export default NoInsights
