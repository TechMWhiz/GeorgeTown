import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFavorites } from '../../FavoritesContext';
import type { RootStackParamList } from './_layout';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavorites();
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Favorites</Text>
      <View style={styles.divider} />

      {favorites.length === 0 ? (
        <Text style={styles.empty}>No favorites yet. Tap hearts to add!</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('Details', { item: { ...item, category: item.category ?? 'Unknown' } })} // 👈 make it clickable
            >
              <Image source={item.image} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.text}>{item.title}</Text>
                <Text style={styles.category}>{item.category}</Text>
              </View>

              {/* Heart toggle */}
              <TouchableOpacity style={styles.heartIcon} onPress={() => toggleFavorite(item)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF6EC', paddingHorizontal: 16 }, // Colonial Cream
  title: { 
    fontSize: 22, 
    fontWeight: '700', 
    marginTop: 50, 
    marginBottom: 10, 
    color: '#1E3D59' // Straits Blue
  },
  divider: {
    height: 2,                
    backgroundColor: '#576e85', 
    marginBottom: 15,         
    borderRadius: 1,          
  },
  empty: { 
    fontSize: 16, 
    color: '#576e85', // muted blue-gray
    textAlign: 'center', 
    marginTop: 20 
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: { width: 60, height: 60, borderRadius: 6, marginRight: 10 },
  info: { flex: 1 },
  text: { fontSize: 18, fontWeight: '600', color: '#1E3D59' }, // Straits Blue
  category: { fontSize: 14, color: '#00A49B', fontWeight: '500' }, // Persian Green
  heartIcon: { paddingHorizontal: 8 },
  removeText: { color: '#EB3349', fontWeight: '600' }, // Amaranth Red
});

