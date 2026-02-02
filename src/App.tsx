import { useState, useEffect } from "react"
import type Todo from "./interfaces/Todo"

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
    <main>
    <h1>Att göra-lista</h1>

    </main>
    </>
  )
}

export default App
