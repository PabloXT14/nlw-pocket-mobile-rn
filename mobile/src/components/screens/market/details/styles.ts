import { StyleSheet } from 'react-native'

import { colors, fontFamily } from '@/styles/theme'

export const s = StyleSheet.create({
  container: {
    padding: 32,
    paddingBottom: 0,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: colors.gray[100],
  },
  name: {
    fontSize: 20,
    fontFamily: fontFamily.bold,
    color: colors.gray[600],
  },
  description: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
    marginVertical: 12,
    lineHeight: 22,
  },
  couponsCard: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginBottom: 32,
    borderRadius: 8,
    backgroundColor: colors.red.light,
  },
  couponCardEmpty: {
    backgroundColor: colors.gray[200],
  },
  couponsAmount: {
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
    color: colors.gray[600],
  },
  couponsTitle: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray[600],
  },
  group: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    paddingBottom: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.gray[500],
    marginBottom: 12,
  },
  rule: {
    color: colors.gray[500],
    fontSize: 14,
    fontFamily: fontFamily.regular,
    lineHeight: 22.4,
  },
})
