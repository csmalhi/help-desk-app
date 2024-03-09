import { FlatList, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { Ticket } from '@/models/ticket';
import { router } from 'expo-router';
import { collection, collectionGroup, query, getDocs } from "firebase/firestore";
import { db } from '../../firebase'
import { ActivityIndicator, Text } from 'react-native-paper';

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
    const ticketsResponse = [];
    const q = collection(db, `all-tickets`)
    const querySnapshot = await getDocs(q)
    ticketsResponse.push(...querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
    setTickets(ticketsResponse)
  }

  useEffect(() => {
    getTickets()
  }, []);

  const renderItem = ({ item }: { item: Ticket }) => (
    <TouchableOpacity onPress={() => { navigate(item.id, item.userId ?? '') }}>
      <View style={styles.item}>
        <Text variant="titleMedium">{item.name}</Text>
        <Text variant="bodyLarge">{item.description}</Text>
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
    paddingBottom: 0
  },
  item: {
    flex: 1,
    padding: 10,
    backgroundColor: "#e9e9e9",
    marginVertical: 5,
    justifyContent: "center",
    borderRadius: 5
  }
});
