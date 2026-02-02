import { useState, useEffect } from "react"
import type Todo from "./interfaces/Todo"

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);           //state som lagrar listan med todos
  const [loading, setLoading] = useState<boolean>(false);   //state för att visa laddningsmeddelanden
  const [error, setError] = useState<string | null>(null);  //state för felhantering vid API-anrop

  //körs vid första rendering, hämtar todos från API
  useEffect(() => {
    getTodos();
  }, []);

  //funktion för att hämta todos från API
  const getTodos = async () => {
    try {
      setLoading(true); //startar indikator för laddning
      setError(null);   //nollställer tidigare felmeddelanden

      //GET-anrop till backend API
      const response = await fetch("http://localhost:5000/todos");

      //kontroll om anrop är ok
      if(response.ok) {
        const data = await response.json();
        setTodos(data);
      }

    } catch(error) {
      setError("Något gick fel vid hämtning av todos, försök igen senare!")
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <main>
    <h1>Att göra-lista</h1>
    {error && <p>{error}</p>}
    {loading && <p>Laddar in data...</p>}
    </main>
    </>
  )
}

export default App
