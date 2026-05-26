import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useBookings } from './BookingsContext';
import { useTheme } from './ThemeContext'; 
import { lightTheme, darkTheme } from './themeColors'; 

export default function BookingHistoryScreen() {
  const { bookings } = useBookings();
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Booking History</Text>
      {bookings.length === 0 ? (
        <Text style={[styles.empty, { color: colors.subText }]}>No bookings yet.</Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              {item.image && <Image source={item.image} style={styles.image} />}
              <View style={styles.info}>
                <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.details, { color: colors.subText }]}>
                  {item.date} at {item.time} — {item.people} people
                </Text>
                <Text style={[styles.category, { color: colors.accent }]}>{item.category}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  empty: { textAlign: 'center', marginTop: 50 },
  card: { flexDirection: 'row', borderRadius: 12, marginBottom: 15, padding: 10, alignItems: 'center' },
  image: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  info: { flex: 1 },
  title: { fontSize: 18, fontWeight: '700' },
  details: { fontSize: 14, marginTop: 4 },
  category: { fontSize: 12, marginTop: 2 },
});
