import React from 'react'
import Label from '@santiment-network/ui/Label'
import styles from './TransactionTableLabels.module.scss'

const LabelWrapper = ({ name }) => (
  <Label className={styles.label}>{name}</Label>
)

const LabelRenderer = ({ name, metadata }) => {
  const decoded = JSON.parse(metadata)
  const { owner } = decoded
  switch (name) {
    case 'decentralized_exchange': {
      return <LabelWrapper name={owner} />
    }
    case 'centralized_exchange': {
      return <LabelWrapper name={owner} />
    }
    case 'defi': {
      return <LabelWrapper name={owner} />
    }
    default: {
      return null
    }
  }
}

const TransactionTableLabels = ({ labels }) => {
  console.log('labels', labels)

  return labels.map((item, index) => <LabelRenderer key={index} {...item} />)
}

export default TransactionTableLabels
