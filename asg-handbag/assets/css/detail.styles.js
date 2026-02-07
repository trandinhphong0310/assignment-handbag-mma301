import { StyleSheet } from 'react-native';

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
  favorites: {
    position: 'absolute',
    right: 20,
    top: -65,
  },
  brand: {
    fontSize: 16,
    marginTop: 12
  },
  handbagName: {
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center'
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 12,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 8
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomColor: "#f0f0f0",
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  colorList: {
    flexDirection: 'row',
    gap: 8,
  },
  colorItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
  },
  colorValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  discountBadge: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    alignSelf: 'flex-end',
    marginRight: 12
  },
  discountText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  reviewsProductsTitle: {
    marginTop: 20,
    marginBottom: 16,
    fontSize: 16,
    fontWeight: 'bold'
  },
  description: {
    marginTop: 12,
    fontSize: 14,
    color: '#333',
    opacity: 0.7,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: 12
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  reviewCard: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewUser: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  reviewDate: {
    fontSize: 13,
    color: '#666',
  },
  reviewComment: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  }
});

export default styles;