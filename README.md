innan start. installera: (npm install)

Våra lösenord, portnummer och den hemliga nycken ligger i en .env fil som dolts i gitignore. Lösenorden är hashade av säkerhetskäl.

Vi har skapat möjligheten för att endast admin ska ha tillgång till hemlig data på hemsidan. Annars kommer det upp ett felmeddelande (403)

Admin kan stanna på hemsidan i en timme innan man loggas ut.
alla andra kan bara stanna i 30 sekunder. 

Vi har använt en .json fil för att skapa vår fejkade databas där alla användare och lösenord finns. Den jämför från vår .env fil (inga lösenord eller användarnan står i klartext i vår databas)

Det används en jsonwebtoken (jwt) När vi loggar in skickas en post request till auth som skickar tillbaka en token till servern. Sedan skickas den token till backennd för att se om vi är admin eller annan som får tillgång till vår data. 

vi har installerat bcrypt för att hasha lösenorden och rainbow table attacker. 
Vi har installerat helmet och använt det i vår server.js för att unvika attacker så som cross site scripting tex (xss)