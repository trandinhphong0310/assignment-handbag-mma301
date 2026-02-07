import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 22,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginBottom: 16
    },
    titleHeader: {
        fontSize: 16,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        backgroundColor: '#fff'
    },
    tableImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee'
    },
    tableInfo: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center'
    },
    tableName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4
    },
    tableBrand: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4
    },
    tableCost: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ff4444'
    },
    tableFavorite: {
        padding: 8,
        marginLeft: 8
    }
})

export default styles