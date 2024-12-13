import { View, Text } from 'react-native'
import { IconPhone, IconMapPin, IconTicket } from '@tabler/icons-react-native'

import type { PlaceDTO } from '@/@types/place'
import { Info } from '../info'

import { colors } from '@/styles/colors'
import { s } from './styles'

type DetailsProps = {
  data: Pick<
    PlaceDTO,
    'name' | 'description' | 'address' | 'phone' | 'coupons' | 'rules'
  >
}

export function Details({ data }: DetailsProps) {
  return (
    <View style={s.container}>
      <Text style={s.name}>{data.name}</Text>

      <Text style={s.description}>{data.description}</Text>

      <View style={[s.couponsCard, data.coupons <= 0 && s.couponCardEmpty]}>
        <IconTicket
          size={24}
          color={data.coupons <= 0 ? colors.gray[400] : colors.red.base}
        />

        <Text style={s.couponsTitle}>
          <Text style={s.couponsAmount}>{data.coupons}</Text> cupons disponíveis
        </Text>
      </View>

      <View style={s.group}>
        <Text style={s.title}>Informações</Text>

        <Info icon={IconMapPin} description={data.address} />
        <Info icon={IconPhone} description={data.phone} />
      </View>

      <View style={s.group}>
        <Text style={s.title}>Regulamento</Text>

        {data.rules.map((rule, index) => (
          <Text key={rule.id} style={s.rule}>
            {`\u2022 ${rule.description}`}
          </Text>
        ))}
      </View>
    </View>
  )
}
