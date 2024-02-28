import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { FlatList, Image, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import ImagePicker from '@/components/ImagePicker';

type Status = 'new' | 'in progress' | 'resolved';

interface Ticket {
  id: number;
  name: string;
  email: string;
  description: string;
  photo?: string;
  status: Status;
}


export default function TabTwoScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState<string>(''); 
  const [description, setDescription] = useState('');
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const submitTicket = () => {
    const newTicket: Ticket = {
      id: Date.now(),
      name,
      email,
      photo,
      description,
      status: 'new',
    };
    setTickets([...tickets, newTicket]);
    setName('');
    setEmail('');
    setPhoto('');
    setDescription('');
    console.log('Would normally send email here with body:', newTicket);
  };

  const handleImageSelection = (uri: string | null) => {
    if (uri) {
      setPhoto(uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a new ticket</Text>
      <Text></Text>
      {/* <EditScreenInfo path="app/(tabs)/two.tsx" /> */}
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
        style={styles.textarea}
      />
      <ImagePicker onImageSelected={handleImageSelection} />
      <TouchableOpacity onPress={submitTicket} style={styles.button}>
        <Text style={{ color: '#fff' }}>Submit Ticket</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    width: '100%',
    borderRadius: 5
  },
  textarea: { 
    borderWidth: 1,
    padding: 10,
    minHeight: 100,
    marginVertical: 10,
    width: '100%',
    borderRadius: 5
  },
  button: {
    backgroundColor: '#007bff',
    padding: 20,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 80
  }
});
