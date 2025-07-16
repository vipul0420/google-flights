import DateInput from '@/components/DateInput';
import AirportInput from '@/components/input';
import { useFlightSearch } from '@/hooks/useFlightSearch';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FlightSearchScreen: React.FC = () => {
    const {
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
      } = useFlightSearch();

      
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Flights</Text>
            </View>

            <View style={styles.swapContainer}>
                <AirportInput
                    placeholder="From"
                    value={fromAirport}
                    onChangeText={setFromAirport}
                />
                <TouchableOpacity onPress={handleSwap} style={styles.swapButton}>
                    <Ionicons name="swap-vertical" size={20} color="#007aff" />
                </TouchableOpacity>
                <AirportInput
                    placeholder="To"
                    value={toAirport}
                    onChangeText={setToAirport}
                />
            </View>

            <View style={styles.dateRow}>
                <DateInput label="Departure" onChange={setDepartureDate} />
                <View style={{ width: 12 }} />
                <DateInput label="Return" onChange={setReturnDate} />

            </View>

            {/* <PassengerClassSelector /> */}

            <TouchableOpacity style={styles.exploreButton} onPress={handleSearch}>
                <Ionicons name="search" size={18} color="#fff" />
                <Text style={styles.exploreText}>Explore</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FlightSearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1b1c1f',
        padding: 20,
        paddingTop: 60,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    swapContainer: {
        position: 'relative',
        marginBottom: 12,
        gap: 10,
        zIndex: 1,
    },
    swapButton: {
        position: 'absolute',
        right: 16,
        top: 58,
        zIndex: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 6,
        elevation: 3,
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    exploreButton: {
        flexDirection: 'row',
        backgroundColor: '#007aff',
        paddingVertical: 14,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    exploreText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 8,
        fontWeight: '600',
    },
});