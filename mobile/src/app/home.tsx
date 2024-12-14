import { useCallback, useEffect, useRef, useState } from 'react'
import { Alert, Text, View } from 'react-native'
import MapView, { Callout, Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { router, useFocusEffect } from 'expo-router'

import type { CategoryDTO } from '@/@types/category'
import type { PlaceDTO } from '@/@types/place'
import { getCategories } from '@/http/get-categories'
import { getMarketsByCategoryId } from '@/http/get-markets-by-category-id'

import { Categories } from '@/components/categories'
import { Places } from '@/components/places'
import { colors, fontFamily } from '@/styles/theme'

import locationIcon from '@/assets/location.png'
import pinIcon from '@/assets/pin.png'

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
}

export default function Home() {
  const [categories, setCategories] = useState<CategoryDTO[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState('')

  const [markets, setMarkets] = useState<PlaceDTO[]>([])

  const mapViewRef = useRef<MapView>(null)

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

  async function getCurrentLocation() {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync()

      if (!granted) {
        return
      }

      const location = await Location.getCurrentPositionAsync()

      console.log('LOCATION: ', location)
    } catch (error) {
      console.log(error)
      Alert.alert(
        'Localização',
        'Não foi possível carregar a sua localização atual.'
      )
    }
  }

  function setMapInitialPosition() {
    if (!mapViewRef.current) return

    mapViewRef.current.animateCamera({
      center: {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      },
      zoom: 17,
    })
  }

  useEffect(() => {
    // getCurrentLocation()
    fetchCategories()

    setMapInitialPosition()
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchMarkets()
    }, [selectedCategoryId])
  )

  return (
    <View style={{ flex: 1, backgroundColor: '#cecece' }}>
      <Categories
        data={categories}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={setSelectedCategoryId}
      />

      <MapView
        ref={mapViewRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01, // aproximação/zoom
          longitudeDelta: 0.01,
        }}
      >
        {/* currentLocation */}
        <Marker
          identifier="current"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={locationIcon}
        />

        {markets.map(market => (
          <Marker
            key={market.id}
            identifier={market.id}
            coordinate={{
              latitude: market.latitude,
              longitude: market.longitude,
            }}
            image={pinIcon}
          >
            <Callout onPress={() => router.navigate(`/market/${market.id}`)}>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: fontFamily.medium,
                    color: colors.gray[600],
                  }}
                >
                  {market.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: fontFamily.regular,
                    color: colors.gray[600],
                  }}
                >
                  {market.address}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <Places data={markets} />
    </View>
  )
}
