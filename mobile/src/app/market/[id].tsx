import { useEffect, useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'

import { getMarketById } from '@/http/get-market-by-id'
import type { PlaceDTO } from '@/@types/place'

import { Loading } from '@/components/loading'

export default function Market() {
  const params = useLocalSearchParams<{ id: string }>()

  const [market, setMarket] = useState<PlaceDTO | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  async function fetchMarket() {
    try {
      const market = await getMarketById({ id: params.id })

      console.log('MARKET: ', market)

      setMarket(market)
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Nao foi possível carregar os dados do local.', [
        { text: 'OK', onPress: () => router.back() },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMarket()
  }, [params.id])

  if (!market || isLoading) {
    return <Loading />
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{market.name}</Text>
    </View>
  )
}
