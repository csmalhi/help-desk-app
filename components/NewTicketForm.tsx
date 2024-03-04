import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Ticket } from '@/models/ticket';
import ImagePicker from '@/components/ImagePicker';

export default function NewTicketForm({ onSubmitForm }: { onSubmitForm: (ticket: Partial<Ticket>) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState<string>(''); 
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const createTicket = (): Partial<Ticket> => {
    return {
      name,
      email,
      photo,
      description,
      status: 'new'
    };
  };

  const handleImageSelection = (uri: string | null) => {
    if (uri) {
      // should push to firebase storage
      setPhoto(uri);
    } else {
      console.warn('Image selection cancelled or failed');
    }
  };

  const submitTicket = () => {
    const ticket = createTicket();

    if (!name || !email || !description) {
      console.warn('Please fill in all required fields');
      return;
    }
    onSubmitForm(ticket)
    setSubmitted(!submitted);    
    setName('');
    setEmail('');
    setDescription('');
    setPhoto('')
  };

  return (
    <View style={styles.container}>
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
      <ImagePicker shouldReset={submitted} onImageSelected={handleImageSelection} />
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
    padding: 20,
    width: '100%'
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
