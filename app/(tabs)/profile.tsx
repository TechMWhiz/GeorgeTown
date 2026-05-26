import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from './_layout';
import { useProfile } from '../ProfileContext';
import { useTheme } from '../ThemeContext';   
import { lightTheme, darkTheme } from '../themeColors'; 

type NavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { profile } = useProfile();
  const { theme } = useTheme();   
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={profile.image} style={[styles.profileImage, { borderColor: colors.accent }]} />
      <Text style={[styles.name, { color: colors.text }]}>{profile.name}</Text>
      <Text style={[styles.email, { color: colors.subText }]}>{profile.email}</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.danger }]}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 20, borderWidth: 2 },
  name: { fontSize: 22, fontWeight: '700', marginBottom: 5 },
  email: { fontSize: 16, marginBottom: 20 },
  button: { paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
