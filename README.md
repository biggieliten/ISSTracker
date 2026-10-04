# ISSTracker

En simpel React Native-app där du i realtid kan följa ISS (International Space Station) samt kunna se nästa förutspådda tid den komma flyga över din nuvarande position. I appen finns även en kompass som är riktad mot ISS för att enklare kunna bedöma var den befinner sig i himlen, samet en "visibility circle" runt den på kartan som visar när den för dig är ovanför horisonten. Det finns även mörkt och ljust tema, val mellan det metriska och imperiska måttsystemet.
I appen kan vi även se vilka astronauter som förnärvarande är i rymden, samt kunna se statistik om deras karriär och läsa biografi. Det finns även länkar till deras sociala medier och Wikipedia-sida.

## Så bygger och kör du projektet

1. Klona projektet

   ```bash
   git clone https://github.com/biggieliten/ISSTracker.git
   cd ISSTracker
   ```

2. Installera beroenden

   ```bash
   npm install
   ```

3. Skapa en `.env`-fil i projektets rot

   ```
   EXPO_PUBLIC_CARTO_API_KEY=<din-nyckel>
   ```

För att kunna hämta map layets från carto apiet.

4. Starta utvecklingsservern

   ```bash
   npx expo start
   ```

5. Ladda appen i Expo Go

   Starta Expo Go-appen och scanna QR-koden eller tryck på ISSTracker under "Development servers". När appen har laddat behöver du godkänna behörigheter för telefonens position.

## Använda RN-komponenter

- `View` - Används genom hela appen för att kapsal in, positionera och styra utseende på komponenter och sektioner på olika sidor.
- `Text` - Används genom hela appen för att lägga till text. Motsvarigheten till en p-tagg i html.
- `Image` - Image-taggen används för bilderna på astronauterna. I astronaut-row och i den sidan med dynamisk parameter under home/astronaut.
- `Pressable` - Pressable används till allt som behöver en klickfunktion. Bland annat i settings där vi väljer tema eller måttsystem, men även ligger innehållet i astronaut-row wrappat i en Pressable.
- `ScrollView` - Scrollview används på alla sidor förutom kartsidan för att ge möjlighet att scrolla när innehållet behöver mer utrymme.
- `Switch` - Switch-taggen används för att välja mellan två lägen på en inställning, t.ex i kartan där du kan välja att följa ISS eller på inställningssidan där du kan slå av och på visibility circle runt ISS.
- `ActivityIndicator` - Detta är en "snurra" som jag använder i samband med att vi för en fetch, så istället för att visa en tom sida renderar vi in denna.

## Använda Expo SDK-moduler

- `expo-location` - Expo location använder jag för att begära åtkomst till enheten samt hålla appen uppdaterad om dess position medan den är igång. Location används i hooken "useGetLocation" som i sin tur används för att få ut enhetens position på kartan.
- `expo-sensors` - Läser telefonens magnetometer för att räkna ut vilket håll telefonen pekar, så att kompasspilen på kartan alltid pekar mot ISS. Används i
- `expo-asset` - Expo Asset används för att kunna ladda filer i telefonen via "Asset"-funktionen. Asset används ihop med Require() vilket endast ger en referens till filen och inte filen själv, så vad Asset gör är att den kan ta emot referensen och spara filen i telefonen. Detta behövs för att vi skall kunna ladda in leaflet kartan som är en html-fil.
- `expo-file-system` - Expo file system används ihop med expo asset. När vi sparat html-filen med Assetfunktionen kan vi läsa in den som en sträng via readAsStringAsync() och passa den vidare till html propertyn i kartelementet.
- `expo-web-browser` - Expo web browser används för att öppna upp länkar som finns i astronautsidan som en webläsare inuti appen.

## Externa moduler

- `react-native-leaflet-view` - Används för min kartvy där du kan följa ISS i realtid.

## Användning av AI-verktyg

**Verktyg:** Claude Code

**Vad de användes till:** Jag har använt Claude Code på flera vis. Initialt använde jag den mest för att få hjälp när jag fastnade på saker där jag inte kunde få hjälp via dokumentation. Halvvägs in i projektet började jag använda AI mer för att skriva koden åt mig och att jag verifierade den efteråt. Ett exempel var när jag bad Claude skapa klart astronautsidan där den fick för sig att det vore ballt att lägga till mer info och statistik om astronauterna som mitt valda API inte kunde tillhandahålla och vill därför göra ännu en request mot ett annat API. Det ville inte jag och istället pekade jag han i rätt riktning igen.

**Hur jag verifierat koden:** Jag har börjat med kika igenom koden så att allt ser rimligt ut och att den inte skapat något som inte passar in. Sedan har jag verifierat att allt fungerar som den tänkt i appen. Och ifall jag stött på något som sett lite märkligt ut (vilket jag inte gjrot än) har jag dubbelkollat i dokumentation.

## Uppfyllda krav

### Godkänt (G)

- [x] Projektet använder minst **4 RN-komponenter** och minst **4 moduler från Expo SDK**
- [x] De använda komponenterna och modulerna är **antecknade i README.md**, tillsammans med en lista över uppfyllda krav
- [x] **Expo Router** används för navigering i appen, och minst en skärm tar emot en parameter
- [x] **Git och GitHub** har använts, med commits spridda över arbetets gång
- [x] Projektmappen innehåller en **README.md** enligt beskrivningen
- [x] Uppgiften är **inlämnad i tid**
- [x] **Muntlig presentation** är genomförd

### Väl godkänt (VG)

- [x] Alla punkter för godkänt är uppfyllda
- [x] **Ytterligare en valfri extern modul** används i projektet från [reactnative.directory](https://reactnative.directory)
- [x] Appen **hämtar data från ett Web-API**
- [x] **Användningen av AI-verktyg dokumenteras i README**
