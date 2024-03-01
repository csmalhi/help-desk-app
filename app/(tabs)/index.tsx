import { StyleSheet } from 'react-native';

import NewTicketForm from '@/components/NewTicketForm';
import { Text, View } from '@/components/Themed';
import { Ticket } from '@/models/ticket';

export default function TabOneScreen() {
  const submitTicket = (ticket: Ticket) => {
    console.log('submitting', ticket)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit a ticket to help desk</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <NewTicketForm path="app/(tabs)/index.tsx" onSubmitForm={submitTicket} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
