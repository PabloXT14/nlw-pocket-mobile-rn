import { api } from '@/services/api'

type GetCouponRequest = {
  marketId: string
}

type GetCouponResponse = {
  coupon: string
}

export async function getCoupon({ marketId }: GetCouponRequest) {
  const { data } = await api.patch(`/coupons/${marketId}`)
  return data as GetCouponResponse
}
