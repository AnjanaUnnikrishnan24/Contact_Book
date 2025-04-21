import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Contact = {
  _id: string;
  name: string;
  mobilePhone: string;
  email?: string;
};

const ContactsScreen = () => {
  const [contacts, setContacts] = useState<Contact[] | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://192.168.90.41:3000/contacts/all');
        setContacts(response.data || []);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setContacts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();  
  }, [router]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!contacts || contacts.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No contacts found.</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/NewContact')}>
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.mobilePhone}</Text>
            {item.email && <Text>{item.email}</Text>}
          </View>
        )}
      />

       <TouchableOpacity style={styles.fab} onPress={() => router.push('/NewContact')}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    elevation: 2,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#2196F3',
    borderRadius: 30,
    padding: 16,
    elevation: 5,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    borderRadius: 30,
    padding: 16,
  },
});

export default ContactsScreen;
