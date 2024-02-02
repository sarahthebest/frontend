# FWK23S_SKI_Backend

- innan start. installera: (npm install)

- Våra lösenord, portnummer och den hemliga nycken ligger i en .env fil som dolts i gitignore. Lösenorden är hashade av säkerhetskäl.

- Vi har skapat möjligheten för att endast admin ska ha tillgång till hemlig data på hemsidan. Annars kommer det upp ett felmeddelande (403)

##   localStrage
lagra JWT i localStorage
Sårbarheter: LocalStorage är mottagligt för vissa typer av attacker, såsom cross-site scripting (XSS). 
Vi sparar inte lösenord i JWT.
Genom att använda Helmetsom hjälper till att minska risken för vissa typer av attacker, inklusive XSS 

##   Request med JWT
Frontend skickar JWT med varje request till backend för att verifiera användarens identitet och behörighet.

##  Hur server kommunicerar varandra med JWT
1. Frontend skickar credential (e-mail, lösenord) till Auth 
2. Auth kollar på inlogning uppgifter i users.json.Loggin Lyckas.
3. Auth utfäder JWT med SECRET_KEY och skicka de till Frontend
4. Frontend sparar JWT i LocalStrage.
5. Frontend Skickar request med JWT i header till Backend -> headers: { Authorization: `Bearer ${token}` }
6. Backend verify JWT och
7. Backend kollar på rollen, admin eller user i payload
8. Backend skickar respons till Frontend
