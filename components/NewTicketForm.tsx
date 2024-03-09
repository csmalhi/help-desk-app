import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { Ticket } from '@/models/ticket';
import ImagePicker from '@/components/ImagePicker';
import { TextInput, Button } from 'react-native-paper';

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
      label="Name"
      value={name}
      mode="outlined"
      onChangeText={setName}
      style={styles.input}
    />
      <TextInput
      label="Email"
      value={email}
      mode="outlined"
      onChangeText={setEmail}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        multiline
        style={styles.textarea}
      />
      <ImagePicker shouldReset={submitted} onImageSelected={handleImageSelection} />
      <Button mode="contained" onPress={submitTicket} style={styles.button}>
        <Text style={{ color: '#fff' }}>Submit Ticket</Text>
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginVertical: 10,
  },
  textarea: { 
    marginVertical: 10,
    width: '100%',
  },
  button: {
    marginTop: 20
  },
});
