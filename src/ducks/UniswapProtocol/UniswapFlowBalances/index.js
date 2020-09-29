import React, { useState } from 'react'
import cx from 'classnames'
import Chord from '../../Studio/Tabs/Flow/Chord'
import {
  usePeriodMatrix,
  useDayMatrix,
  useAnimatedDayIndex
} from '../../Studio/Tabs/Flow/hooks'
import {
  getDateByDayIndex,
  sumCategory,
  format
} from '../../Studio/Tabs/Flow/utils'
import { toEndOfDay, ONE_DAY_IN_MS } from '../../../utils/dates'
import Skeleton from '../../../components/Skeleton/Skeleton'
import HelpPopup from '../../../components/HelpPopup/HelpPopup'
import { wrapper as wrapClassName } from '../UniswapPieChart/UniswapPieChart.module.scss'
import styles from './index.module.scss'

const LabelColor = {
  'DEX Traders': '#5275FF',
  'Decentralized Exchanges': '#785549',
  'Centralized Exchanges': '#68DBF4',
  DeFi: '#ffad4d',
  Whales: '#6edeaf',
  Others: '#D4E763'
}

const COLORS = Object.values(LabelColor)
const LABELS = Object.keys(LabelColor)

const FROM = new Date('2020-09-16T00:00:00.000Z')
const TO = toEndOfDay(new Date())
const DAYS_AMOUNT = Math.floor((TO - FROM) / ONE_DAY_IN_MS)
const DATES = [FROM, TO]

const Value = ({ flows }) => (
  <span className={styles.value}>{format('UNI', sumCategory(flows))}</span>
)

const Info = ({ matrix }) => (
  <div className={styles.info}>
    {LABELS.map((label, i) => (
      <div
        key={label}
        className={styles.label}
        style={{ '--color': COLORS[i] }}
      >
        {label}: <Value flows={matrix[i]} />
      </div>
    ))}
  </div>
)

const UniswapFlowBalances = () => {
  const [isHovered, setIsHovered] = useState()
  const { periodMatrix, isLoading } = usePeriodMatrix(
    'uniswap',
    DATES,
    DAYS_AMOUNT
  )
  const dayIndex = useAnimatedDayIndex(DAYS_AMOUNT, isHovered || isLoading)
  const { matrix } = useDayMatrix(periodMatrix, dayIndex)

  function onHover () {
    setIsHovered(true)
  }
  function onBlur () {
    setIsHovered(false)
  }

  return (
    <>
      <Skeleton repeat={1} className={styles.skeleton} show={isLoading} />
      {!isLoading && (
        <div className={wrapClassName}>
          <div
            className={styles.chord}
            onMouseEnter={onHover}
            onMouseLeave={onBlur}
          >
            <Chord
              ticker='UNI'
              matrix={matrix}
              width={365}
              height={365}
              colors={COLORS}
            />
            <div className={styles.bottom}>
              <span
                className={cx(styles.pause, isHovered && styles.pause_active)}
              >
                ||
              </span>
              {getDateByDayIndex(DATES, dayIndex)}
              <HelpPopup
                triggerClassName={styles.help}
                content='Hover over the diagram to pause animation'
              />
            </div>
          </div>
          <Info matrix={matrix} />
        </div>
      )}
    </>
  )
}

export default UniswapFlowBalances
