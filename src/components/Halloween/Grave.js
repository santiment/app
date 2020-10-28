import React, { useState } from 'react'
import cx from 'classnames'
import { useTheme } from '../../stores/ui/theme'
import {
  isShowHalloween,
  addGrave,
  getCheckedGraves
} from '../../utils/halloween'
import HalloweenPopup from './Popup'
import styles from './index.module.scss'

const Grave = ({ knockNumber, setKnockNumber, slug }) => {
  const { isNightMode } = useTheme()
  const [checkedGraves, setCheckedGraves] = useState(new Set())
  const initialGraves = getCheckedGraves()

  function onGraveZoneClick () {
    const newNumber = knockNumber + 1
    setKnockNumber(newNumber)

    if (newNumber === 3) {
      const graves = addGrave(slug)
      setCheckedGraves(graves)
    }
  }

  if (!isNightMode && !isShowHalloween()) {
    return null
  }

  return (
    <>
      {checkedGraves.size > 0 && checkedGraves.size <= 3 && (
        <HalloweenPopup activeNumber={checkedGraves.size} />
      )}
      {!initialGraves.includes(slug) && initialGraves.length < 3 && (
        <div className={styles.grave} onClick={onGraveZoneClick}>
          <svg
            width='18'
            height='21'
            viewBox='0 0 18 21'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M15.3623 2.67413C13.6621 0.957189 11.4025 0.0136719 9 0.0136719C6.59746 0.0136719 4.3411 0.957189 2.64089 2.67413C0.940678 4.38787 0.00635583 6.66964 0.00635583 9.09583L0 20.0137H18V9.09583C18 6.66964 17.0625 4.39108 15.3623 2.67413Z'
              fill='#FF5B5B'
            />
            <mask
              id='mask0'
              mask-type='alpha'
              maskUnits='userSpaceOnUse'
              x='0'
              y='0'
              width='18'
              height='21'
            >
              <path
                d='M15.3623 2.67413C13.6621 0.957189 11.4025 0.0136719 9 0.0136719C6.59746 0.0136719 4.3411 0.957189 2.64089 2.67413C0.940678 4.38787 0.00635583 6.66964 0.00635583 9.09583L0 20.0137H18V9.09583C18 6.66964 17.0625 4.39108 15.3623 2.67413Z'
                fill='#FF5B5B'
              />
            </mask>
            <g mask='url(#mask0)'>
              <path
                d='M12.3242 9.87281H9.81356V15.7136H8.54237V9.87281H6V8.58911H8.54237V6.31055H9.81356V8.58911H12.3242V9.87281Z'
                fill='white'
              />
              <path
                d='M13 6.5L11 -0.5L17.5 3L18.5 8.5L15.5 10.5L13 6.5Z'
                className={cx(knockNumber === 1 && styles.gravePart)}
              />
              <path
                d='M9.2 7.37931L7 0.344828L10.85 -2L18 5.62069L16.9 10.8966L14.7 13.2414L10.85 15L9.2 7.37931Z'
                className={cx(knockNumber === 2 && styles.gravePart)}
              />
              <path
                d='M-0.810139 7.39345L-4 13.9423L1.42745 8.81575L3.66503 10.2381L4.20919 5.68308L10.9595 -0.440473L3.83862 -1.29117L-0.810139 7.39345Z'
                className={cx(knockNumber === 2 && styles.gravePart)}
              />
              <path
                d='M1.3605 3.99196L-1.37091e-06 6.95012L2.29218 4.62338L3.22386 5.2548L3.46891 3.20361L6.31882 0.423385L3.34 0.0675215L1.3605 3.99196Z'
                className={cx(knockNumber === 1 && styles.gravePart)}
              />
            </g>
          </svg>
        </div>
      )}
    </>
  )
}

export default Grave
