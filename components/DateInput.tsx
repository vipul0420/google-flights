import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

interface Props {
  label: string;
  onChange: (formattedDate: string) => void;
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const DateInput: React.FC<Props> = ({ label, onChange }) => {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange = (_event: any, date?: Date) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
      const formatted = formatDate(date);
      onChange(formatted);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setShowPicker(true)}
    >
      <Ionicons name="calendar" size={18} color="#999" />
      <Text style={styles.label}>
        {selectedDate ? formatDate(selectedDate) : label}
      </Text>

      {showPicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          minimumDate={new Date()}
          onChange={handleChange}
        />
      )}
    </TouchableOpacity>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2a2b2f',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
  },
  label: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 14,
  },
});
