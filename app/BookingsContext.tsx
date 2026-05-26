// BookingsContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Booking = {
  title: string;
  category: string;
  date: string;
  time: string;
  people: number;
  image?: any;
};

type BookingsContextType = {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
};

const BookingsContext = createContext<BookingsContextType | undefined>(undefined);

export const BookingsProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const addBooking = (booking: Booking) => {
    setBookings(prev => [...prev, booking]);
  };

  return (
    <BookingsContext.Provider value={{ bookings, addBooking }}>
      {children}
    </BookingsContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingsContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingsProvider');
  }
  return context;
};
