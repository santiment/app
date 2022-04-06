import React, { useEffect } from 'react'
import { useFormikContext } from 'formik'
import { ProjectIcon } from '../../../../../../../components/ProjectIcon/ProjectIcon'
import AlertMessage from '../../../../../../../components/Alert/AlertMessage'
import { clipText, getConditionsStr, parseOperation, splitStr } from '../../../../../utils'
import { useAssets } from '../../../../../../../hooks/project'
import styles from './WalletAndConditions.module.scss'

const WalletAndConditions = ({ description, invalidStepsMemo, selected, isFinished }) => {
  const {
    values: {
      settings: { target, selector, time_window, operation },
    },
  } = useFormikContext()
  const [projects, loading] = useAssets({
    shouldSkipLoggedInState: false,
  })

  const isInvalid = invalidStepsMemo.has('wallet')

  useEffect(() => {
    if (selector && target.address && selector.slug && !loading && isInvalid) {
      invalidStepsMemo.delete('wallet')
    }
  }, [selector, target, loading, isInvalid])

  let children = ''

  if (selector && target.address && selector.slug && !loading) {
    const project = projects.find((project) => project.slug === selector.slug)
    const { selectedCount, selectedOperation } = parseOperation(operation)
    const conditionsStr = getConditionsStr({
      operation: selectedOperation,
      count: selectedCount,
      timeWindow: time_window,
    })
    const { rest } = splitStr(conditionsStr)

    children = (
      <div className={styles.wrapper}>
        <div className={styles.address}>{clipText(target.address, 24)}</div>
        <div className={styles.item}>
          <ProjectIcon size={16} slug={project.slug} logoUrl={project.logoUrl} />
          {project.ticker}
        </div>
        <div className={styles.condition}>
          <span className={styles.conditionType}>Balance</span>
          {rest}
        </div>
      </div>
    )
  } else {
    children = description || ''
  }

  return (
    <div className={styles.col}>
      {(selected || isFinished) && children}
      {isInvalid && <AlertMessage className={styles.error} error text='Wallet is required' />}
    </div>
  )
}

export default WalletAndConditions
