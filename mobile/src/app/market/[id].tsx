import { useEffect, useRef, useState } from 'react'
import { Alert, Modal, View, StatusBar, ScrollView } from 'react-native'
import { router, useLocalSearchParams, Redirect } from 'expo-router'
import { useCameraPermissions, CameraView } from 'expo-camera'
import { IconScan } from '@tabler/icons-react-native'

import { getMarketById } from '@/http/get-market-by-id'
import type { PlaceDTO } from '@/@types/place'

import { getCoupon } from '@/http/get-coupon'

import { Loading } from '@/components/loading'
import { Cover } from '@/components/screens/market/cover'
import { Details } from '@/components/screens/market/details'
import { Coupon } from '@/components/screens/market/coupon'
import { Button } from '@/components/button'

export default function Market() {
  const params = useLocalSearchParams<{ id: string }>()
  const [_, requestPermission] = useCameraPermissions()
  const qrLock = useRef(false)

  const [market, setMarket] = useState<PlaceDTO | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [coupon, setCoupon] = useState<string | null>(null)
  const [isFetchingCoupon, setIsFetchingCoupon] = useState(false)
  const [isCameraModalVisible, setIsCameraModalVisible] = useState(false)

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

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission()

      if (!granted) {
        return Alert.alert(
          'Câmera',
          'Você precisa habilitar o uso da câmera para ler o QR Code.'
        )
      }

      qrLock.current = false
      setIsCameraModalVisible(true)
    } catch (error) {
      console.log(error)
      Alert.alert('Câmera', 'Não foi possível utilizar a câmera.')
    }
  }

  async function fetchCoupon(marketId: string) {
    try {
      setIsFetchingCoupon(true)

      const data = await getCoupon({ marketId })

      Alert.alert('Cupom', data.coupon)

      setCoupon(data.coupon)
    } catch (error) {
      console.log(error)
      Alert.alert('Cupom', 'Não foi possível utilizar o cupom.')
    } finally {
      setIsFetchingCoupon(false)
    }
  }

  function handleUseCoupon(marketId: string) {
    setIsCameraModalVisible(false)

    Alert.alert(
      'Cupom',
      'Não é possível reutilizar um cupom já resgatado. Deseja realmente resgatar o cupom?',
      [
        { style: 'cancel', text: 'Não' },
        {
          text: 'Sim',
          onPress: () => fetchCoupon(marketId),
        },
      ]
    )
  }

  useEffect(() => {
    fetchMarket()
  }, [params.id, coupon])

  if (isLoading) {
    return <Loading />
  }

  if (!market) {
    return <Redirect href="/home" />
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" hidden={isCameraModalVisible} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={market.cover} />

        <Details data={market} />

        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View style={{ padding: 32 }}>
        {coupon || market.coupons <= 0 ? (
          <Button onPress={() => router.back()}>
            <Button.Title>Voltar</Button.Title>
          </Button>
        ) : (
          <Button onPress={handleOpenCamera}>
            <Button.Icon icon={IconScan} />
            <Button.Title>Ler QR Code</Button.Title>
          </Button>
        )}
      </View>

      {/* CAMERA MODAL */}
      <Modal style={{ flex: 1 }} visible={isCameraModalVisible}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true
              setTimeout(() => handleUseCoupon(data), 500)
            }
          }}
        />

        <View style={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => setIsCameraModalVisible(false)}
            isLoading={isFetchingCoupon}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}
