import { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'

import { getCategories } from '@/http/get-categories'
import { Categories } from '@/components/categories'
import type { CategoryDTO } from '@/@types/category'

export default function Home() {
  const [categories, setCategories] = useState<CategoryDTO[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState('')

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

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Categories
        data={categories}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={setSelectedCategoryId}
      />
    </View>
  )
}
