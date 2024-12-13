import { ImageBackground, View } from 'react-native'
import { IconArrowLeft } from '@tabler/icons-react-native'
import { router } from 'expo-router'

import { Button } from '@/components/button'

import { s } from './styles'

type CoverProps = {
  uri: string
}

export function Cover({ uri }: CoverProps) {
  return (
    <ImageBackground source={{ uri }} style={s.container}>
      <View style={s.header}>
        <Button style={{ width: 40, height: 40 }} onPress={() => router.back()}>
          <Button.Icon icon={IconArrowLeft} />
        </Button>
      </View>
    </ImageBackground>
  )
}
