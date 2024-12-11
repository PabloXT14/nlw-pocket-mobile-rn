import { StyleSheet } from 'react-native'

import { colors, fontFamily } from '@/styles/theme'

export const s = StyleSheet.create({
  container: {
    height: 36,
    backgroundColor: colors.gray[100],
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
  },
  name: {
    fontSize: 14,
    color: colors.gray[500],
    fontFamily: fontFamily.regular,
  },
  containerSelected: {
    backgroundColor: colors.green.base,
    borderWidth: 0,
  },
  nameSelected: {
    color: colors.gray[100],
  },
})
