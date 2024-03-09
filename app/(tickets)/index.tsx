import NewTicketForm from '@/components/NewTicketForm';
import { Alert, StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { Ticket } from '@/models/ticket';
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from '../../firebase'
import { Banner } from 'react-native-paper';
import { useState } from 'react';

export default function NewTicketScreen() {
  const [visible, setVisible] = useState(false);

  const submitTicket = async (ticket: Partial<Ticket>) => {
    const doc = await addDoc(collection(db, `users/${auth.currentUser?.uid}/tickets`), ticket)
      .then((newTicket) => {
        setVisible(true)
        console.log('successfully submitted ticket')
      })
      .catch(error => Alert.alert('error submitting ticket: ', error))
  }

  return (
    <View style={styles.container}>
      <NewTicketForm onSubmitForm={submitTicket} />
      <Banner
      visible={visible}
      actions={[
        {
          label: 'Ok',
          onPress: () => setVisible(false),
        },
      ]}
    >
      Successfully submitted ticket
    </Banner>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80
  }
});
