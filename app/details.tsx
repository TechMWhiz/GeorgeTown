import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

interface RouteParams {
  params: {
    item: {
      image: any;
      title: string;
      description: string;
    };
  };
}

export default function DetailsScreen({ route }: { route: RouteParams }) {
  const { item } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground source={item.image} style={styles.image} resizeMode="cover">
        {/* Back button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.overlay}>
          <View style={styles.infoCard}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  image: { flex: 1, justifyContent: 'flex-end' },
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 8,
    borderRadius: 50,
  },
  infoCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#ddd',
    marginBottom: 20,
    lineHeight: 20,
  }
});
