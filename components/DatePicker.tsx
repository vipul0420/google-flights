import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  label: string;
}

const DatePicker: React.FC<Props> = ({ label }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="calendar" size={20} color="#999" />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e293b',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  text: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
});
