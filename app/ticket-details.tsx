import { Ticket } from '@/models/ticket';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface TicketDetailsScreenParamList {
  TicketDetails: { ticketId: string };
}

export default function TicketDetailsScreen({
  route,
}: { route: any }) {
  // const { ticketId } = route?.params;

  const [ticket, setTicket] = useState<Ticket | null>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    description: 'This is a sample ticket description for ticket 1.',
    photo: 'https://via.placeholder.com/150',
    status: 'new',
  });

  if (!ticket) {
    // Handle loading state or display an error message if fetching fails
    return (
      <View style={styles.container}>
        <Text>Loading ticket details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
