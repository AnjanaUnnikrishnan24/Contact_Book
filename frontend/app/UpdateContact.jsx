import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, TextInput, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

export default function UpdateContact() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [fullname, setFullName] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [lanPhone, setLanPhone] = useState("");
  const [email, setEmail] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [dob, setDob] = useState("");
  const [group, setGroup] = useState("");
  const [company, setCompany] = useState("");
  const [workAddress, setWorkAddress] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(`http://192.168.90.41:3000/contacts/view/${id}`);
        const data = await response.json();
        setFullName(data.fullname);
        setMobilePhone(data.mobilePhone);
        setLanPhone(data.lanPhone);
        setEmail(data.email);
        setHomeAddress(data.homeAddress);
        setDob(data.dob);
        setGroup(data.group);
        setCompany(data.company);
        setWorkAddress(data.workAddress);
        setJobTitle(data.jobTitle);
      } catch (error) {
        console.error("Failed to load contact", error);
      }
    };

    if (id) fetchContact();
  }, [id]);

  const handleUpdate = async () => {
    const updatedData = {
      fullname,
      mobilePhone,
      lanPhone,
      email,
      homeAddress,
      dob,
      group,
      company,
      workAddress,
      jobTitle
    };

    try {
      const res = await fetch(`http://192.168.90.41:3000/contact/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();
      alert("Contact updated successfully!");
      router.back();
    } catch (error) {
      console.error('Failed to update contact', error);
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
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} value={fullname} onChangeText={setFullName} />

        <Text style={styles.label}>Phone</Text>
        <TextInput style={styles.input} keyboardType="phone-pad" value={mobilePhone} onChangeText={setMobilePhone} />

        <Text style={styles.label}>Landline</Text>
        <TextInput style={styles.input} keyboardType="phone-pad" value={lanPhone} onChangeText={setLanPhone} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} keyboardType="email-address" value={email} onChangeText={setEmail} />

        <Text style={styles.label}>Home Address</Text>
        <TextInput style={styles.input} value={homeAddress} onChangeText={setHomeAddress} />

        <Text style={styles.label}>Date of Birth</Text>
        <TextInput style={styles.input} placeholder="YYYY-MM-DD" value={dob} onChangeText={setDob} />

        <Text style={styles.label}>Group</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={group} onValueChange={setGroup}>
            <Picker.Item label="Select Group" value="" />
            <Picker.Item label="Friends" value="Friends" />
            <Picker.Item label="Family" value="Family" />
            <Picker.Item label="Work" value="Work" />
            <Picker.Item label="Others" value="Others" />
          </Picker>
        </View>

        <Text style={styles.label}>Company</Text>
        <TextInput style={styles.input} value={company} onChangeText={setCompany} />

        <Text style={styles.label}>Work Address</Text>
        <TextInput style={styles.input} value={workAddress} onChangeText={setWorkAddress} />

        <Text style={styles.label}>Job Title</Text>
        <TextInput style={styles.input} value={jobTitle} onChangeText={setJobTitle} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerText: { fontSize: 20, fontWeight: '600' },
  inputContainer: { marginTop: 10 },
  label: { fontSize: 14, fontWeight: '500', marginBottom: 6, marginTop: 16 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#f9f9f9' },
  pickerContainer: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, backgroundColor: '#f9f9f9', overflow: 'hidden' },
});
