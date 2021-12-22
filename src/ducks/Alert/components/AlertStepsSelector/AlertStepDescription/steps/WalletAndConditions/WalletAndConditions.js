import React from 'react'
import cx from 'classnames'
import { useFormikContext } from 'formik'
import { ProjectIcon } from '../../../../../../../components/ProjectIcon/ProjectIcon'
import {
  clipText,
  getConditionsStr,
  parseOperation,
  splitStr
} from '../../../../../utils'
import { useAssets } from '../../../../../../../hooks/project'
import styles from './WalletAndConditions.module.scss'

const WalletAndConditions = ({ description, isSmall }) => {
  const {
    values: {
      settings: { target, selector, time_window, operation }
    }
  } = useFormikContext()
  const [projects, loading] = useAssets({
    shouldSkipLoggedInState: false
  })

  if (selector && target.address && selector.slug && !loading) {
    const project = projects.find(project => project.slug === selector.slug)
    const { selectedCount, selectedOperation } = parseOperation(operation)
    const conditionsStr = getConditionsStr({
      operation: selectedOperation,
      count: selectedCount,
      timeWindow: time_window
    })
    const { rest } = splitStr(conditionsStr)

    return (
      <div className={cx(styles.wrapper, isSmall && styles.small)}>
        <div className={styles.address}>{clipText(target.address, 24)}</div>
        <div className={styles.item}>
          <ProjectIcon
            size={16}
            slug={project.slug}
            logoUrl={project.logoUrl}
          />
          {project.ticker}
        </div>
        <div className={styles.condition}>
          <span className={styles.conditionType}>Balance</span>
          {rest}
        </div>
      </div>
    )
  }

  return description || ''
}

export default WalletAndConditions
