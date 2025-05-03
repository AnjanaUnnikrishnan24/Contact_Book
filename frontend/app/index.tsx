import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const LandingScreen = () => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handlePress = () => {
    if (!isNavigating) {
      setIsNavigating(true);  
      router.push("/ContactsScreen");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/ContactsScreen");  
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.touchableContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Contact Book</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbfd',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1e293b',
  },
  touchableContainer: {
    alignItems: 'center',
  },
});
