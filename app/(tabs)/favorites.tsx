import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFavorites } from '../../FavoritesContext';
import { useTheme } from '../ThemeContext';
import { lightTheme, darkTheme } from '../themeColors';
import type { RootStackParamList } from '../types'; 

type NavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavorites();
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>My Favorites</Text>
      <View style={[styles.divider, { backgroundColor: colors.divider }]} />

      {favorites.length === 0 ? (
        <Text style={[styles.empty, { color: colors.subText }]}>No favorites yet. Tap hearts to add!</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.item, { backgroundColor: colors.card }]}
              onPress={() =>
                navigation.navigate('Details', { item: { ...item, category: item.category ?? 'Unknown' } })
              }
            >
              <Image source={item.image} style={styles.image} />
              <View style={styles.info}>
                <Text style={[styles.text, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.category, { color: colors.accent }]}>{item.category}</Text>
              </View>

              {/* Heart toggle */}
              <TouchableOpacity style={styles.heartIcon} onPress={() => toggleFavorite(item)}>
                <Text style={[styles.removeText, { color: colors.danger }]}>Remove</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  title: { fontSize: 22, fontWeight: '700', marginTop: 50, marginBottom: 10 },
  divider: { height: 2, marginBottom: 15, borderRadius: 1 },
  empty: { fontSize: 16, textAlign: 'center', marginTop: 20 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
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
  text: { fontSize: 18, fontWeight: '600' },
  category: { fontSize: 14, fontWeight: '500' },
  heartIcon: { paddingHorizontal: 8 },
  removeText: { fontWeight: '600' },
});
