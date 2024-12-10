import { View, ActivityIndicator } from 'react-native'

import { colors } from '@/styles/theme'
import { s } from './styles'

export function Loading() {
  return <ActivityIndicator color={colors.green.base} style={s.container} />
}
