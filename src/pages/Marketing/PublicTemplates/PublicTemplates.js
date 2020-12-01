import React, { useRef } from 'react'
import { TEMPLATES } from './utils'
import {
  useFeaturedTemplates,
  useUserTemplates
} from '../../../ducks/Studio/Template/gql/hooks'
import PageLoader from '../../../components/Loader/PageLoader'
import NewTemplateCard from '../../../components/TemplatesGrid/NewTemplateCard'
import InlineBanner from '../../../components/banners/feature/InlineBanner'
import PublicTemplateCard from './PublicTemplateCard'
import styles from './PublicTemplates.module.scss'

const PublicTemplates = ({ isFeatured, userId }) => {
  if (!(isFeatured || userId)) {
    return (
      <InlineBanner
        title='Log in to make your own Chart Layouts'
        description='Create, load and save your personal chart views'
      />
    )
  }
  const videoRef = useRef(null)

  const [templates, loading] = !isFeatured
    ? useUserTemplates(userId)
    : useFeaturedTemplates()

  if (loading) {
    return <PageLoader />
  }

  const defaultTemplates = userId ? [] : TEMPLATES
  const usingTemplates = templates.length > 0 ? templates : defaultTemplates

  return (
    <div className={styles.container} ref={videoRef}>
      {usingTemplates.map((template, index) => {
        return <PublicTemplateCard template={template} key={index} />
      })}

      <NewTemplateCard />
    </div>
  )
}

export default PublicTemplates
