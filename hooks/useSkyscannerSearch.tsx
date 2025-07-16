import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_API_RAPID_KEY;

export const useSkyscannerSearch = () => {
  const searchFlights = async ({
    from,
    to,
    departDate,
    returnDate,
  }: {
    from: string;
    to: string;
    departDate: string;
    returnDate?: string;
  }) => {
    try {
      const response = await axios.get(
        'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/IN/INR/en-US/',
        {
          params: {
            originPlace: `${from}-sky`,
            destinationPlace: `${to}-sky`,
            outboundDate: departDate,
            inboundDate: returnDate || undefined,
          },
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Flight search failed:', error);
      throw error;
    }
  };

  return { searchFlights };
};
