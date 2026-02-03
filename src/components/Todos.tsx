import type Todo from "../interfaces/Todo";

export const Todos = ({todo, todoStatusUpdated} : {todo: Todo, todoStatusUpdated : Function}) => {

    //färg för status på en todo
    const colourStatus = todo.status === "Ej påbörjad" ? "red" : todo.status === "Pågående" ? "orange" : "green";

    //funktion som körs när man ändrar status på en todo
    const updateStatus = async (e : any) => {
        const newStatus = e.target.value;

        //skapar ett nytt objekt av en todo med uppdaterad status
        const newTodoStatus = {
            ...todo,
            status: newStatus
        }
        try {
            //PUT anrop för att uppdatera statusen på en todo
            const respone =await fetch("http://localhost:5000/todos/" + todo._id, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(newTodoStatus)
        })

        //om uppdateringen är ok, hämtas listan på nytt i App.tsx
        if(respone.ok) {
            todoStatusUpdated();
        }
        } catch (error) {
            console.log("Kunde inte uppdatera status....");
        }
    }

    //DELETE-anrop för att kunna radera en todo
    const deleteTodo = async () =>{
        try {
            const respone = await fetch("http://localhost:5000/todos/" + todo._id, {
                method: "DELETE",
        });

        //om uppdateringen är ok, hämtas listan på nytt i App.tsx
        if(respone.ok) {
            todoStatusUpdated();
        }

        } catch(error) {
            console.log("Det gick inte att radera todo..", error);
        }
    }

  return (
    <section>
        <h2>{todo.title}</h2>
        <p>{todo.description}</p>
        <p style={{color: colourStatus}}>{todo.status}</p>

        <form>
            <label htmlFor="status">Ändra status:</label>

            <select name="status" id="status" defaultValue={todo.status}
            onChange={updateStatus}>
                
            <option>Pågående</option>
            <option>Ej påbörjad</option>
            <option>Avklarad</option>
            </select>
        </form>

        <button onClick={deleteTodo}>Radera</button>
    </section>
  )
}
