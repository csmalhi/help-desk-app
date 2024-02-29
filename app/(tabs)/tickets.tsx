import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { Ticket } from '@/models/ticket';

export default function TicketsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tickets</Text>
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
  }
});
