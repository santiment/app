import React from 'react'
import PercentChanges from '../PercentChanges'
import styles from './PriceChangesWidget.module.scss'

const PriceChangesWidget = ({ changes7d, changes24h }) => (
  <section>
    <PercentChanges changes={changes24h} />
  </section>
)

export default PriceChangesWidget
