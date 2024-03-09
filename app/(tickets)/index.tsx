import NewTicketForm from '@/components/NewTicketForm';
import { Alert, StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { Ticket } from '@/models/ticket';
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from '../../firebase'
import { router } from 'expo-router';

export default function NewTicketScreen() {
  const submitTicket = async (ticket: Partial<Ticket>) => {
    const doc = await addDoc(collection(db, `users/${auth.currentUser?.uid}/tickets`), ticket)
      .then((newTicket) => { 
        Alert.alert('Success submitting ticket')
        router.replace(`/(tickets)/${newTicket.id}`)
      })
      .catch(error => Alert.alert('error submitting ticket: ', error))
  }

  return (
    <View style={styles.container}>
      <NewTicketForm onSubmitForm={submitTicket} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
