import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  const extra = Constants.expoConfig?.extra;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚗 Welcome to Qpark</Text>
      <Text style={styles.label}>DB_HOST: {extra?.DB_HOST}</Text>
      <Text style={styles.label}>DB_NAME: {extra?.DB_NAME}</Text>
      <Text style={styles.label}>ENVIRONMENT: Development</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 10
  }
});