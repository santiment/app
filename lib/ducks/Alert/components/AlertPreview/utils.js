export const isUnsupportedTrigger = ({
  settings
}) => settings && settings.type === 'eth_wallet';