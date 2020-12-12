import React, { useCallback, useState } from 'react'
import { useFeaturedTemplates } from '../../ducks/Studio/Template/gql/hooks'
import { getTemplateIdFromURL } from '../../ducks/Studio/Template/utils'
import VideoModal from '../VideoModal/VideoModal'
import SvgBgImg from './../../assets/banner/cubes.svg'
import Icon from '@santiment-network/ui/Icon'
import styles from './SanbaseBanner.module.scss'

const PUBLIC_YOUTUBE_IDS = {
  195: '0IT44B7DCso',
  197: '4zoC64C0q-A',
  200: 'ORqsG6AvNg8',
  202: 'Ek_D_QVszKE',
  203: '8sNUkR68nGA'
}

const getYoutubeIdForLayout = ({ id, options }) => {
  const { youtube_id } = options || {}
  const videoId = youtube_id || PUBLIC_YOUTUBE_IDS[id]

  return videoId
}

const SanbaseBanner = () => {
  const templateId = getTemplateIdFromURL()
  const [templates, loading] = useFeaturedTemplates()

  const key = `CHART_LAYOUT_KEY_${templateId}`
  const [show, setShow] = useState(localStorage.getItem(key) !== 'true')

  const hideTooltip = useCallback(
    () => {
      setShow(false)
      localStorage.setItem(key, true)
    },
    [key]
  )

  if (loading || !templateId || !show) {
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

        <Icon
          type='close-medium'
          className={styles.close}
          onClick={hideTooltip}
        />
      </div>
    </div>
  )
}

export default SanbaseBanner
