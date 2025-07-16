import { useState } from 'react';
import { Alert } from 'react-native';
import { useCitySearch } from './useCitySearch';
import { useSkyscannerSearch } from './useSkyScannerSearch';

export const useFlightSearch = () => {
  const [fromAirport, setFromAirport] = useState('Kanpur');
  const [toAirport, setToAirport] = useState('');
  const [departureDate, setDepartureDate] = useState('Departure');
  const [returnDate, setReturnDate] = useState('Return');
  const {results, searchCity} = useCitySearch();
  const { searchFlights } = useSkyscannerSearch();


  const handleSwap = () => {
    const temp = fromAirport;
    setFromAirport(toAirport);
    setToAirport(temp);
  };

  const handleSearch = () => {
    if (!fromAirport || !toAirport || departureDate === 'Departure') {
      Alert.alert('Missing fields', 'Please fill From, To, and Departure.');
      return;
    }
    searchCity('kanpur')
    // Alert.alert(
    //   'Searching Flights',
    //   `From: ${fromAirport}\nTo: ${toAirport}\nDepart: ${departureDate}\nReturn: ${returnDate || 'N/A'}`
    // );
  };

  return {
    fromAirport,
    toAirport,
    departureDate,
    returnDate,
    setFromAirport,
    setToAirport,
    setDepartureDate,
    setReturnDate,
    handleSwap,
    handleSearch,
  };
};
