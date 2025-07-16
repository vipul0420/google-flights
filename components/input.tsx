import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCitySearch } from '../hooks/useCitySearch';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const AirportInput: React.FC<Props> = ({ placeholder, value, onChangeText }) => {
  const [isFocused, setIsFocused] = useState(false);
  const { results, searchCity, loading } = useCitySearch();

  const handleSelectCity = (city: string) => {
    onChangeText(city);
    setIsFocused(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Ionicons name="airplane" size={20} color="#999" />
        <TextInput
          value={value}
          onChangeText={(text) => {
            onChangeText(text);
            searchCity(text);
          }}
          placeholder={placeholder}
          placeholderTextColor="#ccc"
          style={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)} // allow touch to register
        />
      </View>

      {isFocused && results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(item, index) => index.toString()}
          style={styles.dropdown}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectCity(item)}>
              <Text style={styles.dropdownItem}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default AirportInput;

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    zIndex: 2,
  },
  container: {
    backgroundColor: '#2a2b2f',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
  },
  input: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  dropdown: {
    backgroundColor: '#1e1f23',
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 150,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    color: '#fff',
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
});
