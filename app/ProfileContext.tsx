import React, { createContext, useContext, useState } from 'react';
import { ImageSourcePropType } from 'react-native';

type Profile = {
  name: string;
  email: string;
  username: string;
  phone: string;
  image: ImageSourcePropType;
};

type ProfileContextType = {
  profile: Profile;
  updateProfile: (p: Profile) => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<Profile>({
    name: 'Chelsea',
    email: 'chelsea@example.com',
    username: '@chelsea',
    phone: '+63 9123456789',
    image: require('../assets/images/profile.jpg'),
  });

  const updateProfile = (p: Profile) => setProfile(p);

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
};