import {
  METRIC_CONNECTOR,
  getMetricByKey,
  getProjectMetricByKey
} from '../metrics'
import { COMPARE_CONNECTOR } from '../url/utils'
import { capitalizeStr } from '../../../utils/utils'
import { PATHS } from '../../../paths'
import { getSEOLinkFromIdAndTitle } from '../../../components/Insight/utils'

const LAST_USED_TEMPLATE = 'LAST_USED_TEMPLATE'

export const getMetricKey = ({ key }) => key

export function prepareTemplateLink (template, asProject) {
  if (!template) {
    return ''
  }

  const { id, title } = template
  const templateId = asProject ? id + '@' + asProject : id

  return (
    `${PATHS.STUDIO}/${getSEOLinkFromIdAndTitle(templateId, title)}` +
    window.location.search
  )
}

export const getTemplateIdFromURL = () => {
  const href = window.location.pathname

  if (href.indexOf(PATHS.STUDIO) === -1) {
    return false
  }

  return +extractTemplateId(href)
}

const extractTemplateInfo = () => {
  const href = decodeURIComponent(window.location.pathname)
  const items = href.split('-')

  const idWithReplacement = items[items.length - 1]

  return idWithReplacement.split('@')
}

const extractTemplateId = () => {
  const [id] = extractTemplateInfo()
  return id
}

export const extractTemplateProject = () => {
  const [, project] = extractTemplateInfo()
  return project
}

export const getTemplateShareLink = template => {
  return window.location.origin + prepareTemplateLink(template)
}

export function parseTemplateMetrics (templateMetrics, project) {
  return templateMetrics
    .map(key => {
      if (key.includes(COMPARE_CONNECTOR)) {
        try {
          return getProjectMetricByKey(key, COMPARE_CONNECTOR)
        } catch (e) {
          return
        }
      }

      if (key.includes(METRIC_CONNECTOR)) {
        return getProjectMetricByKey(key)
      }

      return getMetricByKey(key)
    })
    .filter(Boolean)
}

export const buildTemplateMetrics = ({ metrics }) =>
  metrics && metrics.map(getMetricKey)

export function getAvailableTemplate (templates) {
  if (!availableDefaultTemplate()) {
    return undefined
  }

  const urlId = getTemplateIdFromURL()

  if (urlId) {
    return undefined
  }

  return templates[0]
}

const availableDefaultTemplate = () =>
  window.location.pathname.indexOf(PATHS.CHARTS) === -1

export function getLastTemplate () {
  if (!availableDefaultTemplate()) {
    return undefined
  }

  const savedTemplate = localStorage.getItem(LAST_USED_TEMPLATE)
  return savedTemplate ? JSON.parse(savedTemplate) : undefined
}

export function saveLastTemplate (template) {
  if (!template) return

  localStorage.setItem(LAST_USED_TEMPLATE, JSON.stringify(template))
}

const getTemplateMetrics = ({ metrics, project }) =>
  parseTemplateMetrics(metrics, project).map(({ label }) => label)

export const getTemplateInfo = template => {
  const assets = getTemplateAssets(template)
  const metrics = getTemplateMetrics(template)

  return {
    assets: [...new Set(assets)],
    metrics: [...new Set(metrics)]
  }
}

const getTemplateAssets = ({ metrics, project: { slug, name } }) => {
  const hasRootAsset = metrics.some(
    metric => metric.indexOf(COMPARE_CONNECTOR) === -1
  )

  const assets = hasRootAsset ? [name || slug] : []

  metrics.forEach(item => {
    if (item.indexOf(COMPARE_CONNECTOR) !== -1) {
      const [slug] = item.split(COMPARE_CONNECTOR)

      if (slug) {
        assets.push(slug)
      }
    }
  })

  return assets.map(slug => capitalizeStr(slug))
}
