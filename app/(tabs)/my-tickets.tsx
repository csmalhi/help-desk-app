import { FlatList, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { Ticket } from '@/models/ticket';
import { Link } from 'expo-router';

export default function TicketsScreen() {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: '1',
      name: 'John Doey',
      email: 'john.doe@example.com',
      description: 'This is a sample ticket description for ticket 1.',
      photo: 'https://via.placeholder.com/150',
      status: 'new',
    },
    {
      id: '2',
      name: 'Jane Smithy',
      email: 'jane.smith@example.com',
      description: 'This is a sample ticket description for ticket 2.',
      photo: '',
      status: 'in progress',
    },
  ]);

  const renderItem = ({ item }: { item: Ticket }) => (
    <Link href="/ticket-details">
      <View style={styles.ticketItem}>
        <Text>{item.name}</Text>
        <Text>{item.description}</Text>
      </View>
    </Link>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tickets</Text>
      <FlatList
        data={tickets}
        renderItem={renderItem}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : `item-${index}`)}
      />
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
  ticketItem: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 15,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ticketDescription: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});
