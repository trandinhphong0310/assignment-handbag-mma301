import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAllHandbag } from '../apis/api'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../assets/css/home.styles';

export default function Home() {

  const [handbag, setHandbag] = useState([])
  const [category, setCategory] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [favorites, setFavorites] = useState([])
  const [unfavorites, setUnfavorites] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    getAllHandbag()
      .then(data => {
        if (data) {
          setHandbag(data)
          const uniqueCategories = ['All', ...new Set(data.map(item => item.category))]
          setCategory(uniqueCategories)
        }
      })
  }, [])

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem("favorites")
      const savedUnfavorites = await AsyncStorage.getItem("unfavorites")

      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites))
      }
      if (savedUnfavorites) {
        setUnfavorites(JSON.parse(savedUnfavorites))
      }
    } catch (err) {
      console.log(err)
    }
  }

  const saveFavorites = async (newFavorites, newUnfavorites) => {
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites))
      await AsyncStorage.setItem("unfavorites", JSON.stringify(newUnfavorites))
    } catch (err) {
      console.log(err)
    }
  }

  const handleFavorite = (item) => {
    let newFavorites = [...favorites]
    let newUnfavorites = [...unfavorites]

    if (item.isFavorite) {
      if (unfavorites.includes(item.id)) {
        newUnfavorites = unfavorites.filter(id => id !== item.id)
      } else {
        newUnfavorites = [...unfavorites, item.id]
      }
    } else {
      if (favorites.includes(item.id)) {
        newFavorites = favorites.filter(id => id !== item.id)
      } else {
        newFavorites = [...favorites, item.id]
      }
    }

    setFavorites(newFavorites)
    setUnfavorites(newUnfavorites)
    saveFavorites(newFavorites, newUnfavorites)
  }

  const isFavoriteItem = (item) => {
    if (item.isFavorite) {
      return !unfavorites.includes(item.id)
    } else {
      return favorites.includes(item.id)
    }
  }

  const displayHandbags = selectedCategory === 'All'
    ? handbag
    : handbag.filter(item => item.category === selectedCategory)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Hand Bag</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ height: 50, marginBottom: 10 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={category}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedCategory(item)}
              style={{
                paddingHorizontal: 20,
                justifyContent: 'center',
                borderBottomWidth: selectedCategory === item ? 2 : 0,
                borderBottomColor: 'black'
              }}
            >
              <Text style={{ fontWeight: selectedCategory === item ? 'bold' : 'normal' }}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.titleProducts}>Hand Bag Products</Text>
        <FlatList
          data={displayHandbags}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('Detail', { product: item, isFavoriteUser: isFavoriteItem(item) })}
                style={styles.listItem}
              >
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>-{Math.round(item.percentOff * 100)}%</Text>
                </View>
                <Image
                  style={styles.image}
                  source={{ uri: item.uri }}
                />
                <TouchableOpacity style={styles.favorite} onPress={() => handleFavorite(item)}>
                  {isFavoriteItem(item)
                    ? <MaterialIcons name={"favorite"} size={24} color={"red"} />
                    : <MaterialIcons name={"favorite-outline"} size={24} color={"black"} />
                  }
                </TouchableOpacity>
                <Text style={styles.handbagName}>{item.handbagName}</Text>
                <Text style={styles.cost}>${item.cost}</Text>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </SafeAreaView>
  )
}