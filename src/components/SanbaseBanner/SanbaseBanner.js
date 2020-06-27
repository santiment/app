import React from 'react'
import { useFeaturedTemplates } from '../../ducks/Studio/Template/gql/hooks'
import { getTemplateIdFromURL } from '../../ducks/Studio/Template/utils'
import { getYoutubeIdForLayout } from '../../pages/Marketing/PublicTemplates/PublicTemplateCard'
import VideoModal from '../VideoModal/VideoModal'
import SvgBgImg from './../../assets/banner/cubes.svg'
import styles from './SanbaseBanner.module.scss'

const SanbaseBanner = () => {
  const templateId = getTemplateIdFromURL()
  const [templates, loading] = useFeaturedTemplates()

  if (loading || !templateId) {
    return null
  }

  const template = templates.find(({ id }) => +id === templateId)

  if (!template) {
    return null
  }

  const videoId = getYoutubeIdForLayout(template)

  if (!videoId) {
    return null
  }

  const { title, description } = template

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: 'url("' + SvgBgImg + '")'
      }}
    >
      <VideoModal videoId={videoId} classes={styles} />
      <div className={styles.info}>
        <div>
          <div className={styles.title}>{title}</div>

          <div className={styles.explanation}>{description}</div>
        </div>
      </div>
    </div>
  )
}

export default SanbaseBanner
