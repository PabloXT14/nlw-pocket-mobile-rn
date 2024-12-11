import { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import MapView from 'react-native-maps'

import type { CategoryDTO } from '@/@types/category'
import type { PlaceDTO } from '@/@types/place'
import { getCategories } from '@/http/get-categories'
import { getMarketsByCategoryId } from '@/http/get-markets-by-category-id'

import { Categories } from '@/components/categories'
import { Places } from '@/components/places'

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
}

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

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01, // aproximação/zoom
          longitudeDelta: 0.01,
        }}
      />

      <Places data={markets} />
    </View>
  )
}
