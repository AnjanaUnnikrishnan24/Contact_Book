import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ContactDetails() {
  const router = useRouter();
  const {
    _id,
    fullname,
    mobilePhone,
    lanPhone,
    email,
    homeAddress,
    dob,
    group,
    company,
    workAddress,
    jobTitle,
    image,
  } = useLocalSearchParams();

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
              const response = await fetch(`http://localhost:3000/contacts/delete/${_id}`, {
                method: 'DELETE',
              });

              if (response.ok) {
                Alert.alert('Deleted', 'Contact deleted successfully.');
                router.replace('/'); // Adjust to your main screen
              } else {
                const result = await response.json();
                Alert.alert('Error', result.message || 'Failed to delete contact.');
              }
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'Something went wrong.');
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    router.push({
      pathname: '/NewContact',
      params: {
        _id,
        fullname,
        mobilePhone,
        lanPhone,
        email,
        homeAddress,
        dob,
        group,
        company,
        workAddress,
        jobTitle,
        image,
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Contact Details</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Profile Image */}
      {image ? (
        <Image
          source={{ uri: image.startsWith('http') ? image : `http://localhost:3000/uploads/${image}` }}
          style={styles.image}
        />
      ) : (
        <Ionicons name="person-circle-outline" size={100} color="#ccc" style={styles.image} />
      )}

      {/* Info Display */}
      <View style={styles.infoContainer}>
        <DetailItem label="Full Name" value={fullname} />
        <DetailItem label="Mobile Phone" value={mobilePhone} />
        <DetailItem label="Landline" value={lanPhone} />
        <DetailItem label="Email" value={email} />
        <DetailItem label="Home Address" value={homeAddress} />
        <DetailItem label="Date of Birth" value={formatDate(dob)} />
        <DetailItem label="Group" value={group} />
        <DetailItem label="Company" value={company} />
        <DetailItem label="Work Address" value={workAddress} />
        <DetailItem label="Job Title" value={jobTitle} />
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Ionicons name="pencil-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
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
  container: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: '#fff',
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    marginTop: 10,
  },
  item: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 4,
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
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 20,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    gap: 8,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F44336',
    padding: 12,
    borderRadius: 10,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
