import { useEffect, useState } from "react";
import { Character } from "../interfaces/Character";

type Data<T> = T | null;
type ErrorType = Error | null;

interface Params<T> {
    data: Data<T>;
    loading: boolean;
    error: Error | null;
}

export const useFetch = <T>(url: string): Params<T> => {
    const [data, setData] = useState<Data<T>>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<ErrorType>(null);

    useEffect(() => {

        const controller = new AbortController();


        setLoading(true);

        const fetchData = async () => {
            try {
                const response = await fetch(url, controller);

                if (!response.ok) {
                    throw new Error('Error en la petición');
                }

                const result = await response.json();

                const filteredData = result.items.map((character: Character) => ({
                    id: character.id,
                    name: character.name,
                    ki: character.ki,
                    image: character.image,
                }));

                setData(filteredData);
                setError(null);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();

        return () => {
            controller.abort();
        }

    }, [url]);

    return { data, loading, error };
}


