import axios from 'axios';
import { useRef, useState } from 'react';

const API_KEY = process.env.EXPO_PUBLIC_API_RAPID_KEY;

interface AirportResult {
    title: string;          
    skyId: string;          
    entityId: string;       
  }

export const useCitySearch = () => {
    const [results, setResults] = useState<AirportResult[]>([]);
    const [loading, setLoading] = useState(false);
    const debounceTimeout = useRef<number | null>(null);

    const searchCity = async (query: string) => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        if (!query || query.length < 2) {
            setResults([]);
            return;
        }
        debounceTimeout.current = setTimeout(async () => {
            try {
                setLoading(true);
                await axios.get(
                    'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport',
                    {
                      params: { query, locale: 'en-US' },
                      headers: {
                        'x-rapidapi-key': API_KEY,
                        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
                      },
                    }
                  ).then((response) => {
                      const data = response?.data?.data?.map((item: any) => ({
                        title: item.presentation.title,
                        skyId: item.navigation.skyId,
                        entityId: item.navigation.entityId,
                      }));
                      console.log(JSON.stringify(data),'response')
                    setResults(data);
                });
            } catch (err) {
                console.error('City search failed', err);
            } finally {
                setLoading(false);
            }
        }, 100)

    };

    return { results, searchCity, loading };
};
