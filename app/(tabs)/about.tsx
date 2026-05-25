import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>About</Text>
      <View style={styles.divider} />

      <Text style={styles.title}>About This App</Text>
      <Text style={styles.text}>
        George Town Explorer was created to highlight Penang’s heritage, food, and street art.
        It’s a cultural guide designed for students and visitors to appreciate the city’s living heritage.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF6EC', padding: 20 }, // Colonial Cream
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'left',
    color: '#1E3D59', // Straits Blue
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    textAlign: 'center', 
    marginTop: 20, 
    color: '#00A49B' // Persian Green
  },
  divider: {
    height: 2,                
    backgroundColor: '#576e85', 
    marginBottom: 10,         
    borderRadius: 1,          
  },
  text: { 
    fontSize: 16, 
    textAlign: 'center', 
    color: '#576e85' // muted blue-gray
  },
});
