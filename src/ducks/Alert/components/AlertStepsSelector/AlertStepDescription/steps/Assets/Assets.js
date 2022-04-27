import React, { useEffect } from 'react'
import { useFormikContext } from 'formik'
import AlertMessage from '../../../../../../../components/Alert/AlertMessage'
import { ProjectIcon } from '../../../../../../../components/ProjectIcon/ProjectIcon'
import { useAssets } from '../../../../../../../hooks/project'
import styles from './Assets.module.scss'

const Assets = ({ description, invalidStepsMemo, selected, isFinished }) => {
  const [projects, loading] = useAssets({
    shouldSkipLoggedInState: false,
  })
  const { values } = useFormikContext()
  const {
    settings: {
      target: { slug },
    },
  } = values

  const isInvalid = invalidStepsMemo.has('asset')

  useEffect(() => {
    if (slug && slug.length !== 0 && isInvalid) {
      invalidStepsMemo.delete('asset')
    }
  }, [slug, isInvalid])

  let children

  if (!slug || slug.length === 0 || loading) {
    children = description || ''
  }

  if (typeof slug !== 'string' && slug.length !== 0 && !loading) {
    const shouldRenderTicker = slug.length > 1
    const assets =
      typeof slug === 'string'
        ? projects.find((project) => project.slug === slug)
        : slug.map((item) => projects.find((project) => project.slug === item))

    children = (
      <div className={styles.wrapper}>
        {assets.slice(0, 3).map((asset) => (
          <div key={asset.id} className={styles.item}>
            <ProjectIcon size={16} slug={asset.slug} logoUrl={asset.logoUrl} />
            <div className={styles.title}>{shouldRenderTicker ? asset.ticker : asset.name}</div>
          </div>
        ))}
        {assets.length > 3 && (
          <div className={styles.item}>
            <div className={styles.title}>+ {assets.length - 3}</div>
          </div>
        )}
      </div>
    )
  } else if (slug.length !== 0 && !loading) {
    const assets =
      typeof slug === 'string'
        ? projects.find((project) => project.slug === slug)
        : slug.map((item) => projects.find((project) => project.slug === item))

    children = (
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <ProjectIcon size={16} slug={assets.slug} logoUrl={assets.logoUrl} />
          <div className={styles.title}>{assets.name}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.col}>
      {(selected || isFinished) && children}
      {isInvalid && <AlertMessage className={styles.error} error text='Asset is required' />}
    </div>
  )
}

export default Assets
