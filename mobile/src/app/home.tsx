import { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'

import type { CategoryDTO } from '@/@types/category'
import type { PlaceDTO } from '@/@types/place'
import { getCategories } from '@/http/get-categories'
import { getMarketsByCategoryId } from '@/http/get-markets-by-category-id'

import { Categories } from '@/components/categories'
import { Places } from '@/components/places'

export default function Home() {
  const [categories, setCategories] = useState<CategoryDTO[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState('')

  const [markets, setMarkets] = useState<PlaceDTO[]>([])

  async function fetchCategories() {
    try {
      const categories = await getCategories()
      setCategories(categories)
      setSelectedCategoryId(categories[0].id)
    } catch (error) {
      console.log(error)
      Alert.alert('Categorias', 'Não foi possível carregar as categorias.')
    }
  }

  async function fetchMarkets() {
    try {
      if (!selectedCategoryId) {
        return
      }

      const markets = await getMarketsByCategoryId({
        categoryId: selectedCategoryId,
      })

      setMarkets(markets)
    } catch (error) {
      console.log(error)
      Alert.alert('Locais', 'Não foi possível carregar os locais.')
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchMarkets()
  }, [selectedCategoryId])

  return (
    <View style={{ flex: 1, backgroundColor: '#cecece' }}>
      <Categories
        data={categories}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={setSelectedCategoryId}
      />

      <Places data={markets} />
    </View>
  )
}
