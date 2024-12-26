import "./App.css";
import { Character } from "./interfaces/Character";
import { useFetch } from "./hooks";

const url = "https://dragonball-api.com/api/characters?limit=9";

function App() {
  const { data, loading, error } = useFetch<Character[]>(url);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Hubo un error: {error.message}</p>;
  }

  return (
    <div className="min-h-[100vh] flex flex-col items-center">
      <h1 className="font-bold text-2xl pb-4 text-center p-5 w-full">
        Personajes
      </h1>
      <ul className="p-5 w-[80%] flex-grow">
        {data!.map((character) => (
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
