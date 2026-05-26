import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useBookings } from './BookingsContext';

export default function BookingHistoryScreen() {
  const { bookings } = useBookings();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking History</Text>
      {bookings.length === 0 ? (
        <Text style={styles.empty}>No bookings yet.</Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item.image && <Image source={item.image} style={styles.image} />}
              <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.details}>
                  {item.date} at {item.time} — {item.people} people
                </Text>
                <Text style={styles.category}>{item.category}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF6EC', padding: 20 },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1E3D59',
  },
  empty: { textAlign: 'center', color: '#576e85', marginTop: 50 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    padding: 10,
    alignItems: 'center',
  },
  image: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  info: { flex: 1 },
  title: { fontSize: 18, fontWeight: '700', color: '#1E3D59' },
  details: { fontSize: 14, color: '#576e85', marginTop: 4 },
  category: { fontSize: 12, color: '#00A49B', marginTop: 2 },
});
