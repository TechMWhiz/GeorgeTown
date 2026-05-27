import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, FlatList, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { useTheme } from '../ThemeContext';
import { lightTheme, darkTheme } from '../themeColors';

const { width, height } = Dimensions.get('window');

export default function AboutScreen() {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const [viewerVisible, setViewerVisible] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const gallery = [
    require('@/assets/images/georgetown.jpg'),
    require('@/assets/images/penanghill1.jpg'),
    require('@/assets/images/penanghill2.jpg'),
    require('@/assets/images/penanghill4.jpg'),
    require('@/assets/images/dEntopia.jpg'),
    require('@/assets/images/Entopia1.jpg'),
    require('@/assets/images/Entopia4.jpg'),
    require('@/assets/images/FattTze1.jpg'),
    require('@/assets/images/fnasi.jpg'),
    require('@/assets/images/kandar.jpg'),
    require('@/assets/images/fCendol.jpg'),
    require('@/assets/images/khoo_kongsi.jpg'),
    require('@/assets/images/art_lane.jpg'),
    require('@/assets/images/aSwing.jpg'),
    require('@/assets/images/aMotorcycle.jpg'),
    require('@/assets/images/Kway.png'),
    require('@/assets/images/Kongsi2.jpg'),
    require('@/assets/images/FattTze2.jpg'),
    require('@/assets/images/dpenang-hill.jpg'),
    require('@/assets/images/dgtown.jpg'),
    require('@/assets/images/Char-Kway-Teow.jpg'),
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>About</Text>
      <View style={[styles.divider, { backgroundColor: colors.divider }]} />

      <Text style={[styles.title, { color: colors.accent }]}>About This App</Text>
      <Text style={[styles.text, { color: colors.subText }]}>
        George Town Explorer was created to highlight Penang’s heritage, food, and street art.
        It’s a cultural guide designed for students and visitors to appreciate the city’s living heritage.
        {'\n\n'}
        George Town is the capital of the Malaysian state of Penang. It is the core city of the George Town 
        Conurbation, Malaysia's second largest metropolitan area with a population of 2.84 million and the 
        second largest metropolitan economy in the country. The city proper spans an area of 306 km2 (118 sq mi) 
        encompassing Penang Island and surrounding islets, and had a population of 794,313 as of 2020.
        {'\n\n'}
        Through this app, you can discover iconic murals, taste authentic local dishes, and explore
        historical landmarks — all in one place. Our goal is to inspire meaningful travel and help
        preserve the stories that make George Town unique.
      </Text>

      {/* ✅ Photo Grid Section */}
      <FlatList
        data={gallery}
        numColumns={3}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setStartIndex(index);
              setViewerVisible(true);
            }}
          >
            <Image source={item} style={styles.image} resizeMode="cover" />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.galleryContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* ✅ Fullscreen Swipeable Viewer */}
      <Modal visible={viewerVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <FlatList
            data={gallery}
            horizontal
            pagingEnabled
            initialScrollIndex={startIndex}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            renderItem={({ item }) => (
              <Image source={item} style={styles.fullImage} resizeMode="contain" />
            )}
            keyExtractor={(_, index) => index.toString()}
          />
          <TouchableOpacity style={styles.closeButton} onPress={() => setViewerVisible(false)}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'left',
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    textAlign: 'center', 
    marginTop: 20,
  },
  divider: {
    height: 2,
    marginBottom: 10,
    borderRadius: 1,
  },
  text: { 
    fontSize: 16, 
    textAlign: 'center',
    marginBottom: 20,
  },
  galleryContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width,
    height: height * 0.8,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 20,
  },
  closeText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
