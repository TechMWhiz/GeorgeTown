import React, { useState } from 'react';
import {
  View, Text, TextInput, Image, TouchableOpacity, StyleSheet, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../ProfileContext';
import { useTheme } from '../ThemeContext';
import { lightTheme, darkTheme } from '../themeColors';

export default function EditProfileScreen() {
  const { profile, updateProfile } = useProfile();
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [username, setUsername] = useState(profile.username);
  const [phone, setPhone] = useState(profile.phone);
  const [image, setImage] = useState(profile.image);

  const navigation = useNavigation();
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

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
      setImage({ uri: result.assets[0].uri });
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Edit Profile</Text>

      {/* Profile Image with Camera Overlay */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.profileImage} />
        <TouchableOpacity style={[styles.cameraIcon, { backgroundColor: colors.accent }]} onPress={() => pickImage(false)}>
          <Ionicons name="camera-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Form fields */}
      <View style={styles.form}>
        <Text style={[styles.label, { color: colors.text }]}>Name</Text>
        <TextInput style={[styles.input, { backgroundColor: colors.card, color: colors.text }]} value={name} onChangeText={setName} />
        <Text style={[styles.label, { color: colors.text }]}>Email address</Text>
        <TextInput style={[styles.input, { backgroundColor: colors.card, color: colors.text }]} value={email} onChangeText={setEmail} />
        <Text style={[styles.label, { color: colors.text }]}>Username</Text>
        <TextInput style={[styles.input, { backgroundColor: colors.card, color: colors.text }]} value={username} onChangeText={setUsername} />
        <Text style={[styles.label, { color: colors.text }]}>Phone number</Text>
        <TextInput style={[styles.input, { backgroundColor: colors.card, color: colors.text }]} value={phone} onChangeText={setPhone} />
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: colors.accent }]}
        onPress={() => {
          updateProfile({ name, email, username, phone, image });
          navigation.goBack();
        }}
      >
        <Ionicons name="checkmark-outline" size={24} color="#fff" />
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 20 },
  imageContainer: { alignItems: 'center', marginBottom: 20, position: 'relative' },
  profileImage: { width: 120, height: 120, borderRadius: 60 },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 120 / 2 - 20,
    borderRadius: 20,
    padding: 6,
  },
  form: { marginHorizontal: 10 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 5, marginTop: 10 },
  input: { borderRadius: 12, padding: 12, fontSize: 16 },
  saveButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 30, paddingVertical: 12, marginTop: 30 },
  saveText: { color: '#fff', fontSize: 18, fontWeight: '700', marginLeft: 8 },
});
