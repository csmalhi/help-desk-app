import { FlatList, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { Ticket } from '@/models/ticket';
import { router } from 'expo-router';
import { getDocs, collection } from "firebase/firestore";
import { auth, db } from '../../firebase'
import { ActivityIndicator, Text } from 'react-native-paper';

export default function MyTicketsScreen() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  // pull the list to refresh
  const [refreshing, setRefreshing] = useState(false);

  const navigate = (id: any) => {
    router.push({
      pathname: `/(tickets)/${id}`,
      params: {
        id
      }
    })
  }

  const getTickets = async () => {
    let userId = auth?.currentUser?.uid;
    const q = collection(db, `users/${userId}/tickets`)
    const querySnapshot = await getDocs(q)
    const ticketsResponse = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    setTickets(ticketsResponse as Ticket[]);
  }

  useEffect(() => {
    getTickets();
  }, []);

  const renderItem = ({ item }: { item: Ticket }) => (
    <TouchableOpacity onPress={() => { navigate(item.id) }}>
      <View style={styles.item}>
        <Text variant="titleMedium">{item.description}</Text>
        <Text variant="bodySmall">{item.status}</Text>
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
    paddingBottom: 0
  },
  item: {
    flex: 1,
    padding: 10,
    backgroundColor: "#e9e9e9",
    marginVertical: 5,
    justifyContent: "center",
    borderRadius: 5
  },
});
