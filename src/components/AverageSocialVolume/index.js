import React, { useState } from 'react'
import cx from 'classnames'
import Tooltip from '@santiment-network/ui/Tooltip'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel'
import HelpPopup from '../HelpPopup/HelpPopup'
import Content from './Content'
import PaywallBanner from './PaywallBanner'
import { PERIODS } from './utils'
import styles from './index.module.scss'
import stylesTooltip from '../../components/HelpPopup/HelpPopup.module.scss'

const AverageSocialVolume = ({ hasPremium, ...props }) => {
  const [period, setPeriod] = useState(PERIODS[0])
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3 className={styles.title}>Average</h3>
          <HelpPopup>
            <h4 className={stylesTooltip.title}>Average Social Volume</h4>
            The average number of daily mentions in the past {period.text}
          </HelpPopup>
        </div>
        <Tooltip
          on='click'
          trigger={
            <Button variant='flat' border className={styles.trigger}>
              {period.label}
            </Button>
          }
          position='bottom'
          align='end'
        >
          <Panel className={styles.panel}>
            {PERIODS.map(item => (
              <span
                className={cx(
                  styles.period,
                  item.label === period.label && styles.selected
                )}
                key={item.label}
                onClick={() => setPeriod(item)}
              >
                {item.label}
              </span>
            ))}
          </Panel>
        </Tooltip>
      </div>
      {hasPremium && <Content {...props} range={period.query} />}
      {hasPremium === false && <PaywallBanner />}
    </div>
  )
}

export default AverageSocialVolume
