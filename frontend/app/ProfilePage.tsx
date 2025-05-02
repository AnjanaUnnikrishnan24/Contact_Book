import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddProfile = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="close" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity>
          <Ionicons name="checkmark" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile image */}
        <TouchableOpacity style={styles.avatarCircle}>
          <Ionicons name="add" size={40} color="#007bff" />
        </TouchableOpacity>

        {/* Input Fields */}
        <View style={styles.inputGroup}>
          <Ionicons name="person" size={20} color="#888" style={styles.icon} />
          <TextInput placeholder="Name" style={styles.input} />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="business" size={20} color="#888" style={styles.icon} />
          <TextInput placeholder="Company" style={styles.input} />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="medal-outline" size={20} color="#888" style={styles.icon} />
          <TextInput placeholder="Title" style={styles.input} />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="call" size={20} color="#888" style={styles.icon} />
          <TextInput placeholder="Phone" keyboardType="phone-pad" style={styles.input} />
        </View>

        {/* Label Selector */}
        <Text style={styles.label}>Label</Text>
        <View style={styles.inputGroup}>
          <TextInput placeholder="Phone" style={styles.input} />
          <Ionicons name="chevron-down" size={20} color="#888" />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="mail" size={20} color="#888" style={styles.icon} />
          <TextInput placeholder="Email" keyboardType="email-address" style={styles.input} />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddProfile;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderColor: '#ccc',
    marginBottom: 20,
    width: '100%',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    color: '#999',
  },
});
