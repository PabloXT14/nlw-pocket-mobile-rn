import { Welcome } from '@/components/welcome'
import { Text, View } from 'react-native'

export default function Index() {
  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <Welcome />
    </View>
  )
}
