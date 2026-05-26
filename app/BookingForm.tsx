import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from './(tabs)/_layout';
import { useBookings } from './BookingsContext';
import { useTheme } from './ThemeContext';   
import { lightTheme, darkTheme } from './themeColors'; 

type BookingRouteProp = RouteProp<RootStackParamList, 'BookingForm'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'BookingForm'>;

export default function BookingForm({ route }: { route?: BookingRouteProp }) {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  // ✅ Hook must be called at top level
  const { addBooking } = useBookings();

  // Safe fallback for item
  const item = route?.params?.item ?? {
    id: '0',
    title: 'Unknown',
    category: 'General',
    description: '',
    image: null,
    mapUrl: '',
  };

  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [people, setPeople] = useState<number>(1);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Dynamic max people based on category
  const getMaxPeople = () => {
    if (item.category === 'Art') return 4;
    if (item.category === 'Restaurant') return 10;
    if (item.category === 'Place') return 20;
    return 5;
  };

  const handleConfirm = () => {
    if (!date || !time || !people) {
      Alert.alert('Missing Info', 'Please select all fields before confirming.');
      return;
    }

    // ✅ Now safe to use addBooking
    addBooking({
      title: item.title,
      category: item.category,
      date: date.toDateString(),
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      people,
      image: item.image,
    });

    Alert.alert(
      'Booking Confirmed',
      `You booked ${item.title} (${item.category}) on ${date.toDateString()} at ${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} for ${people} people.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.header, { color: colors.text }]}>Book {item.title}</Text>
        <View style={[styles.divider, { backgroundColor: colors.divider }]} />

        {item.image && (
          <Image source={item.image} style={styles.image} resizeMode="cover" />
        )}

        {/* Date Picker */}
        <TouchableOpacity
          style={[styles.inputButton, { backgroundColor: colors.card, borderColor: colors.divider }]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={[styles.inputText, { color: colors.text }]}>
            {date ? date.toDateString() : 'Select Date'}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        {/* Time Picker */}
        <TouchableOpacity
          style={[styles.inputButton, { backgroundColor: colors.card, borderColor: colors.divider }]}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={[styles.inputText, { color: colors.text }]}>
            {time
              ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : 'Select Time'}
          </Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={time || new Date()}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);
              if (selectedTime) setTime(selectedTime);
            }}
          />
        )}

        {/* Number of People Stepper */}
        <Text style={[styles.label, { color: colors.text }]}>Number of People</Text>
        <View style={styles.peopleContainer}>
          <TouchableOpacity
            style={[styles.stepButton, { backgroundColor: colors.danger }]}
            onPress={() => setPeople(prev => (prev > 1 ? prev - 1 : 1))}
          >
            <Text style={styles.stepText}>-</Text>
          </TouchableOpacity>

          <Text style={[styles.peopleCount, { color: colors.text }]}>{people}</Text>

          <TouchableOpacity
            style={[styles.stepButton, { backgroundColor: colors.danger }]}
            onPress={() =>
              setPeople(prev => (prev < getMaxPeople() ? prev + 1 : prev))
            }
          >
            <Text style={styles.stepText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.maxInfo, { color: colors.subText }]}>Max allowed: {getMaxPeople()}</Text>

        <TouchableOpacity style={[styles.confirmButton, { backgroundColor: colors.danger }]} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  image: { width: '100%', height: 200, borderRadius: 12, marginBottom: 15 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, marginTop: 30, textAlign: 'center' },
  divider: { height: 2, marginBottom: 20, borderRadius: 1 },
  inputButton: { borderRadius: 10, padding: 14, marginBottom: 15, borderWidth: 1 },
  inputText: { fontSize: 16 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
  peopleContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10 },
  stepButton: { borderRadius: 30, paddingVertical: 10, paddingHorizontal: 20, marginHorizontal: 20 },
  stepText: { color: '#fff', fontSize: 22, fontWeight: '700' },
  peopleCount: { fontSize: 20, fontWeight: '700' },
  maxInfo: { textAlign: 'center', marginBottom: 20 },
  confirmButton: { paddingVertical: 14, borderRadius: 30, alignItems: 'center', marginTop: 10 },
  confirmButtonText: { color: '#fff', fontWeight: '700', fontSize: 18 },
});
