import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { Ticket } from '@/models/ticket';
import { router } from 'expo-router';
import { collection, collectionGroup, query, getDocs } from "firebase/firestore";
import { db } from '../../firebase'

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
        <Text style={styles.ticketTitle}>{item.name}</Text>
        <Text style={styles.ticketDescription}>{item.description}</Text>
        <Text>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {refreshing ? <ActivityIndicator /> : null}
      <FlatList
        data={tickets}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getTickets} />
        }
        keyExtractor={(item, index) => (item.id ? item.id.toString() : `item-${index}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  ticketItem: {
    flex: 1,
    padding: 10,
    backgroundColor: "#e9e9e9",
    marginVertical: 5,
    justifyContent: "center",
    borderRadius: 5
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ticketDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});
