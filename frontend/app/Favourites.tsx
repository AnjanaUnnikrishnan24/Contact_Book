import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Contact = {
  _id: string;
  fullname: string;
  mobilePhone: string;
};

const Favourites = () => {
  const [favourites, setFavourites] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchFavourites = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://192.168.8.41:3000/contacts/favourites`);
      const data: Contact[] = await response.json();
      setFavourites(data);
    } catch (error) {
      console.error('Error fetching favourites:', error);
      setFavourites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (favourites.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Favourites</Text>
        <Text>No favourite contacts found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Favourites</Text>
      <FlatList
        data={favourites}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/ViewContact/${item._id}`)}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.fullname.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.name}>{item.fullname}</Text>
            <Ionicons name="star" size={20} color="#f1c40f" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fdfdfd',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 1,
  },
  avatar: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
  },
});

export default Favourites;
