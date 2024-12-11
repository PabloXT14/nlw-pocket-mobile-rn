import type { PlaceDTO } from '@/@types/place'
import { api } from '@/services/api'

type GetMarketsByCategoryIdRequest = {
  categoryId: string
}

export async function getMarketsByCategoryId({
  categoryId,
}: GetMarketsByCategoryIdRequest) {
  const { data } = await api.get(`/markets/category/${categoryId}`)
  return data as PlaceDTO[]
}
