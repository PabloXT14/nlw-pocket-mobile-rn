export type PlaceDTO = {
  id: string
  categoryId: string
  name: string
  description: string
  coupons: number
  cover: string
  address: string
  phone: string
  latitude: number
  longitude: number
  rules: {
    id: string
    description: string
  }[]
}
