# Laboration 2 - Att göra lista
Detta är en enkel applikation för en **Att göra-lista** byggd med **React** och **TypeScript**. Applikationen använder sig av ett externt API för att hämta, skapa nya, uppdatera status och ta bort todos.

## Funktioner 
Dessa funktioner finns med i denna applikation:
- Visa alla todos i en lista
- Skapa en ny todo via ett formulär
- Ändra status på en todo (Ej påbörjad, Pågående & Avklarad)
- Radera en todo
- Responsiv design

## Tekniker
Följande tekniker används för denna uppgift:
- React
- TypeScript
- CSS
- Fetch API

## Validering
Validering av data sker både i frontend och backend.

I frontend kontrolleras följande i formuläret innan en ny todo kan skickas till API:et:
- Titeln måste bestå av minst 3 tecken.
- Beskrivning kan max vara 200 tecken.

Om valideringen misslyckas så visas ett felmeddelande i formuläret med direkt feedback till användaren. 

## useEffect
``useEffect`` används för att hämta todos från API:et när applikationen laddas.

Detta gör att listan automatiskt kan uppdatera:
- när sidan laddas
- efter en todo har skapats
- efter en todo status har ändrats
- efter en todo har raderats

### Backend
Applikationen behöver att backend API kör på ``http://localhost:5000/todos``

### Av
Hanna Angeria, haan2402@student.miun.se

