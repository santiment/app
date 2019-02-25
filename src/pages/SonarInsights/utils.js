export const sortInsightsByDateDescending = (
  { createdAt: aCreatedAt },
  { createdAt: bCreatedAt }
) => (aCreatedAt < bCreatedAt ? 1 : -1)

export const filterInsightsNoDrafts = ({ readyState }) => readyState !== 'draft'
export const filterInsightsOnlyDrafts = ({ readyState }) =>
  readyState === 'draft'
