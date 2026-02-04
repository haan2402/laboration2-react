import { useState } from "react"
import "./TodoForm.css"

//formulär för att skapa nya todos
export const TodoForm = ({todoCreated} : {todoCreated : Function}) => {

    //interface som beskriver hur data i formuläret ser ut
    interface TodoFormData {
        title: string,
        description: string,
        status: string
    }

    //interface för felhantering
    interface TodoFormError {
        title?: string,
        description?: string
    }

    //state som lagrar data från formuläret, samt array med olika alternativ för status
    const [formData, setFormData] = useState<TodoFormData>({title: "", description: "", status: "Ej påbörjad"});  
    const status = ["Ej påbörjad", "Pågående", "Avklarad"];                                                       

    //state för felhantering
    const [errors, setError] = useState<TodoFormError>({});                                                          

    //funktion för validering av titel och beskrivning
    const validateForm = ((data: TodoFormData) => {
        const validateError: TodoFormError = {};

        if(data.title.trim().length < 3) {
            validateError.title = "Titeln måste vara minst 3 tecken!";
        }

        if(data.description.trim().length > 200) {
            validateError.description = "Beskrivning får max vara 200 tecken!";
        }

        return validateError;
    })

    //funktion som körs när formulär skickas, förhindrar att sidan laddas om
    const formSubmit = async (event: any) => {
        event.preventDefault();

        const validateError = validateForm(formData);

        if(Object.keys(validateError).length > 0) {
            setError(validateError);
            return;
        } else {
            setError({});
        }

        //POST-anrop till backend för att skapa en ny todo
        try {
            const respone = await fetch("http://localhost:5000/todos/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if(respone.ok) {
                //uppdaterar listan med todos
                todoCreated();

                //rensar formuläret
                setFormData({title: "", description: "", status: "Ej påbörjad"});
            }
        } catch(error) {
            console.log("Gick inte att skapa en ny todo...", error);
        }
    }

    //formulär data skickas till backend API för att skapa en ny todo, valideringmeddelande för namn och beskrivning
  return (
    <form onSubmit={formSubmit} className="form-todo">
        <label htmlFor="title">Titel</label>
        <input type="text" name="title" id="title" value={formData.title} 
        onChange={(event) => setFormData({...formData, title: event.target.value})}/>

        {errors.title && <span>{errors.title}</span>}

        <br />
        <label htmlFor="description">Beskrivning</label>
        <input type="text" name="description" id="description" value={formData.description} 
        onChange={(event) => setFormData({...formData, description: event.target.value})} />

        {errors.description && <span>{errors.description}</span>}

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
