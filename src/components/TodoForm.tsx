import { useState } from "react"

//formulär för att skapa nya todos
export const TodoForm = ({todoCreated} : {todoCreated : Function}) => {

    //interface som beskriver hur data i formuläret ser ut
    interface TodoFormData {
        title: string,
        description: string,
        status: string
    }

    const [formData, setFormData] = useState<TodoFormData>({title: "", description: "", status: "Ej påbörjad"});  //state som lagrar data från formuläret
    const status = ["Ej påbörjad", "Pågående", "Avklarad"];                                                       //array med olika alternativ för status

    //funktion som körs när formulär skickas, förhindrar att sidan laddas om
    const formSubmit = ((event: any) => {
        event.preventDefault();
    });

    //formulär data skickas till backend API för att skapa en ny todo
  return (
    <form onSubmit={formSubmit}>
        <label htmlFor="title">Titel</label>
        <input type="text" name="title" id="title" value={formData.title} 
        onChange={(event) => setFormData({...formData, title: event.target.value})}/>
        <br />
        <label htmlFor="description">Beskrivning</label>
        <input type="text" name="description" id="description" value={formData.description} 
        onChange={(event) => setFormData({...formData, description: event.target.value})} />
        <br />
        <label htmlFor="status">Status: </label>
        <select name="status" id="status" value={formData.status} 
        onChange={(event) => setFormData({...formData, status: event.target.value})}>
            {
                status.map((status, index) => (
                    <option key={index}>{status}</option>
                ))
            }
        </select>
        <input type="submit" value="Lägg till" />
    </form>
  )
}
