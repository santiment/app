export const dayAxesColor = '#e7eaf3'
export const nightAxesColor = '#222639'

export const dayHoverLineColor = '#d2d6e6'
export const nightHoverLineColor = '#2f354d'

export const dayTicksPaintConfig = {
  color: '#9faac4',
  font: '12px sans-serif'
}
export const nightTicksPaintConfig = {
  color: '#505573',
  font: '12px sans-serif'
}

export const dayBubblesPaintConfig = {
  font: '12px sans-serif',
  bgColor: '#e7eaf3',
  textColor: '#7a859e'
}
export const nightBubblesPaintConfig = {
  font: '12px sans-serif',
  bgColor: '#222639',
  textColor: '#8b93b6'
}

export const dayTooltipPaintConfig = {
  font: '12px sans-serif',
  headerFill: '#e7eaf3',
  borderColor: '#d2d6e6',
  contentFill: '#fff',
  headerColor: '#7a859e',
  valueColor: '#7a859e',
  labelColor: '#181b2b'
}
export const nightTooltipPaintConfig = {
  font: '12px sans-serif',
  headerFill: '#222639',
  borderColor: '#2f354d',
  contentFill: '#181b2b',
  headerColor: '#8b93b6',
  valueColor: '#8b93b6',
  labelColor: '#fff'
}

export const dayBrushPaintConfig = {
  bgColor: '#E7EAF3',
  fadeColor: '#D2D6E7',
  handleColor: '#7a859e'
}
export const nightBrushPaintConfig = {
  bgColor: '#222639',
  fadeColor: '#2f354d',
  handleColor: '#8b93b6'
}

export const paintConfigs = [
  {
    axesColor: dayAxesColor,
    hoverLineColor: dayHoverLineColor,
    ticksPaintConfig: dayTicksPaintConfig,
    bubblesPaintConfig: dayBubblesPaintConfig,
    tooltipPaintConfig: dayTooltipPaintConfig,
    brushPaintConfig: dayBrushPaintConfig
  },
  {
    axesColor: nightAxesColor,
    hoverLineColor: nightHoverLineColor,
    ticksPaintConfig: nightTicksPaintConfig,
    bubblesPaintConfig: nightBubblesPaintConfig,
    tooltipPaintConfig: nightTooltipPaintConfig,
    brushPaintConfig: nightBrushPaintConfig
  }
]
