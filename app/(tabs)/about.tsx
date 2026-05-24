import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ Title at the very top */}
      <Text style={styles.header}>About</Text>

      <Text style={styles.title}>About This App</Text>
      <Text style={styles.text}>
        George Town Explorer was created to highlight Penang’s heritage, food, and street art.
        It’s a cultural guide designed for students and visitors to appreciate the city’s living heritage.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 20 },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
    textAlign: 'left', 
    color: '#222',
  },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', marginTop: 20, color: '#222' },
  text: { fontSize: 16, textAlign: 'center', color: '#444' },
});
