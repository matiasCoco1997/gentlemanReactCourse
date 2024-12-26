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
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Hubo un error: {error}</p>;
  }

  return (
    <div className="container">
      <h1>Personajes</h1>
      <ul>
        {data.map((character) => (
          <li key={character.id}>
            <div>
              <img src={character.image} alt={character.name} />
            </div>
            <strong>Nombre:</strong> {character.name} <br />
            <strong>Ki:</strong> {character.ki}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
