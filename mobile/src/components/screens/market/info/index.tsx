import { View, Text } from 'react-native'
import type { IconProps } from '@tabler/icons-react-native'

import { colors } from '@/styles/colors'
import { s } from './styles'

type InfoProps = {
  icon: React.ComponentType<IconProps>
  description: string
}

export function Info({ icon: Icon, description }: InfoProps) {
  return (
    <View style={s.container}>
      <Icon size={16} color={colors.gray[400]} />
      <Text style={s.description}>{description}</Text>
    </View>
  )
}
