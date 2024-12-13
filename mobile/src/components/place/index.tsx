import {
  Image,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
} from 'react-native'
import { IconTicket } from '@tabler/icons-react-native'

import type { PlaceDTO } from '@/@types/place'

import { colors } from '@/styles/theme'
import { s } from './styles'

type PlaceProps = TouchableOpacityProps & {
  data: PlaceDTO
}

export function Place({ data, ...props }: PlaceProps) {
  return (
    <TouchableOpacity style={s.container} {...props} activeOpacity={0.8}>
      <Image style={s.image} source={{ uri: data.cover }} />

      <View style={s.content}>
        <Text style={s.name}>{data.name}</Text>

        <Text style={s.description} numberOfLines={2} ellipsizeMode="tail">
          {data.description}
        </Text>

        <View style={s.footer}>
          <IconTicket
            size={16}
            color={data.coupons > 0 ? colors.red.base : colors.gray[400]}
          />
          <Text style={s.tickets}>{data.coupons} cupons disponíveis</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
