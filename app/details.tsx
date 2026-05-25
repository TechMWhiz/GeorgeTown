import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Linking } from 'react-native';
import { useFavorites } from '../FavoritesContext';
import type { RootStackParamList } from './(tabs)/_layout';

type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

export default function DetailsScreen({ route }: { route: DetailsRouteProp }) {
  const { item } = route.params;
  const navigation = useNavigation<NavigationProp>();
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.find(f => f.id === item.id);

  return (
    <View style={styles.container}>
      <ImageBackground source={item.image} style={styles.image} resizeMode="cover">
        {/* Top buttons */}
        <View style={styles.topButtons}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={26} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={() => toggleFavorite(item)}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={26}
              color={isFavorite ? '#e63946' : '#fff'}
            />
          </TouchableOpacity>
        </View>

        {/* Gradient overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.75)']}
          style={styles.overlay}
        >
          <View style={styles.infoCard}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.description}>{item.description}</Text>

            <TouchableOpacity
              style={styles.mapButton}
              onPress={async () => {
                const url = item.mapUrl;
                const supported = await Linking.canOpenURL(url);
                if (supported) {
                  await Linking.openURL(url);
                } else {
                  alert("Can't open the map link");
                }
              }}
            >
              <Text style={styles.mapButtonText}>See On The Map</Text>
            </TouchableOpacity>

          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  image: { flex: 1, justifyContent: 'flex-end' },
  topButtons: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  iconButton: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 8,
    borderRadius: 50,
  },
  overlay: { flex: 1, justifyContent: 'flex-end' },
  infoCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 25,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  title: { fontSize: 24, fontWeight: '700', color: '#fff', marginBottom: 6 },
  category: { fontSize: 16, fontWeight: '600', color: '#00baff', marginBottom: 10 },
  description: { fontSize: 15, color: '#ddd', lineHeight: 22, marginBottom: 20 },
  mapButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
  },
  mapButtonText: { color: '#222', fontWeight: '700', fontSize: 16 },
});
