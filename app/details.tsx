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
import { useTheme } from './ThemeContext';  
import { lightTheme, darkTheme } from './themeColors'; 
import type { RootStackParamList } from './types';

const { width, height } = Dimensions.get('window');

type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

export default function DetailsScreen({ route }: { route: DetailsRouteProp }) {
  const { item } = route.params;
  const navigation = useNavigation<NavigationProp>();
  const { favorites, toggleFavorite } = useFavorites();
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const isFavorite = favorites.find(f => f.id === item.id);

  const [viewerVisible, setViewerVisible] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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
              color={isFavorite ? colors.danger : '#fff'}
            />
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={['transparent', theme === 'dark' ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.75)']}
          style={styles.overlay}
        />
      </ImageBackground>

      <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
        <View style={[styles.handleBar, { backgroundColor: colors.divider }]} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
          <Text style={[styles.category, { color: colors.accent }]}>{item.category}</Text>
          <Text style={[styles.description, { color: colors.subText }]}>{item.description}</Text>

          {/* Map button */}
          <TouchableOpacity
            style={[styles.mapButton, { backgroundColor: colors.accent }]}
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
              <Text style={[styles.galleryTitle, { color: colors.text }]}>Photos</Text>
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
            style={[styles.bookButton, { backgroundColor: colors.danger }]}
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
  container: { flex: 1 },
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
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 25,
    height: height * 0.45,
  },
  handleBar: { width: 60, height: 6, borderRadius: 3, alignSelf: 'center', marginBottom: 10 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 6 },
  category: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  description: { fontSize: 15, lineHeight: 22, marginBottom: 20 },
  mapButton: { paddingVertical: 12, borderRadius: 30, alignItems: 'center', marginBottom: 20 },
  mapButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  galleryTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
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
