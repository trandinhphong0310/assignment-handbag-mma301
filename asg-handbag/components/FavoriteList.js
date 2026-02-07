import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { getAllHandbag } from '../apis/api'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import styles from '../assets/css/favorite.styles'
import { useNavigation } from '@react-navigation/native'

export default function FavoriteList() {

  const [favoriteItem, setFavoriteItem] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    loadFavoriteItems()
  }, [])

  const loadFavoriteItems = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites')
      const savedUnfavorites = await AsyncStorage.getItem('unfavorites')

      const favorites = savedFavorites ? JSON.parse(savedFavorites) : []
      const unfavorites = savedUnfavorites ? JSON.parse(savedUnfavorites) : []

      const allHandbag = await getAllHandbag()

      const favoritesProduct = allHandbag.filter(item => {
        if (item.isFavorite) {
          return !unfavorites.includes(item.id)
        } else {
          return favorites.includes(item.id)
        }
      })
      setFavoriteItem(favoritesProduct)
    } catch (err) {
      console.log(err)
    }
  }

  const removeFavoriteItems = async (item) => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites')
      const savedUnfavorites = await AsyncStorage.getItem('unfavorites')

      let favorites = savedFavorites ? JSON.parse(savedFavorites) : []
      let unfavorites = savedUnfavorites ? JSON.parse(savedUnfavorites) : []

      if (item.isFavorite) {
        unfavorites = [...unfavorites, item.id]
      } else {
        favorites = favorites.filter(id => id !== item.id)
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favorites))
      await AsyncStorage.setItem('unfavorites', JSON.stringify(unfavorites))

      loadFavoriteItems()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <Text style={styles.titleHeader}>Favorite List</Text>
      </View>
      <FlatList
        data={favoriteItem}
        keyExtractor={item => item.id}
        numColumns={1}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.tableRow}
              onPress={() => navigation.navigate("Detail", { product: item })}
            >
              <Image source={{ uri: item.uri }} style={styles.tableImage} />
              <View style={styles.tableInfo}>
                <Text style={styles.tableName} numberOfLines={2}>{item.handbagName}</Text>
                <Text style={styles.tableBrand}>{item.brand}</Text>
                <Text style={styles.tableCost}>${item.cost}</Text>
              </View>
              <TouchableOpacity
                style={styles.tableFavorite}
                onPress={() => removeFavoriteItems(item)}
              >
                <MaterialIcons name="favorite" size={24} color="red" />
              </TouchableOpacity>
            </TouchableOpacity>
          )
        }}
      />
    </SafeAreaView>
  )
}