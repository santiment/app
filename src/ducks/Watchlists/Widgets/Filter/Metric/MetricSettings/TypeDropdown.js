import React, { Fragment } from 'react'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel'
import Tooltip from '@santiment-network/ui/Tooltip'
import { Filter } from '../../dataHub/types'
import { ProLabel } from '../../../../../../components/ProLabel'
import ProPopupWrapper from '../../../../../../components/ProPopup/Wrapper'
import styles from './TypeDropdown.module.scss'

const METRIC_SEPARATOR = Filter.percent_up.key

const TypeDropdown = ({ isPro, type, onChange, showPercentFilters }) => (
  <Tooltip
    on='click'
    trigger={
      <Button variant='flat' border className={styles.trigger}>
        <img src={Filter[type].icon} alt='filter type' className={styles.img} />
      </Button>
    }
    position='bottom'
    align='start'
    className={styles.tooltip}
  >
    <Panel className={styles.panel}>
      {Object.values(Filter).map(({ icon, label, key, showTimeRange }) => {
        const isDisabled = Filter[key].isPro && !isPro
        const badge = Filter[key].badge
        let isShow = true

        if (!showPercentFilters && showTimeRange) {
          isShow = false
        }

        return isShow ? (
          <Fragment key={key}>
            {key === METRIC_SEPARATOR && (
              <div className={styles.separator}>
                <span className={styles.label}>Percentage change</span>
                <ProPopupWrapper type='screener'>
                  {!isPro && <ProLabel />}
                </ProPopupWrapper>
              </div>
            )}
            {isDisabled && !isPro ? (
              <ProPopupWrapper type='screener'>
                <Button variant='ghost' fluid className={styles.button}>
                  <img src={icon} alt='filter type' className={styles.img} />
                  {label}
                  {badge && ` ${badge}`}
                </Button>
              </ProPopupWrapper>
            ) : (
              <Button
                variant='ghost'
                fluid
                className={styles.button}
                onClick={() => onChange(key)}
              >
                <img src={icon} alt='filter type' className={styles.img} />
                {label}
                {badge && ` ${badge}`}
              </Button>
            )}
          </Fragment>
        ) : null
      })}
    </Panel>
  </Tooltip>
)

export default TypeDropdown
