import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Contact = {
  _id: string;
  fullname: string;
  mobilePhone: string;
};

const ContactsScreen = () => {
  const [contacts, setContacts] = useState<Contact[] | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchContacts = async () => {
    try {
      const response = await fetch(`http://192.168.90.41:3000/contacts/all`);
      const data = await response.json();
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this contact?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const res = await fetch(`http://192.168.90.41:3000/contacts/delete/${id}`, {
                method: 'DELETE'
              });
              const result = await res.json();
              console.log('Deleted result:', result);
              fetchContacts();
            } catch (error) {
              console.error('Error deleting contact:', error);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
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
            <Text style={styles.name}>{item.fullname}</Text>
            <Text>{item.mobilePhone}</Text>
            <View style={styles.actionRow}>
              <TouchableOpacity onPress={() => router.push(`http://192.168.90.41:3000/contacts/update/${item._id}`)} style={styles.actionBtn}>
                <Ionicons name="create-outline" size={20} color="#4CAF50" />
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item._id)} style={styles.actionBtn}>
                <Ionicons name="trash-outline" size={20} color="#F44336" />
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
            </View>
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
  actionRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 15,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
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