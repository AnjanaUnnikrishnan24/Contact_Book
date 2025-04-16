import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Contact = {
  _id: string;
  fullname: string;
  image?: string;
};

export default function ContactsScreen() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [groupedContacts, setGroupedContacts] = useState<{ [key: string]: Contact[] }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(`http://localhost:3000/contacts/all`);
      const data = await response.json();

      const sorted = data.sort((a: Contact, b: Contact) =>
        a.fullname.localeCompare(b.fullname)
      );

      const grouped: { [key: string]: Contact[] } = {};
      sorted.forEach((contact: Contact) => {
        const firstLetter = contact.fullname[0].toUpperCase();
        if (!grouped[firstLetter]) {
          grouped[firstLetter] = [];
        }
        grouped[firstLetter].push(contact);
      });

      setContacts(sorted);
      setGroupedContacts(grouped);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Contacts</Text>
        <View style={styles.icons}>
          <MaterialIcons name="check-box" size={24} color="black" />
          <Ionicons name="search" size={24} color="black" style={styles.iconSpacing} />
        </View>
      </View>

      {/* Loading Spinner */}
      {loading ? (
        <ActivityIndicator size="large" color="#4285F4" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView style={styles.contactsList}>
          {Object.keys(groupedContacts).map((letter) => (
            <View key={letter}>
              <Text style={styles.alphaHeader}>{letter}</Text>
              {groupedContacts[letter].map((contact) => (
                <TouchableOpacity
                  key={contact._id}
                  style={styles.contactItem}
                  onPress={() => router.push(`http://localhost:3000/contacts/${contact._id}`)} 
                >
                  {contact.image ? (
                    <Image
                      source={{ uri: `http://localhost:3000/uploads/${contact.image}` }}
                      style={styles.avatar}
                    />
                  ) : (
                    <View style={styles.avatarPlaceholder}>
                      <Text style={styles.avatarText}>
                        {contact.fullname.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                  )}
                  <Text style={styles.contactName}>{contact.fullname}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
      )}

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/NewContact')}>
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 10 },
  title: { fontSize: 26, fontWeight: 'bold' },
  icons: { flexDirection: 'row', alignItems: 'center' },
  iconSpacing: { marginLeft: 16 },
  contactsList: { paddingHorizontal: 16 },
  alphaHeader: { fontSize: 14, color: '#888', marginTop: 10, marginBottom: 5 },
  contactItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  avatarPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f28b82', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  contactName: { fontSize: 16 },
  fab: { position: 'absolute', bottom: 30, right: 30, backgroundColor: '#4285F4', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 5 },
});
