import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { Ticket } from '@/models/ticket';
import { router } from 'expo-router';
import { getDocs, collection } from "firebase/firestore";
import { auth, db } from '../../firebase'
import { signOut } from 'firebase/auth';

export default function MyTicketsScreen() {
  const [tickets, setTickets] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);

  const navigate = (id: any) => {
    router.push({
      pathname: `/tickets/${id}`,
      params: {
        id
      }
    })
  }

  const logout = () => {
    signOut(auth).then(() => {
      console.log("User signed out!")
      router.push({
        pathname: `/sign-in`
      })
    });
  }

  const getTickets = async () => {
    let userId = auth?.currentUser?.uid;
    const q = collection(db, `users/${userId}/tickets`)
    const querySnapshot = await getDocs(q)
    const ticketsResponse = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    setTickets(ticketsResponse);
    console.log('got it', ticketsResponse, tickets)
  }

  useEffect(() => {
    getTickets();
  }, []);

  const renderItem = ({ item }: { item: Ticket }) => (
    <TouchableOpacity onPress={() => { navigate(item.id) }}>
      <View style={styles.ticketItem}>
        <Text>{item.name}</Text>
        <Text>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {refreshing ? <ActivityIndicator /> : null}
      <Text style={styles.title}>My Tickets</Text>
      <FlatList
        data={tickets}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getTickets} />
        }
        keyExtractor={(item, index) => (item.id ? item.id.toString() : `item-${index}`)}
      />
      <TouchableOpacity onPress={logout} >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  ticketItem: {
    padding: 15,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ticketDescription: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  }
});
