
import { Link, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { db } from '../../firebase'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Ticket } from '@/models/ticket';
import TicketDetails from '@/components/TicketDetails';
import { Button, TextInput, Text, Banner } from 'react-native-paper';

export default function TicketDetailsScreen() {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [value, setValue] = useState('');;
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const params = useLocalSearchParams();
  const [visible, setVisible] = useState(false);
  const { id, userId } = params;

  const getTicket = async () => {
    const ticketResponse = await getDoc(doc(db, `users/${userId}/tickets/${id}`))
    setTicket(ticketResponse.data() as Ticket)
  }

  useEffect(() => {
    getTicket()
  }, [])

  if (!ticket) {
    return (
      <View style={styles.container}>
        <Text>Loading ticket id: {id}</Text>
      </View>
    );
  }

  const data = [{ value: 'new' }, { value: 'in progress' }, { value: 'resolved' }];
    
  const onSendEmail = async () => {
    setVisible(true)
    console.log(`Would normally send email here with body: Subject: ${subject} * Body: ${body} * Email: ${ticket.email}`)
  }

  const onUpdateStatus = async () => {
    let updatedTicket = { ...ticket, status: value }
    const document = await setDoc(doc(db, `users/${userId}/tickets/${id}`), updatedTicket)
      .then(() => {
        console.log('Success updating resource')
        getTicket()
      })
      .catch(error => console.log('error updating resource: ', error))
  }

  return (
    <ScrollView style={styles.container}>
      <TicketDetails ticket={ticket} isAdmin={true} />
      <View style={styles.actions}>
        <Text variant="titleMedium">Update Status</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderWidth: 2, borderColor: '#8f70cf' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="value"
          valueField="value"
          placeholder={!isFocus ? 'Select status' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
        <Button mode="contained" onPress={onUpdateStatus} style={styles.button}>
          Update Status
        </Button>
        <Text variant="titleMedium">Send Email</Text>
        <TextInput
          label="Subject"
          mode="outlined"
          value={subject}
          onChangeText={setSubject}
          style={styles.input}
        />
        <TextInput
          label="Body"
          mode="outlined"
          value={body}
          onChangeText={setBody}
          multiline
          style={styles.textarea}
        />
        <Button mode="contained" onPress={onSendEmail} style={styles.button}>
          Send Email
        </Button>
      </View>
      <Banner
        visible={visible}
        actions={[
          {
            label: 'Ok',
            onPress: () => setVisible(false),
          },
        ]}
      >
        Would normally send email here with body: Subject: {subject} * Body: {body} * Email: {ticket.email}
      </Banner>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginTop: 20,
    marginBottom: 40
  },
  input: {
    marginVertical: 10,
  },
  textarea: {
    marginVertical: 10,
  },
  dropdown: {
    height: 50,
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginTop: 10,
    backgroundColor: 'white'
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#666'
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  actions: {
    marginBottom: 60,
    marginTop: 20
  }
});
