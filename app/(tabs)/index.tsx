import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';

type RootStackParamList = {
  Home: undefined;
  Details: { item?: { id: string; title: string; image: any; description: string } };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <ImageBackground
      source={require('../../assets/images/georgetown.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['transparent', 'rgba(255,255,255,0.9)']}
        style={styles.overlay}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Explore George Town</Text>
          <Text style={styles.subtitle}>Heritage • Food • Street Art</Text>

        
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('Details', {
                item: {
                  id: '1',
                  title: 'Khoo Kongsi Temple',
                  image: require('../../assets/images/khoo_kongsi.png'),
                  description: 'Khoo Kongsi Temple, also known as Leong San Tong, is the grandest Hokkien clanhouse in Malaysia. Built in 1906, it features intricate carvings, gilded beams, and a magnificent ancestral hall that reflects the wealth and influence of the Khoo clan. Hidden within Cannon Square, this UNESCO World Heritage Site offers visitors a glimpse into Penang’s Chinese heritage, complete with a traditional opera stage and granite-paved courtyard.',
                },
              })
            }
          >
            <Text style={styles.buttonText}>See Highlights</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    alignItems: 'center',
    padding: 30,
    paddingVertical: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});
