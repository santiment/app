import React from 'react'
import { Button, Icon } from '@santiment-network/ui'
import { Link } from 'react-router-dom'
import styles from './Insights.module.scss'

const InsightAddBtn = ({ searchParams = '', ...props }) => (
  <Button
    as={Link}
    className={styles.btn}
    accent='green'
    to={`/insights/new?${searchParams}`}
    {...props}
  >
    <Icon className={styles.icon} type='plus-round' />
    Add insight
  </Button>
)

export default InsightAddBtn
