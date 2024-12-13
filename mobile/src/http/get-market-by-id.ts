import { api } from '@/services/api'

import type { PlaceDTO } from '@/@types/place'

type GetMarketByIdRequest = {
  id: string
}

export async function getMarketById({ id }: GetMarketByIdRequest) {
  const { data } = await api.get(`/markets/${id}`)
  return data as PlaceDTO
}
