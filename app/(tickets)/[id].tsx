import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link, useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../../firebase'
import { Ticket } from '@/models/ticket';
import TicketDetails from '@/components/TicketDetails';

export default function TicketDetailsScreen() {
  const params = useLocalSearchParams();
  const {id} = params;
  const [ticket, setTicket] = useState<Ticket | null>(null);
  
  // get the ticket from firebase on init using ticket id from params
  const getTicket = async () => {
    const ticketResponse = await getDoc(doc(db, `users/${auth.currentUser?.uid}/tickets/${id}`))
    setTicket(ticketResponse.data() as Ticket)
  }
  
  useEffect(() => {
    getTicket()
  }, [])
  
  if (!ticket) {
    return (
      <View style={styles.container}>
        <Text>Loading ticket details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Link href="/(tickets)/my-tickets">Back</Link>
      <TicketDetails ticket={ticket} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
