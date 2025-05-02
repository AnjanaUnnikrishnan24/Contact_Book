import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const GROUPS = ['Family', 'Friends', 'Work', 'Others'];

const GroupScreen = () => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [contacts, setContacts] = useState([]);

  const fetchGroupContacts = async (groupName: string) => {
    try {
      setSelectedGroup(groupName);
      const response = await fetch(`http://192.168.8.41:3000/contacts/group/${groupName}`);
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Groups</Text>

      <View style={styles.groupContainer}>
        {GROUPS.map((group) => (
          <TouchableOpacity
            key={group}
            style={[
              styles.groupButton,
              selectedGroup === group && styles.activeGroup,
            ]}
            onPress={() => fetchGroupContacts(group)}
          >
            <Text
              style={[
                styles.groupText,
                selectedGroup === group && styles.activeGroupText,
              ]}
            >
              {group}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.contactsContainer}>
        {contacts.map((contact: any) => (
          <View key={contact._id} style={styles.contactCard}>
            <Text style={styles.contactName}>{contact.fullname}</Text>
            <Text style={styles.contactPhone}>{contact.mobilePhone}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default GroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
    color: '#333',
  },
  groupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  groupButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  activeGroup: {
    backgroundColor: '#6a5acd',
  },
  groupText: {
    color: '#333',
    fontWeight: '600',
  },
  activeGroupText: {
    color: '#fff',
  },
  contactsContainer: {
    paddingBottom: 20,
  },
  contactCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  contactPhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
