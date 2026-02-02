import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAllHandBag } from '../apis/api';
import { HandBag } from "../types/types";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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

    const [handbag, setHandbag] = useState<HandBag[]>([])

    useEffect(() => {
        getAllHandBag()
            .then(data => {
                if (data)
                    return setHandbag(data)
            })
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.container}>
                <TouchableOpacity>
                    <Ionicons name="menu" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.titleHeader}>Hand Bag</Text>
                <TouchableOpacity>
                    <Ionicons name="search" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.titleProducts}>Hand Bag Products</Text>
                <FlatList
                    data={handbag}
                    numColumns={2}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.listItem}>
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