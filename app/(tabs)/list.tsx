import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the type for your stack params
type RootStackParamList = {
  Home: undefined;
  Details: { item: { id: string; title: string; image: any; description: string } };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

const data = [
  {
    id: '1',
    title: 'Khoo Kongsi Temple',
    image: require('@/assets/images/khoo_kongsi.png'),
    description: 'Historic Chinese clan house, symbolizing Penang’s heritage.',
  },
  {
    id: '2',
    title: 'Char Kway Teow',
    image: require('@/assets/images/char_kway_teow.png'),
    description: 'Famous stir-fried noodle dish, a Penang street food icon.',
  },
  {
    id: '3',
    title: 'Children on Bicycle Mural',
    image: require('@/assets/images/bicycle_mural.jpg'),
    description: 'Street art by Ernest Zacharevic, symbolizing local life.',
  },
];

export default function ListScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Highlights</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Details', { item })}>
            <View style={styles.item}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.text}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', paddingHorizontal: 16 },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 50,
    marginBottom: 10,
    color: '#222',
    textAlign: 'left',
  },
  item: { flexDirection: 'row', padding: 10, alignItems: 'center', backgroundColor: '#fff', marginBottom: 10, borderRadius: 8 },
  image: { width: 60, height: 60, marginRight: 10, borderRadius: 6 },
  text: { fontSize: 18, color: '#333' },
});