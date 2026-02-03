import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAllHandbag } from '../apis/api'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 22,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 16
  },
  titleHeader: {
    fontSize: 16,
  },
  titleProducts: {
    fontSize: 24,
    padding: 8
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    width: '50%',
    padding: 8,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 12
  },
  handbagName: {
    fontSize: 16,

  },
  cost: {
    fontWeight: 500,
    fontSize: 16,
    marginTop: 8,
  },
  favorite: {
    position: 'absolute',
    right: 0,
    marginTop: 8,
    marginRight: 8,
  }
})

export default function HomeScreen() {

  const [handbag, setHandbag] = useState([])
  const [category, setCategory] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
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
                onPress={() => navigation.navigate('Detail')}
                style={styles.listItem}
              >
                <Image
                  style={styles.image}
                  source={{ uri: item.uri }}
                />
                <Text style={styles.favorite}>{item.isFavorite ? <MaterialIcons name="favorite-outline" size={24} color="black" /> : ''}</Text>
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