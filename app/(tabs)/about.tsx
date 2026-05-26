import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '../ThemeContext';
import { lightTheme, darkTheme } from '../themeColors';

export default function AboutScreen() {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>About</Text>
      <View style={[styles.divider, { backgroundColor: colors.divider }]} />

      <Text style={[styles.title, { color: colors.accent }]}>About This App</Text>
      <Text style={[styles.text, { color: colors.subText }]}>
        George Town Explorer was created to highlight Penang’s heritage, food, and street art.
        It’s a cultural guide designed for students and visitors to appreciate the city’s living heritage.
      </Text>
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
  },
});
