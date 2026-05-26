import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Linking, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from './_layout';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useProfile } from '../ProfileContext';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

export default function SettingsScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const { profile, updateProfile } = useProfile();

  // 📸 Pick image from gallery or camera
  const pickImage = async (fromCamera: boolean = false) => {
    let result;
    if (fromCamera) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    }

    if (!result.canceled) {
      updateProfile({
        ...profile,
        image: { uri: result.assets[0].uri }, // ✅ update context
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.divider} />

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profileRow}>
          <View style={styles.imageContainer}>
            <Image source={profile.image} style={styles.profileImage} />
            {/* Camera Icon Overlay */}
            <TouchableOpacity style={styles.cameraIcon} onPress={() => pickImage(false)}>
              <Ionicons name="camera-outline" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.username}>{profile.username}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* Dark Mode toggle */}
      <View style={styles.row}>
        <Text style={styles.text}>Dark Mode</Text>
        <Switch value={isEnabled} onValueChange={() => setIsEnabled(!isEnabled)} />
      </View>

      {/* Other settings rows */}
      <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('BookingHistory')}>
        <Text style={styles.text}>Booking History</Text>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('About')}>
        <Text style={styles.text}>About This App</Text>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.row} onPress={() => Linking.openURL('https://yourdomain.com/privacy')}>
        <Text style={styles.text}>Privacy Policy</Text>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.row} onPress={() => Linking.openURL('mailto:yourappsupport@email.com')}>
        <Text style={styles.text}>Contact / Feedback</Text>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF6EC', padding: 20, paddingTop: 60 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#1E3D59' },
  divider: { height: 2, backgroundColor: '#576e85', marginBottom: 10, borderRadius: 1 },
  profileHeader: { alignItems: 'center', marginBottom: 25 },
  profileRow: { flexDirection: 'row', alignItems: 'center' },
  imageContainer: { position: 'relative' },
  profileImage: { width: 70, height: 70, borderRadius: 35, marginRight: 15 },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#00A49B',
    borderRadius: 12,
    padding: 4,
  },
  profileInfo: { flexDirection: 'column' },
  name: { fontSize: 18, fontWeight: '700', color: '#1E3D59' },
  username: { fontSize: 14, color: '#576e85' },
  editButton: {
    backgroundColor: '#EB3349',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  editButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  text: { fontSize: 18, color: '#576e85' },
  chevron: { fontSize: 22, color: '#576e85' },
});
