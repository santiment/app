import React from 'react'
import cx from 'classnames'
import Panel from '@santiment-network/ui/Panel/Panel'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import styles from './ChartMetricSelector.module.scss'

const categories = {
  Financial: [
    {
      label: 'Marketcap',
      desc: 'Data gathered from the biggest account of crypto influencers'
    }
  ],
  Social: [
    {
      label: 'Twitter',
      desc:
        'Data gathered from the biggest account of crypto influencers, traders and groups on Twitter'
    }
  ]
}

const ChartMetricSelector = () => {
  const [activeCategory, setCategory] = React.useState('Financial')
  const [activeMetric, setMetric] = React.useState(categories['Financial'][0])
  return (
    <Panel className={styles.wrapper}>
      <div className={cx(styles.column, styles.categories)}>
        {Object.keys(categories).map(category => (
          <div key={category} className={styles.category}>
            <Button
              onClick={() => setCategory(category)}
              variant='ghost'
              fluid
              className={styles.btn}
              isActive={category === activeCategory}
            >
              {category} <Icon type='arrow-right' />
            </Button>
          </div>
        ))}
      </div>
      <div className={cx(styles.column, styles.metrics)}>
        {categories[activeCategory].map(metric => (
          <Button
            key={metric.label}
            variant='ghost'
            fluid
            className={styles.btn}
            onMouseEnter={() => setMetric(metric)}
          >
            {metric.label} <Icon type='plus-round' />
          </Button>
        ))}
      </div>
      <div className={cx(styles.column, styles.explanation)}>
        <h3 className={styles.title}>{activeMetric.label}</h3>
        <p className={styles.text}>{activeMetric.desc}</p>
      </div>
    </Panel>
  )
}

export default ChartMetricSelector
