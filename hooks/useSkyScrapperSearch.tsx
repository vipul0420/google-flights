import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_API_RAPID_KEY;

interface SearchFlightsParams {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string; // format: YYYY-MM-DD
  cabinClass?: 'economy' | 'premiumeconomy' | 'business' | 'first';
  adults?: number;
  sortBy?: 'best' | 'cheapest' | 'fastest';
  currency?: string;
  market?: string;
  countryCode?: string;
}

export const useSkyScrapperSearch = () => {
  const searchFlights = async ({
    originSkyId,
    destinationSkyId,
    originEntityId,
    destinationEntityId,
    date,
    cabinClass = 'economy',
    adults = 1,
    sortBy = 'best',
    currency = 'USD',
    market = 'en-US',
    countryCode = 'US',
  }: SearchFlightsParams) => {
    try {
      const response = await axios.get(
        'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights',
        {
          params: {
            originSkyId,
            destinationSkyId,
            originEntityId,
            destinationEntityId,
            date,
            cabinClass,
            adults,
            sortBy,
            currency,
            market,
            countryCode,
          },
          headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('SkyScrapper flight search error:', error?.response || error);
      throw error;
    }
  };

  return { searchFlights };
};
