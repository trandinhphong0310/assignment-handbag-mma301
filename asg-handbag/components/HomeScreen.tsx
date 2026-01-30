import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
    container: {
        
    }
})

export default function HomeScreen() {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text>
                    <Ionicons name="menu" size={24} color="black" />
                </Text>
                <Text>HomeScreen</Text>
            </View>
        </SafeAreaView>
    )
}