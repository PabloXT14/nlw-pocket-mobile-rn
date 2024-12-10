import { Image, Text, View } from 'react-native'
import { s } from './styles'

import logo from '@/assets/logo.png'

export function Welcome() {
  return (
    <View>
      <Image source={logo} alt="logo" style={s.logo} />

      <Text style={s.title}>Boas vindas ao Nearby!</Text>

      <Text style={s.subtitle}>
        Tenha cupons de vantagem para usar em seus estabelecimentos favoritos
      </Text>
    </View>
  )
}
