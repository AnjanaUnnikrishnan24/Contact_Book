// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   TouchableOpacity,
//   SectionList,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { useFocusEffect } from '@react-navigation/native';

// type Contact = {
//   _id: string;
//   fullname: string;
//   mobilePhone: string;
// };

// type Section = {
//   title: string;
//   data: Contact[];
// };

// const ContactsScreen = () => {
//   const [sections, setSections] = useState<Section[]>([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   const fetchContacts = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`http://192.168.8.41:3000/contacts/all`);
//       const data: Contact[] = await response.json();

//       const grouped: Record<string, Contact[]> = {};
//       (data || []).forEach((contact) => {
//         const letter = contact.fullname.charAt(0).toUpperCase();
//         if (!grouped[letter]) grouped[letter] = [];
//         grouped[letter].push(contact);
//       });

//       const sortedSections: Section[] = Object.keys(grouped)
//         .sort()
//         .map((letter) => ({
//           title: letter,
//           data: grouped[letter].sort((a, b) =>
//             a.fullname.localeCompare(b.fullname)
//           ),
//         }));

//       setSections(sortedSections);
//     } catch (error) {
//       console.error('Error fetching contacts:', error);
//       setSections([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useFocusEffect(
//     React.useCallback(() => {
//       fetchContacts();
//     }, [])
//   );

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (!sections || sections.length === 0) {
//     return (
//       <View style={styles.center}>
//         <Text>No contacts found.</Text>
//         <TouchableOpacity
//           style={styles.addButton}
//           onPress={() => router.push('/NewContact')}
//         >
//           <Ionicons name="add" size={28} color="#fff" />
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       {/* Header cards - only Groups and Favourites */}
//       <View style={styles.cardRow}>
//         <TouchableOpacity style={styles.headerCard} onPress={() => router.push('/GroupScreen')}>
//           <Ionicons name="people-outline" size={30} color="#2196F3" />
//           <Text style={styles.cardLabel}>Groups</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.headerCard} onPress={() => router.push('/Favourites')}>
//           <Ionicons name="star-outline" size={30} color="#2196F3" />
//           <Text style={styles.cardLabel}>Favourites</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Section list */}
//       <SectionList
//         sections={sections}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.card}
//             onPress={() => router.push(`/ViewContact/${item._id}`)}
//           >
//             <View style={styles.avatar}>
//               <Text style={styles.avatarText}>
//                 {item.fullname.charAt(0).toUpperCase()}
//               </Text>
//             </View>
//             <Text style={styles.name}>{item.fullname}</Text>
//           </TouchableOpacity>
//         )}
//         renderSectionHeader={({ section: { title } }) => (
//           <Text style={styles.sectionHeader}>{title}</Text>
//         )}
//       />

//       {/* FAB */}
//       <TouchableOpacity
//         style={styles.fab}
//         onPress={() => router.push('/NewContact')}
//       >
//         <Ionicons name="add" size={30} color="#fff" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   sectionHeader: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     backgroundColor: '#eee',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//   },
//   card: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f9f9f9',
//     padding: 15,
//     marginHorizontal: 10,
//     marginVertical: 5,
//     borderRadius: 10,
//     elevation: 1,
//   },
//   avatar: {
//     backgroundColor: '#2196F3',
//     borderRadius: 20,
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   avatarText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   name: {
//     fontSize: 16,
//   },
//   fab: {
//     position: 'absolute',
//     right: 20,
//     bottom: 30,
//     backgroundColor: '#2196F3',
//     borderRadius: 30,
//     padding: 16,
//     elevation: 5,
//   },
//   addButton: {
//     marginTop: 20,
//     backgroundColor: '#2196F3',
//     borderRadius: 30,
//     padding: 16,
//   },
//   cardRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     margin: 10,
//   },
//   headerCard: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#f1f9ff',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 10,
//     elevation: 2,
//     width: '40%',
//   },
//   cardLabel: {
//     marginTop: 6,
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#333',
//   },
// });

// export default ContactsScreen;


import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  SectionList,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

type Contact = {
  _id: string;
  fullname: string;
  mobilePhone: string;
};

type Section = {
  title: string;
  data: Contact[];
};

const ContactsScreen = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const fetchContacts = async (query = '') => {
    try {
      setLoading(true);
      const endpoint = query
        ? `http://192.168.8.41:3000/contacts/search?query=${encodeURIComponent(query)}`
        : `http://192.168.8.41:3000/contacts/all`;
      const response = await fetch(endpoint);
      const data: Contact[] = await response.json();

      const grouped: Record<string, Contact[]> = {};
      (data || []).forEach((contact) => {
        const letter = contact.fullname.charAt(0).toUpperCase();
        if (!grouped[letter]) grouped[letter] = [];
        grouped[letter].push(contact);
      });

      const sortedSections: Section[] = Object.keys(grouped)
        .sort()
        .map((letter) => ({
          title: letter,
          data: grouped[letter].sort((a, b) =>
            a.fullname.localeCompare(b.fullname)
          ),
        }));

      setSections(sortedSections);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setSections([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchContacts();
    }, [])
  );

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    fetchContacts(text.trim());
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!sections || sections.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No contacts found.</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/NewContact')}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
       <Text style={styles.pageTitle}>All Contacts</Text>

       <View style={styles.cardRow}>
        <TouchableOpacity style={styles.headerCard} onPress={() => router.push('/GroupScreen')}>
          <Ionicons name="people-outline" size={30} color="#2196F3" />
          <Text style={styles.cardLabel}>Groups</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerCard} onPress={() => router.push('/Favourites')}>
          <Ionicons name="star-outline" size={30} color="#2196F3" />
          <Text style={styles.cardLabel}>Favourites</Text>
        </TouchableOpacity>
      </View>

       <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts..."
          value={searchText}
          onChangeText={handleSearchChange}
        />
      </View>

      <SectionList
        sections={sections}
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
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
 
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/NewContact')}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginHorizontal: 16,
    color: '#333',
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#eee',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
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
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#2196F3',
    borderRadius: 30,
    padding: 16,
    elevation: 5,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    borderRadius: 30,
    padding: 16,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10,
  },
  headerCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f9ff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    elevation: 2,
    width: '40%',
  },
  cardLabel: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6e6e6',  
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,  
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
});

export default ContactsScreen;
