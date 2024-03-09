import { Ticket } from '@/models/ticket';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function TicketDetails({ ticket, isAdmin }: { ticket: Ticket, isAdmin: boolean }) {
  return (
    <View style={styles.container}>
      {isAdmin && (
        <View>
          <View style={styles.details}>
            <Text variant="titleMedium">Name: </Text>
            <Text variant="bodyMedium">{ticket.name}</Text>
          </View>
          <View style={styles.details}>
            <Text variant="titleMedium">Email: </Text>
            <Text variant="bodyMedium">{ticket.email}</Text>
          </View>
        </View>
      )}
      <View style={styles.details}>
        <Text variant="titleMedium">Status: </Text>
        <Text variant="bodyMedium">{ticket.status}</Text>
      </View>
      <View style={styles.details}>
        <Text variant="titleMedium" style={styles.title}>Description: </Text>
        <Text variant="bodyMedium">{ticket.description}</Text>
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
  },
  details: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 5,
    flexWrap: 'wrap'
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
    marginVertical: 15,
    borderRadius: 5
  },
  title: {
    alignSelf: 'flex-start'
  }
});
