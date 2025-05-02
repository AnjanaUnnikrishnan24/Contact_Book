import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,} from 'react-native';

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
            <Text style={styles.groupText}>{group}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.contactsContainer}>
        {contacts.map((contact: any) => (
          <View key={contact._id} style={styles.contactCard}>
            {contact.image && (
              <Image
                source={{ uri: `http://192.168.8.41:3000/uploads/${contact.image}` }}
                style={styles.avatar}
              />
            )}
            <View>
              <Text style={styles.contactName}>{contact.fullname}</Text>
              <Text style={styles.contactPhone}>{contact.mobilePhone}</Text>
            </View>
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  groupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  groupButton: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  activeGroup: {
    backgroundColor: '#6a5acd',
  },
  groupText: {
    color: '#000',
    fontWeight: 'bold',
  },
  contactsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 25,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
  },
  contactPhone: {
    fontSize: 14,
    color: '#555',
  },
});
