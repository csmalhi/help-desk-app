import { Ticket } from '@/models/ticket';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function TicketDetails({ ticket, isAdmin }: { ticket: Ticket, isAdmin: boolean }) {
  return (
    <View style={styles.container}>
      {isAdmin && (
        <View>
          <View style={styles.details}>
            <Text style={styles.detailLabel}>Name:</Text>
            <Text style={styles.detailValue}>{ticket.name}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailLabel}>Email:</Text>
            <Text style={styles.detailValue}>{ticket.email}</Text>
          </View>
        </View>
      )}
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
    borderRadius: 5
  },
});
