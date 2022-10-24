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

const AverageSocialVolume = ({ hasPremium, isDesktop, ...props }) => {
  const [period, setPeriod] = useState(PERIODS[0])
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)

  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.header, 'row v-center justify mrg-l mrg--b')}>
        <div className='row v-center'>
          <h3 className={cx(isDesktop ? 'body-3 mrg-s' : 'body-1 mrg-l', 'mrg--r')}>Average</h3>
          <HelpPopup>
            <h4 className={stylesTooltip.title}>Average Social Volume</h4>
            The average number of daily mentions in the past {period.text}
          </HelpPopup>
        </div>
        <Tooltip
          on='click'
          shown={isTooltipOpen}
          trigger={
            <Button
              variant='flat'
              border
              className={cx(styles.trigger, !isDesktop && 'body-3 row hv-center')}
              onClick={() => setIsTooltipOpen(true)}
            >
              {period.label}
            </Button>
          }
          position='bottom'
          align='end'
        >
          <Panel className={styles.panel}>
            {PERIODS.map((item) => (
              <span
                className={cx(styles.period, item.label === period.label && styles.selected)}
                key={item.label}
                onClick={() => {
                  setPeriod(item)
                  setIsTooltipOpen(false)
                }}
              >
                {item.label}
              </span>
            ))}
          </Panel>
        </Tooltip>
      </div>
      {hasPremium && <Content {...props} range={period.query} />}
      {hasPremium === false && <PaywallBanner isMobile={!isDesktop} />}
    </div>
  )
}

export default AverageSocialVolume
