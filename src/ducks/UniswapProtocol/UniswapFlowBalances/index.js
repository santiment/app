import React, { useState } from 'react'
import AnimatedChord from '../../Studio/Tabs/Flow/AnimatedChord'
import { usePeriodMatrix } from '../../Studio/Tabs/Flow/hooks'
import { getDateByDayIndex } from '../../Studio/Tabs/Flow/utils'
import Skeleton from '../../../components/Skeleton/Skeleton'
import { toEndOfDay, ONE_DAY_IN_MS } from '../../../utils/dates'
import { wrapper as wrapClassName } from '../UniswapPieChart/UniswapPieChart.module.scss'
import styles from './index.module.scss'

const FROM = new Date('2020-09-16T00:00:00.000Z')
const TO = toEndOfDay(new Date())
const DAYS_AMOUNT = Math.floor((TO - FROM) / ONE_DAY_IN_MS)
const DATES = [FROM, TO]

const WhoClaimedChart = () => {
  const [dayIndex, setDayIndex] = useState(0)
  const { periodMatrix, isLoading } = usePeriodMatrix(
    'uniswap',
    DATES,
    DAYS_AMOUNT
  )

  return (
    <>
      <Skeleton repeat={1} className={styles.skeleton} show={isLoading} />
      {!isLoading && (
        <div className={wrapClassName}>
          <div className={styles.left}>
            <AnimatedChord
              periodMatrix={periodMatrix}
              dayIndex={dayIndex}
              daysAmount={DAYS_AMOUNT}
              width={365}
              height={365}
              setDayIndex={setDayIndex}
            />
            {getDateByDayIndex(DATES, dayIndex)}
          </div>
        </div>
      )}
    </>
  )
}

export default WhoClaimedChart
