import { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import { router, useLocalSearchParams, Redirect } from 'expo-router'

import { getMarketById } from '@/http/get-market-by-id'
import type { PlaceDTO } from '@/@types/place'

import { Loading } from '@/components/loading'
import { Cover } from '@/components/screens/market/cover'
import { Details } from '@/components/screens/market/details'
import { Coupon } from '@/components/screens/market/coupon'

export default function Market() {
  const params = useLocalSearchParams<{ id: string }>()

  const [market, setMarket] = useState<PlaceDTO | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  async function fetchMarket() {
    try {
      const market = await getMarketById({ id: params.id })

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

  if (isLoading) {
    return <Loading />
  }

  if (!market) {
    return <Redirect href="/home" />
  }

  return (
    <View style={{ flex: 1 }}>
      <Cover uri={market.cover} />

      <Details data={market} />

      <Coupon code="FM4345T6" />
    </View>
  )
}
