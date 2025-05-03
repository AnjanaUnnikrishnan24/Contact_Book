import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, TextInput, View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

export default function EditContact() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [fullname, setFullName] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [email, setEmail] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [dob, setDob] = useState("");
  const [group, setGroup] = useState("Others");
  const [company, setCompany] = useState("");
  const [workAddress, setWorkAddress] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(`http://192.168.8.41:3000/contacts/view/${id}`);
        const data = await response.json();
        setFullName(data.fullname || "");
        setMobilePhone(data.mobilePhone?.toString() || "");
        setEmail(data.email || "");
        setHomeAddress(data.homeAddress || "");
        setDob(data.dob ? new Date(data.dob).toISOString().split("T")[0] : "");
        setGroup(data.group || "Others");
        setCompany(data.company || "");
        setWorkAddress(data.workAddress || "");
        setJobTitle(data.jobTitle || "");
        setIsFavorite(data.isFavorite || false);
      } catch (error) {
        console.error("Failed to load contact", error);
      }
    };

    if (id) fetchContact();
  }, [id]);

  const handleUpdate = async () => {
    const updatedData = {
      fullname,
      mobilePhone: Number(mobilePhone),
      email,
      homeAddress,
      dob,
      group,
      company,
      workAddress,
      jobTitle,
      isFavorite
    };

    try {
      const res = await fetch(`http://192.168.8.41:3000/contacts/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update");

      alert("Contact updated successfully!");
      router.back();
    } catch (error) {
      console.error('Failed to update contact', error);
      alert("Update failed. Please check your inputs.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Update Contact</Text>
        <TouchableOpacity onPress={handleUpdate}>
          <Ionicons name="checkmark" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.labelWithIcon}>
          <Ionicons name="person-outline" size={18} color="#444" />
          <Text style={styles.label}>Full Name</Text>
        </View>
        <TextInput style={styles.input} value={fullname} onChangeText={setFullName} />

        <View style={styles.labelWithIcon}>
          <Ionicons name="call-outline" size={18} color="#444" />
          <Text style={styles.label}>Contact Number</Text>
        </View>
        <TextInput style={styles.input} keyboardType="numeric" value={mobilePhone} onChangeText={setMobilePhone} />

        <View style={styles.labelWithIcon}>
          <Ionicons name="mail-outline" size={18} color="#444" />
          <Text style={styles.label}>Email</Text>
        </View>
        <TextInput style={styles.input} keyboardType="email-address" value={email} onChangeText={setEmail} />

        <View style={styles.labelWithIcon}>
          <Ionicons name="home-outline" size={18} color="#444" />
          <Text style={styles.label}>Home Address</Text>
        </View>
        <TextInput style={styles.input} value={homeAddress} onChangeText={setHomeAddress} />

        <View style={styles.labelWithIcon}>
          <Ionicons name="calendar-outline" size={18} color="#444" />
          <Text style={styles.label}>Date of Birth</Text>
        </View>
        <TextInput style={styles.input} placeholder="YYYY-MM-DD" value={dob} onChangeText={setDob} />

        <View style={styles.labelWithIcon}>
          <Ionicons name="people-outline" size={18} color="#444" />
          <Text style={styles.label}>Group</Text>
        </View>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={group} onValueChange={setGroup}>
            <Picker.Item label="Select Group" value="" />
            <Picker.Item label="Friends" value="Friends" />
            <Picker.Item label="Family" value="Family" />
            <Picker.Item label="Work" value="Work" />
            <Picker.Item label="Others" value="Others" />
          </Picker>
        </View>

        <View style={styles.labelWithIcon}>
          <Ionicons name="business-outline" size={18} color="#444" />
          <Text style={styles.label}>Company</Text>
        </View>
        <TextInput style={styles.input} value={company} onChangeText={setCompany} />

        <View style={styles.labelWithIcon}>
          <Ionicons name="location-outline" size={18} color="#444" />
          <Text style={styles.label}>Work Address</Text>
        </View>
        <TextInput style={styles.input} value={workAddress} onChangeText={setWorkAddress} />

        <View style={styles.labelWithIcon}>
          <Ionicons name="briefcase-outline" size={18} color="#444" />
          <Text style={styles.label}>Job Title</Text>
        </View>
        <TextInput style={styles.input} value={jobTitle} onChangeText={setJobTitle} />

        <View style={styles.favoriteContainer}>
          <View style={styles.labelWithIcon}>
            <Ionicons name="star-outline" size={18} color="#444" />
            <Text style={styles.label}>Favorite</Text>
          </View>
          <Switch value={isFavorite} onValueChange={setIsFavorite} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerText: { fontSize: 20, fontWeight: '600' },
  inputContainer: { marginTop: 10 },
  label: { fontSize: 14, fontWeight: '500', color: '#444' },
  labelWithIcon: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
    marginTop: 6,
  },
  favoriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
