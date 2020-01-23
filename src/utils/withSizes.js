export const mapSizesToProps = ({ width, height }) => ({
  isDesktop: width > 768 && height > 500,
  isLaptop: width <= 1200 && width > 992,
  isTablet: width <= 992 && width > 768,
  isPhone: width <= 768,
  isSmallPhone: width < 480
})
