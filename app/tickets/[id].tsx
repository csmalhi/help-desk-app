import { Ticket } from '@/models/ticket';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { doc, getDoc } from "firebase/firestore";
import {auth, db} from '../../firebase'
import { Link, useLocalSearchParams } from "expo-router";

export default function TicketDetailsScreen() {
  const params = useLocalSearchParams();
  const {id} = params;
  const [ticket, setTicket] = useState<any | null>(null);
  
  const getTicket = async () => {
    const ticketResponse = await getDoc(doc(db, `users/${auth.currentUser?.uid}/tickets/${id}`))
    setTicket(ticketResponse.data())
    console.log(auth.currentUser)
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
      <Link href="/tickets/my-tickets">Back</Link>
      <Text style={styles.title}>Ticket Details</Text>
      <View style={styles.details}>
        <Text style={styles.detailLabel}>ID:</Text>
        <Text style={styles.detailValue}>{ticket.id}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.detailLabel}>Name:</Text>
        <Text style={styles.detailValue}>{ticket.name}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.detailLabel}>Email:</Text>
        <Text style={styles.detailValue}>{ticket.email}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.detailLabel}>Description:</Text>
        <Text style={styles.detailValue}>{ticket.description}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.detailLabel}>Status:</Text>
        <Text style={styles.detailValue}>{ticket.status}</Text>
      </View>
      {ticket.photo && (
        <Image source={{ uri: ticket.photo }} style={styles.image} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  details: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: 'bold',
    width: 100,
  },
  detailValue: {
    flex: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
    marginVertical: 15,
  },
});
