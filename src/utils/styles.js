export function getShadowVars (isNightMode) {
  return {
    '--shadowFrom': isNightMode
      ? 'rgba(24, 27, 43, 0)'
      : 'rgba(255, 255, 255, 0)',
    '--shadowTo': isNightMode
      ? 'rgba(24, 27, 43, 0.9)'
      : 'rgba(255, 255, 255, 0.9)'
  }
}
