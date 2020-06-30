export const TYPES = {
  VIDEO: {
    color: 'heliotrope',
    icon: 'triangle-right',
    previewInfo: ({ slides, minutes }) => `${minutes} min video`
  },
  INSIGHT: {
    color: 'dodger-blue',
    icon: 'article',
    previewInfo: ({ slides, minutes }) => `${minutes} min read`
  },
  SLIDES: {
    color: 'jungle-green',
    icon: 'arrows',
    previewInfo: ({ slides }) =>
      `${slides.length === 1 ? '1 slide' : `${slides.length} slides`}`
  },
  SIGNAL: {
    color: 'persimmon',
    icon: 'ring',
    previewInfo: () => `alert suggestion`
  }
}
