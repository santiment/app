export const mapSizesToProps = ({ width }) => ({
  isDesktop: width > 768,
  isTablet: width <= 992 && width > 768,
  isPhone: width <= 768
})
