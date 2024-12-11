import { useEffect, useState } from 'react'
import { Alert, Text, View } from 'react-native'

import { getCategories } from '@/http/get-categories'

export default function Home() {
  const [categories, setCategories] = useState([])

  async function fetchCategories() {
    try {
      const categories = await getCategories()
      console.log('CATEGORIAS: ', categories)
      setCategories(categories)
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
      <Text>Home</Text>
    </View>
  )
}
