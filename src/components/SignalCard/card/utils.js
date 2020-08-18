export const isStrictTrendingWords = ({ operation, type }) =>
  type === 'trending_words' && operation && operation.trigger_time

export const canOpenTrigger = ({ type, target }) =>
  type === 'trending_words' ? target !== 'default' : true
