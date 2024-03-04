import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { Ticket } from '@/models/ticket';
import { router } from 'expo-router';
import { collection, collectionGroup, query, getDocs } from "firebase/firestore";
import { auth, db } from '../../firebase'
import { signOut } from 'firebase/auth';

export default function AdminTicketsScreen() {
  const [tickets, setTickets] = useState<any>([]);
  // pull list to refresh
  const [refreshing, setRefreshing] = useState(false);

  const navigate = (id: string, userId: string) => {
    router.push({
      pathname: `/(admin-tickets)/${id}`,
      params: {
        id,
        userId
      }
    })
  }

  const logout = () => {
    signOut(auth).then(() => {
      console.log("User signed out!")
      router.push({
        pathname: `/auth/sign-in`
      })
    });
  }

  const getTickets = async () => {
    const users = query(collectionGroup(db, 'users'));
    const userSnapshot = await getDocs(users);
    let ticketsResponse: any = []
    userSnapshot.forEach(async (user) => {
      const id = user.data().uid
      const q = collection(db, `users/${id}/tickets`)
      const querySnapshot = await getDocs(q)
      ticketsResponse.push(...querySnapshot.docs.map((d) => ({ id: d.id, userId: id, ...d.data() })))
      setTickets(ticketsResponse)
    });
  }

  useEffect(() => {
    getTickets()
  }, []);

  const renderItem = ({ item }: { item: Ticket }) => (
    <TouchableOpacity onPress={() => { navigate(item.id, item.userId ?? '') }}>
      <View style={styles.ticketItem}>
        <Text>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {refreshing ? <ActivityIndicator /> : null}
      <Text style={styles.title}>Admin Tickets</Text>
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
  },
});
