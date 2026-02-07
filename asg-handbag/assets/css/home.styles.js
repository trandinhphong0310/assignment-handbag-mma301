import { StyleSheet } from 'react-native';

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
    marginTop: 12,
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
  },
  discountBadge: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginRight: 12
  },
  discountText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  }
})

export default styles