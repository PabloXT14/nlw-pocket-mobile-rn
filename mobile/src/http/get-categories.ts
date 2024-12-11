import { api } from '@/services/api'
import type { CategoryDTO } from '@/@types/category'

export async function getCategories() {
  const { data } = await api.get('/categories')
  return data as CategoryDTO[]
}
