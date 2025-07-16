import axios from 'axios';
import { useRef, useState } from 'react';

const API_KEY = process.env.EXPO_PUBLIC_API_RAPID_KEY;

export const useCitySearch = () => {
    const [results, setResults] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

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
                    'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
                    {
                        params: { namePrefix: query, limit: 5 },
                        headers: {
                            'X-RapidAPI-Key': API_KEY,
                            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
                        },
                    }
                ).then((response) => {
                    const cityNames = response?.data?.data?.map((city: any) => `${city.city}, ${city.country}`);
                    setResults(cityNames);
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
