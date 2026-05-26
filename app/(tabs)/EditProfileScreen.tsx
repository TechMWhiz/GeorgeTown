import React, { useState } from 'react';
import {
  View, Text, TextInput, Image, TouchableOpacity, StyleSheet, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../ProfileContext';

export default function EditProfileScreen() {
  const { profile, updateProfile } = useProfile();
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [username, setUsername] = useState(profile.username);
  const [phone, setPhone] = useState(profile.phone);
  const [image, setImage] = useState(profile.image);

  const navigation = useNavigation();

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
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>

      {/* Profile Image with Camera Overlay */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.profileImage} />
        <TouchableOpacity style={styles.cameraIcon} onPress={() => pickImage(false)}>
          <Ionicons name="camera-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Form fields */}
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        <Text style={styles.label}>Email address</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} value={username} onChangeText={setUsername} />
        <Text style={styles.label}>Phone number</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={styles.saveButton}
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
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 20, color: '#1E3D59' },
  imageContainer: { alignItems: 'center', marginBottom: 20, position: 'relative' },
  profileImage: { width: 120, height: 120, borderRadius: 60 },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 120 / 2 - 20,
    backgroundColor: '#00A49B',
    borderRadius: 20,
    padding: 6,
  },
  form: { marginHorizontal: 10 },
  label: { fontSize: 14, fontWeight: '600', color: '#1E3D59', marginBottom: 5, marginTop: 10 },
  input: { backgroundColor: '#FDF6EC', borderRadius: 12, padding: 12, fontSize: 16, color: '#333' },
  saveButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#00A49B', borderRadius: 30, paddingVertical: 12, marginTop: 30 },
  saveText: { color: '#fff', fontSize: 18, fontWeight: '700', marginLeft: 8 },
});
