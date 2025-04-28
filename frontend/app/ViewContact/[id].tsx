import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
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
};

export default function ViewContact() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchContact = async () => {
    try {
      const response = await fetch(`http://192.168.90.41:3000/contacts/view/${id}`);
      const data = await response.json();
      setContact(data);
    } catch (error) {
      console.error('Error fetching contact:', error);
    } finally {
      setLoading(false);
    }
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
        <View style={{ width: 28 }} />
      </View>
      <View style={styles.infoContainer}>
        <DetailItem label="Full Name" value={contact.fullname} />
        <DetailItem label="Mobile Phone" value={contact.mobilePhone} />
        <DetailItem label="Landline" value={contact.lanPhone} />
        <DetailItem label="Email" value={contact.email} />
        <DetailItem label="Home Address" value={contact.homeAddress} />
        <DetailItem label="Date of Birth" value={formatDate(contact.dob)} />
        <DetailItem label="Group" value={contact.group} />
        <DetailItem label="Company" value={contact.company} />
        <DetailItem label="Work Address" value={contact.workAddress} />
        <DetailItem label="Job Title" value={contact.jobTitle} />
      </View>
    </ScrollView>
  );
}

function DetailItem({ label, value }: { label: string; value: any }) {
  if (!value) return null;
  return (
    <View style={styles.item}>
      <Text style={styles.label}>{label}</Text>
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
  container: { padding: 20, paddingBottom: 60, backgroundColor: '#fff', alignItems: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerText: { fontSize: 20, fontWeight: '600' },
  infoContainer: { width: '100%', marginTop: 10 },
  item: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '500', color: '#666', marginBottom: 4 },
  value: { fontSize: 16, fontWeight: '400', color: '#000', backgroundColor: '#f9f9f9', padding: 12, borderRadius: 8, borderColor: '#ddd', borderWidth: 1 },
  buttonContainer: { flexDirection: 'row', marginTop: 30, gap: 20 },
  editButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#4CAF50', padding: 12, borderRadius: 10, gap: 8 },
  deleteButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F44336', padding: 12, borderRadius: 10, gap: 8 },
  buttonText: { color: '#fff', fontWeight: '600' },
});
