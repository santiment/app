import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { TEMPLATES } from './utils'
import {
  useFeaturedTemplates,
  useUserTemplates
} from '../../../ducks/Studio/Template/gql/hooks'
import PageLoader from '../../../components/Loader/PageLoader'
import NewTemplateCard from '../../../components/TemplatesGrid/NewTemplateCard'
import FeatureAnonBanner from '../../../components/Banner/FeatureAnonBanner'
import { checkIsProState } from '../../../utils/account'
import PublicTemplateCard from './PublicTemplateCard'
import styles from './PublicTemplates.module.scss'

const PublicTemplates = ({ isProSanbase, isFeatured, userId }) => {
  if (!(isFeatured || userId)) {
    return (
      <FeatureAnonBanner title='Get ability to create your own Chart Layout when you login' />
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

const mapStateToProps = state => checkIsProState(state)

export default connect(mapStateToProps)(PublicTemplates)
