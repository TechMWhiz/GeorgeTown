import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../../FavoritesContext';

export type RootStackParamList = {
  Home: undefined;
  Details: { item: { id: string; title: string; image: any; description: string } };
  Favorites: undefined;
};


type NavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

const data = [
  {
    id: '1',
    title: 'Khoo Kongsi Temple',
    image: require('@/assets/images/khoo_kongsi.png'),
    description: 'Step into Penang’s grandest clanhouse, where intricate carvings and golden beams tell stories of heritage and power. A hidden gem in Cannon Square waiting to amaze you.',
    category: 'Destination',
    mapUrl: 'https://maps.app.goo.gl/NcQjYTqRL8vVeHWL9',
  },
  {
    id: '2',
    title: 'Cheong Fatt Tze Mansion (Blue Mansion)',
    image: require('@/assets/images/dfattTze.jpg'),
    description: 'Marvel at the indigo walls of this legendary mansion. A blend of East and West architecture that feels like stepping into a living movie set.',
    category: 'Destination',
    mapUrl: 'https://maps.app.goo.gl/Udyv17v3egPERaZr8',
  },
  {
    id: '3',
    title: 'George Town Heritage Streets',
    image: require('@/assets/images/dgtown.jpg'),
    description: 'Wander through UNESCO-listed streets filled with colonial charm, vibrant shops, and cultural treasures at every corner.',
    category: 'Destination',
    mapUrl: 'https://maps.app.goo.gl/4AZjFLHemCMuj8pc6',
  },
  {
    id: '4',
    title: 'Penang Hill',
    image: require('@/assets/images/dpenang-hill.jpg'),
    description: 'Ride the funicular up to breathtaking views of George Town. A cool escape with gardens, temples, and panoramic scenery.',
    category: 'Destination',
    mapUrl: 'https://maps.app.goo.gl/CaV2UVDB39aMQw6w6',
  },
  {
    id: '5',
    title: 'Entopia Butterfly Farm',
    image: require('@/assets/images/dEntopia.jpg'),
    description: 'Be enchanted by thousands of butterflies fluttering around you. A magical nature park that delights kids and adults alike.',
    category: 'Destination',
    mapUrl: 'https://maps.app.goo.gl/KrBALHjEnJr5ayAJA',
  },
  {
    id: '6',
    title: 'Char Kway Teow',
    image: require('@/assets/images/fchar_kway_teow.png'),
    description: 'Savor smoky stir-fried noodles bursting with flavor. A street food legend that every visitor must taste.',
    category: 'Food',
    mapUrl: 'https://maps.app.goo.gl/MTuZXXVEWuWgwAZg7',
  },
  {
    id: '7',
    title: 'Penang Cendol',
    image: require('@/assets/images/fCendol.jpg'),
    description: 'Cool down with shaved ice, coconut milk, and palm sugar. A sweet treat that refreshes you under Penang’s tropical sun.',
    category: 'Food',
    mapUrl: 'https://maps.app.goo.gl/cSZUMdsj46v8rffL6',
  },
  {
    id: '8',
    title: 'Nasi Kandar',
    image: require('@/assets/images/fnasi.jpg'),
    description: 'Indulge in rice drenched with rich curries. A hearty meal that captures Penang’s Indian Muslim culinary heritage.',
    category: 'Food',
    mapUrl: 'https://maps.app.goo.gl/ngAzoQajXAqod2HW7',
  },
  {
    id: '9',
    title: 'Roti Canai',
    image: require('@/assets/images/froti.jpg'),
    description: 'Crispy on the outside, fluffy inside — this flatbread pairs perfectly with curry. A comfort food you’ll crave again and again.',
    category: 'Food',
    mapUrl: 'https://maps.app.goo.gl/B6rGS1Mqvnn4tSDm8',
  },

  {
    id: '10',
    title: 'Children on Bicycle Mural',
    image: require('@/assets/images/bicycle_mural.jpg'),
    description: 'Pose with Penang’s most famous mural. A playful artwork that captures the joy of childhood on George Town’s streets.',
    category: 'Art',
    mapUrl: 'https://maps.app.goo.gl/kd7xDyGzR1droyeQ8',
  },
  {
    id: '11',
    title: 'Boy on Motorcycle Mural',
    image: require('@/assets/images/aMotorcycle.jpg'),
    description: 'Hop on the real motorcycle and snap a photo! This interactive mural is a must-see for street art lovers.',
    category: 'Art',
    mapUrl: 'https://maps.app.goo.gl/ytTVvimEtcn4HWRu7',
  },
  {
    id: '12',
    title: 'Brother and Sister on Swing',
    image: require('@/assets/images/aSwing.jpg'),
    description: 'Swing alongside painted siblings in this interactive mural. A charming spot for fun photos and local vibes.',
    category: 'Art',
    mapUrl: 'https://maps.app.goo.gl/W5Rin8r7fmzjFqV96',
  },
  {
    id: '13',
    title: 'Art Lane',
    image: require('@/assets/images/art_lane.jpg'),
    description: 'Discover a lane bursting with creativity. Murals change often, making every visit a fresh artistic adventure.',
    category: 'Art',
    mapUrl: 'https://maps.app.goo.gl/iR1yn6gKoAQqCmSr7',
  },
  {
    id: '14',
    title: 'Steel Rod Sculptures',
    image: require('@/assets/images/asteelculp.png'),
    description: 'Follow the quirky wire sculptures scattered across town. Each one tells a witty story about Penang’s past.',
    category: 'Art',
    mapUrl: 'https://maps.app.goo.gl/WXVixNAunpkMrsof8',
  },
];


export default function ListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [filter, setFilter] = useState('All');
  const { favorites, toggleFavorite } = useFavorites();

  const filteredData = filter === 'All' ? data : data.filter(item => item.category === filter);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Highlights</Text>
      <View style={styles.divider} />


      {/* Filter buttons */}
      <View style={styles.filterBar}>
        {['All', 'Art', 'Food', 'Destination'].map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setFilter(cat)}
            style={[styles.filterButton, filter === cat && styles.activeFilter]}
          >
            <Text style={[styles.filterText, filter === cat && styles.activeFilterText]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Details', { item })} 
          >
            <Image source={item.image} style={styles.image} />

            <TouchableOpacity
              style={styles.heartIcon}
              onPress={() => toggleFavorite(item)}
            >
              <Ionicons
                name={favorites.find(f => f.id === item.id) ? 'heart' : 'heart-outline'}
                size={22}
                color={favorites.find(f => f.id === item.id) ? '#EB3349' : '#1E3D59'}
              />
            </TouchableOpacity>

            <Text style={styles.text}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF6EC', paddingHorizontal: 16 }, 
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 50,
    marginBottom: 10,
    color: '#1E3D59', // Straits Blue
    textAlign: 'left',
  },
  divider: {
    height: 2,                
    backgroundColor: '#576e85', 
    marginBottom: 15,         
    borderRadius: 1,          
  },
  
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#E0E0E0', 
  },
  activeFilter: {
    backgroundColor: '#00A49B', 
  },
  filterText: {
    fontSize: 14,
    color: '#1E3D59', 
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: '700',
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: { width: 60, height: 60, marginRight: 10, borderRadius: 6 },
  text: { fontSize: 18, color: '#1E3D59' }, 
  heartIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  favoritesButton: {
    backgroundColor: '#00A49B', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  favoritesButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
