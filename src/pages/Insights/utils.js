export const sortInsightsByDateDescending = (
  { createdAt: aCreatedAt },
  { createdAt: bCreatedAt }
) => (aCreatedAt < bCreatedAt ? 1 : -1)

export const sortInsightsByUpdateDateDescending = (
  { updatedAt: aCreatedAt },
  { updatedAt: bCreatedAt }
) => (aCreatedAt < bCreatedAt ? 1 : -1)

export const filterInsightsNoDrafts = ({ readyState }) => readyState !== 'draft'
export const filterInsightsOnlyDrafts = ({ readyState }) =>
  readyState === 'draft'

export const getInsightContent = htmlContent => {
  let tempHTMLElement = document.createElement('div')
  tempHTMLElement.innerHTML = htmlContent
  const content = tempHTMLElement.textContent
  tempHTMLElement = null
  return content
}
