import { useState } from "react";
import "./App.css";
import { Button } from "./components";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Matias");

  const countMore = () => {
    setCount((count) => count + 1);
  };

  const changeName = () => {
    setName((name) => "Ariel");
  };

  return (
    <>
      <Button label={`Sumar contador = ${count}`} parentMethod={countMore} />
      <p>{name}</p>
      <Button label="Cambiar Nombre" parentMethod={changeName} />
    </>
  );
}

export default App;
