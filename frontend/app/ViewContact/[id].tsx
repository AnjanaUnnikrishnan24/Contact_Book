import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image, Alert,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

type Contact = {
  _id: string;
  fullname: string;
  mobilePhone: string;
  lanPhone?: string;
  email?: string;
  homeAddress?: string;
  dob?: string;
  group?: string;
  company?: string;
  workAddress?: string;
  jobTitle?: string;
  image?: string;
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

        <Text style={styles.headerText}>Contact Details</Text>

        <View style={styles.iconActions}>
          <TouchableOpacity onPress={() => router.push(`/EditContact/${id}`)}>
            <Ionicons name="create-outline" size={24} color="#4CAF50" style={styles.actionIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Ionicons name="trash-outline" size={24} color="#F44336" style={styles.actionIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {contact.image && (
        <Image source={{ uri: contact.image }} style={styles.image} />
      )}

      <View style={styles.infoContainer}>
        <DetailItem icon="person-outline" label="Full Name" value={contact.fullname} />
        <DetailItem icon="call-outline" label="Mobile Phone" value={contact.mobilePhone} />
        <DetailItem icon="call-sharp" label="Landline" value={contact.lanPhone} />
        <DetailItem icon="mail-outline" label="Email" value={contact.email} />
        <DetailItem icon="home-outline" label="Home Address" value={contact.homeAddress} />
        <DetailItem icon="calendar-outline" label="Date of Birth" value={formatDate(contact.dob)} />
        <DetailItem icon="people-outline" label="Group" value={contact.group} />
        <DetailItem icon="business-outline" label="Company" value={contact.company} />
        <DetailItem icon="location-outline" label="Work Address" value={contact.workAddress} />
        <DetailItem icon="briefcase-outline" label="Job Title" value={contact.jobTitle} />
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
        <Ionicons name={icon} size={16} color="#666" style={styles.icon} />
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
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
  },
  iconActions: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  actionIcon: {
    marginLeft: 12,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    marginTop: 10,
  },
  item: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginRight: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
});
