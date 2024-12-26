import { useEffect, useState } from "react";
import { Character } from "./Interfaces/Character";
import "./App.css";

function App() {
  const [data, setData] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://dragonball-api.com/api/characters?limit=9"
      );

      if (!response.ok) {
        throw new Error("Error al obtener personajes");
      }

      const result = await response.json();

      const filteredData = result.items.map((character: Character) => ({
        id: character.id,
        name: character.name,
        ki: character.ki,
        image: character.image,
      }));

      setData(filteredData);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    setTimeout(() => {
      return <p>Cargando...</p>;
    }, 3000);
  }

  if (error) {
    return <p>Hubo un error: {error}</p>;
  }

  return (
    <div className="min-h-[100vh] flex flex-col items-center">
      <h1 className="font-bold text-2xl pb-4 text-center p-5 w-full">
        Personajes
      </h1>
      <ul className="p-5 w-[80%] flex-grow">
        {data.map((character) => (
          <li key={character.id} className="shadow-lg">
            <div className="flex items-center justify-center">
              <img src={character.image} alt={character.name} />
            </div>
            <strong className="pl-5">Nombre:</strong> {character.name} <br />
            <strong className="pl-5">Ki:</strong> {character.ki}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
