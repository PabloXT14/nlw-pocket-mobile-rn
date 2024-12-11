import { FlatList, View } from 'react-native'
import { s } from './styles'
import { Category } from '../category'
import type { CategoryDTO } from '@/@types/category'

type CategoriesProps = {
  data: CategoryDTO[]
  selectedCategoryId: string
  onCategorySelect: (categoryId: string) => void
}

export function Categories({
  data,
  selectedCategoryId,
  onCategorySelect,
}: CategoriesProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Category
          iconId={item.id}
          name={item.name}
          isSelected={item.id === selectedCategoryId}
          onPress={() => onCategorySelect(item.id)}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={s.container}
      contentContainerStyle={s.content}
    />
  )
}
