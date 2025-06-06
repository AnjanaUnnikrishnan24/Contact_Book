import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

type Contact = {
  _id: string;
  fullname: string;
  mobilePhone: number;
  email?: string;
  homeAddress?: string;
  dob?: string;
  group: 'Family' | 'Friends' | 'Work' | 'Others';
  company?: string;
  workAddress?: string;
  jobTitle?: string;
  isFavorite: boolean;
};

export default function ViewContact() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchContact = async () => {
    try {
      const response = await fetch(`http://192.168.8.41:3000/contacts/view/${id}`);
      const data = await response.json();
      setContact(data);
    } catch (error) {
      console.error('Error fetching contact:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to delete this contact?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await fetch(`http://192.168.8.41:3000/contacts/delete/${id}`, {
                method: 'DELETE',
              });
              router.back();
            } catch (error) {
              console.error('Error deleting contact:', error);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchContact();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!contact) {
    return (
      <View style={styles.center}>
        <Text>Contact not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <View style={styles.iconActions}>
          <TouchableOpacity onPress={() => router.push(`/EditContact/${id}`)}>
            <Ionicons name="create-outline" size={24} color="#4CAF50" style={styles.actionIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Ionicons name="trash-outline" size={24} color="#F44336" style={styles.actionIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.nameHeading}>{contact.fullname}</Text>

      <View style={styles.infoContainer}>
        <DetailItem icon="call-outline" label="Mobile Phone" value={String(contact.mobilePhone)} />
        <DetailItem icon="mail-outline" label="Email" value={contact.email} />
        <DetailItem icon="home-outline" label="Home Address" value={contact.homeAddress} />
        <DetailItem icon="calendar-outline" label="Date of Birth" value={formatDate(contact.dob)} />
        <DetailItem icon="people-outline" label="Group" value={contact.group} />
        <DetailItem icon="business-outline" label="Company" value={contact.company} />
        <DetailItem icon="location-outline" label="Work Address" value={contact.workAddress} />
        <DetailItem icon="briefcase-outline" label="Job Title" value={contact.jobTitle} />
        <DetailItem icon="star-outline" label="Favorite" value={contact.isFavorite ? 'Yes' : 'No'} />
      </View>
    </ScrollView>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
}) {
  if (!value) return null;
  return (
    <View style={styles.item}>
      <View style={styles.labelRow}>
        <Ionicons name={icon} size={18} color="#666" style={styles.icon} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

function formatDate(dateStr: any) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString();
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    height:'100%',
    paddingTop: 16,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  nameHeading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  iconActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionIcon: {
    padding: 6,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  infoContainer: {
    marginTop: 10,
  },
  item: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 12,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    marginRight: 6,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  value: {
    fontSize: 17,
    color: '#333',
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 4,
  },
});
