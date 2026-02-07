import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import styles from '../assets/css/detail.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function Detail({ route }) {

  const { product } = route.params
  const navigation = useNavigation()
  const [isFavorite, setIsFavorite] = useState(product.isFavorite)

  const saleOffProduct = Math.round(product.percentOff * 100);

  useEffect(() => {
    loadFavoriteStatus()
  }, [])

  const loadFavoriteStatus = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites')
      const savedUnfavorites = await AsyncStorage.getItem('unfavorites')

      const favorites = savedFavorites ? JSON.parse(savedFavorites) : []
      const unfavorites = savedUnfavorites ? JSON.parse(savedUnfavorites) : []

      if (product.isFavorite) {
        setIsFavorite(!unfavorites.includes(product.id))
      } else {
        setIsFavorite(favorites.includes(product.id))
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <Text style={styles.titleHeader}>Hand Bag Detail</Text>
      </View>
      <TouchableOpacity>
        <View style={styles.favorites}>
          {isFavorite
            ? <MaterialIcons name="favorite" size={24} color="red" />
            : <MaterialIcons name="favorite-outline" size={24} color="black" />}
        </View>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 8 }}>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{saleOffProduct}%</Text>
          </View>
          <Image style={styles.image} source={{ uri: product.uri }} />
          <View style={styles.colorRow}>
            <Text style={styles.label}>Color:</Text>
            <View style={styles.colorList}>
              {product.color.map((item, index) => (
                <View key={index} style={styles.colorItem}>
                  <Text style={styles.colorValue}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
          <Text style={styles.handbagName}>{product.handbagName}</Text>
          <Text style={styles.brand}><Text style={{ fontWeight: 'bold' }}>Brand:</Text> {product.brand}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.reviewsProductsTitle}>Reviews: </Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{product.rating}</Text>
              <AntDesign name="star" size={16} color="#FFD700" />
            </View>
          </View>
          <View>
            {product.feedback.map((item, index) => (
              <View key={index} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewUser}>{item.user}</Text>
                  <Text style={styles.reviewDate}>
                    {new Date(item.date).toLocaleDateString()}
                  </Text>
                </View>
                <Text style={styles.reviewComment}>{item.comment}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}