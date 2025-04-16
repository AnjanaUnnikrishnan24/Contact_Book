import React, { useState } from 'react';
import { Alert, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

export default function NewContact() {
  const router = useRouter();

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
  const [image, setImage] = useState("");

  const handleSubmit = async () => {
    const contactDetails = {
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
    };

    try {
      const response = await fetch("http://192.168.1.8:3000/contacts/add", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contactDetails)
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        Alert.alert("Success", data.message || "Contact added successfully!");
        setFullName("");
        setMobilePhone("");
        setLanPhone("");
        setEmail("");
        setHomeAddress("");
        setDob("");
        setGroup("");
        setCompany("");
        setWorkAddress("");
        setJobTitle("");
        setImage("");
        router.push("/");
      } else {
        Alert.alert("Error", "Failed to Submit Contact");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>New contact</Text>
        <TouchableOpacity onPress={handleSubmit}>
          <Ionicons name="checkmark" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Form Inputs */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} placeholder="Full Name"  value={fullname} onChangeText={setFullName}  />

        <Text style={styles.label}>Phone</Text>
        <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" value={mobilePhone} onChangeText={setMobilePhone}/>

        <Text style={styles.label}>Landline</Text>
        <TextInput style={styles.input} placeholder="Landline Number" keyboardType="phone-pad" value={lanPhone} onChangeText={setLanPhone} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="Email Address" keyboardType="email-address" value={email} onChangeText={setEmail} />

        <Text style={styles.label}>Home Address</Text>
        <TextInput style={styles.input} placeholder="Home Address" value={homeAddress} onChangeText={setHomeAddress}  />

        <Text style={styles.label}>Date of Birth</Text>
        <TextInput style={styles.input} placeholder="YYYY-MM-DD" value={dob} onChangeText={setDob} />

        <Text style={styles.label}>Group</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={group} onValueChange={(value) => setGroup(value)} >
            <Picker.Item label="Select Group" value="" />
            <Picker.Item label="Friends" value="Friends" />
            <Picker.Item label="Family" value="Family" />
            <Picker.Item label="Work" value="Work" />
            <Picker.Item label="Others" value="Others" />
          </Picker>
        </View>

        <Text style={styles.label}>Company</Text>
        <TextInput style={styles.input} placeholder="Company Name" value={company} onChangeText={setCompany} />

        <Text style={styles.label}>Work Address</Text>
        <TextInput  style={styles.input}  placeholder="Company Address"  value={workAddress}  onChangeText={setWorkAddress}  />

        <Text style={styles.label}>Job Title</Text>
        <TextInput style={styles.input} placeholder="Job Title" value={jobTitle} onChangeText={setJobTitle} />

        <Text style={styles.label}>Image URL</Text>
        <TextInput  style={styles.input}  placeholder="Image URL"  value={image}  onChangeText={setImage} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
  },
  inputContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    marginTop: 16,
  },
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
  },
});
