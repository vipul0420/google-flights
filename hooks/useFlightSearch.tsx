import { useState } from "react";
import { Alert } from "react-native";
import { useSkyScrapperSearch } from "./useSkyScrapperSearch"; // new API hook

export const useFlightSearch = () => {
  const [fromAirport, setFromAirport] = useState("");
  const [toAirport, setToAirport] = useState("");
  const [departureDate, setDepartureDate] = useState("Departure");
  const [returnDate, setReturnDate] = useState("Return");

  const [fromSkyId, setFromSkyId] = useState("");
  const [toSkyId, setToSkyId] = useState("");
  const [fromEntityId, setFromEntityId] = useState("");
  const [toEntityId, setToEntityId] = useState("");

  const { searchFlights } = useSkyScrapperSearch();

  const handleSwap = () => {
    setFromAirport(toAirport);
    setToAirport(fromAirport);
    setFromSkyId(toSkyId);
    setToSkyId(fromSkyId);
    setFromEntityId(toEntityId);
    setToEntityId(fromEntityId);
  };
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSearch = async () => {
    console.log(
      fromAirport,
      toAirport,
      fromSkyId,
      toSkyId,
      fromEntityId,
      toEntityId,
      departureDate,
      returnDate
    );
    if (
      !fromAirport ||
      !toAirport ||
      !fromSkyId ||
      !toSkyId ||
      !fromEntityId ||
      !toEntityId ||
      departureDate === "Departure"
    ) {
      Alert.alert("Missing fields", "Please fill all required fields.");
      return;
    }
    // try {
    //   const result = await searchFlights({
    //     originSkyId: fromSkyId,
    //     destinationSkyId: toSkyId,
    //     originEntityId: fromEntityId,
    //     destinationEntityId: toEntityId,
    //     date: departureDate, // must be formatted as YYYY-MM-DD
    //   });

    //   console.log('Flight search result:', result);
    //   // navigate to results screen or display results
    // } catch (err) {
    //   Alert.alert('Search failed', 'Could not fetch flight data.');
    // }
  };

  return {
    fromAirport,
    toAirport,
    departureDate,
    returnDate,
    fromSkyId,
    toSkyId,
    fromEntityId,
    toEntityId,
    setFromAirport,
    setToAirport,
    setDepartureDate,
    setReturnDate,
    setFromSkyId,
    setToSkyId,
    setFromEntityId,
    setToEntityId,
    handleSwap,
    handleSearch,
    formatDate
  };
};
