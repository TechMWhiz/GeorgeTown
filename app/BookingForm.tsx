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

type BookingRouteProp = RouteProp<RootStackParamList, 'BookingForm'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'BookingForm'>;

export default function BookingForm({ route }: { route?: BookingRouteProp }) {
  const navigation = useNavigation<NavigationProp>();

  // ✅ Safe fallback for item
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

    // Save booking into context
    const { addBooking } = useBookings();
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
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Book {item.title}</Text>
        <View style={styles.divider} />

        {item.image && (
          <Image source={item.image} style={styles.image} resizeMode="cover" />
        )}

        {/* Date Picker */}
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.inputText}>
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
          style={styles.inputButton}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.inputText}>
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
        <Text style={styles.label}>Number of People</Text>
        <View style={styles.peopleContainer}>
          <TouchableOpacity
            style={styles.stepButton}
            onPress={() => setPeople(prev => (prev > 1 ? prev - 1 : 1))}
          >
            <Text style={styles.stepText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.peopleCount}>{people}</Text>

          <TouchableOpacity
            style={styles.stepButton}
            onPress={() =>
              setPeople(prev => (prev < getMaxPeople() ? prev + 1 : prev))
            }
          >
            <Text style={styles.stepText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.maxInfo}>Max allowed: {getMaxPeople()}</Text>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF6EC', padding: 20 },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 30,
    textAlign: 'center',
    color: '#1E3D59',
  },
  divider: {
    height: 2,
    backgroundColor: '#576e85',
    marginBottom: 20,
    borderRadius: 1,
  },
  inputButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputText: { fontSize: 16, color: '#333' },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#1E3D59',
  },
  peopleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  stepButton: {
    backgroundColor: '#EB3349',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
  },
  stepText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  peopleCount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E3D59',
  },
  maxInfo: {
    textAlign: 'center',
    color: '#576e85',
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#EB3349',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});
