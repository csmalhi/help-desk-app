
import { Link, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { db } from '../../firebase'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Ticket } from '@/models/ticket';
import TicketDetails from '@/components/TicketDetails';

export default function TicketDetailsScreen() {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [value, setValue] = useState('');;
  const [isFocus, setIsFocus] = useState(false);
  const params = useLocalSearchParams();
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
        <Link href="/(admin-tickets)/">Back</Link>
        <Text>Loading ticket id: {id}</Text>
      </View>
    );
  }

  const data = [{ value: 'new' }, { value: 'in progress' }, { value: 'resolved' }];

  const onSendEmail = () => {
    Alert.alert('Would normally send email here with body:')
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
      <Link href="/(admin-tickets)/">Back</Link>
      <View>
        <Text style={styles.detailLabel}>Update Status</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="value"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
        <TouchableOpacity onPress={onUpdateStatus} style={styles.button}>
          <Text style={styles.detailLabel}>Update Status</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSendEmail} style={styles.button}>
          <Text>Send Email</Text>
        </TouchableOpacity>
      </View>
      <TicketDetails ticket={ticket} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  detailLabel: {
    fontWeight: 'bold',
    width: 100,
  },
  button: {
    backgroundColor: '#29f',
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
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
});
