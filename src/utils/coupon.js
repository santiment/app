const DEVCON_COUPON = 'DEVCON_COUPON'

export const setCoupon = (coupon = '') => {
  localStorage.setItem(DEVCON_COUPON, coupon)
}

export const getCoupon = () => localStorage.getItem(DEVCON_COUPON)
