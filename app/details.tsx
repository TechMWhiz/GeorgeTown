import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFavorites } from '../FavoritesContext';
import type { RootStackParamList } from './types';

const { width, height } = Dimensions.get('window');

type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

export default function DetailsScreen({ route }: { route: DetailsRouteProp }) {
  const { item } = route.params;
  const navigation = useNavigation<NavigationProp>();
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.find(f => f.id === item.id);

  // State for fullscreen viewer
  const [viewerVisible, setViewerVisible] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

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
              color={isFavorite ? '#EB3349' : '#fff'}
            />
          </TouchableOpacity>
        </View>

        {/* Gradient overlay */}
        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.75)']} style={styles.overlay} />
      </ImageBackground>

      {/* Fixed half‑screen info card */}
      <View style={styles.infoCard}>
        <View style={styles.handleBar} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.description}>{item.description}</Text>

          {/* Map button */}
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

          {/* Gallery */}
          {item.gallery && (
            <>
              <Text style={styles.galleryTitle}>Photos</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {item.gallery.map((photo: any, index: number) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setStartIndex(index);
                      setViewerVisible(true);
                    }}
                  >
                    <Image source={photo} style={styles.galleryImage} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          )}

          {/* Book Now button */}
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => navigation.navigate('BookingForm', { item })}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Fullscreen swipeable viewer */}
      <Modal visible={viewerVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <FlatList
            data={item.gallery}
            horizontal
            pagingEnabled
            initialScrollIndex={startIndex}
            getItemLayout={(data, index) => ({ length: width, offset: width * index, index })}
            renderItem={({ item: photo }) => (
              <Image source={photo} style={styles.fullImage} resizeMode="contain" />
            )}
            keyExtractor={(_, index) => index.toString()}
          />
          <TouchableOpacity style={styles.closeButton} onPress={() => setViewerVisible(false)}>
            <Ionicons name="close" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  image: { flex: 1 },
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
  overlay: { ...StyleSheet.absoluteFillObject },
  infoCard: {
    position: 'absolute',
    top: height * 0.65,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 25,
    height: height * 0.45, // fixed half screen
  },
  handleBar: {
    width: 60,
    height: 6,
    backgroundColor: '#ccc',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: { fontSize: 24, fontWeight: '700', color: '#1E3D59', marginBottom: 6 },
  category: { fontSize: 16, fontWeight: '600', color: '#00A49B', marginBottom: 10 },
  description: { fontSize: 15, color: '#576e85', lineHeight: 22, marginBottom: 20 },
  mapButton: {
    backgroundColor: '#00A49B',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  mapButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  galleryTitle: { fontSize: 18, fontWeight: '600', color: '#1E3D59', marginBottom: 10 },
  galleryImage: { width: 120, height: 80, borderRadius: 10, marginRight: 10 },
  bookButton: {
    backgroundColor: '#EB3349',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonText: { color: '#fff', fontWeight: '700', fontSize: 18 },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: { width, height: height * 0.8 },
  closeButton: {
    position: 'absolute',
    top: 90,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 50,
  },
});
