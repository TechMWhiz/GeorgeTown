import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from './_layout';
import { useProfile } from '../ProfileContext';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { profile } = useProfile();

  return (
    <View style={styles.container}>
      <Image source={profile.image} style={styles.profileImage} />
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.email}>{profile.email}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FDF6EC' },
  profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 20, borderWidth: 2, borderColor: '#00A49B' },
  name: { fontSize: 22, fontWeight: '700', color: '#1E3D59', marginBottom: 5 },
  email: { fontSize: 16, color: '#576e85', marginBottom: 20 },
  button: { backgroundColor: '#EB3349', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});