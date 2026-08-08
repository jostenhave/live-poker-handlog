# AI-testinstructies – Live Poker Handlog v2.6 RC4a

## Testobject

- `Live_Poker_Handlog_v2.6_RC4a.html`
- `CHANGELOG_Live_Poker_Handlog_v2.6_RC4a.md`

## Testdoel

Voer eerst een technische heracceptatie van de RC4-startupblokkade uit. Voer alleen wanneer die slaagt de functionele RC4-regressietest uit.

RC4a is een technische herstelrelease. Beoordeel of alle RC4-functionaliteit behouden is en of geen nieuwe regressies zijn ontstaan.

---

## 1. Verplichte startup-smoketest

Open het HTML-bestand in een echte browserruntime en controleer:

1. De applicatie toont een zichtbare startinterface.
2. `#app` is niet leeg.
3. De titel **Live Poker Handlog** is zichtbaar.
4. De knoppen **Nieuwe sessie**, **Spelersbibliotheek** en **Instellingen** zijn bereikbaar.
5. Er ontstaan geen uncaught JavaScript-fouten.
6. De console bevat niet:
   - `Maximum call stack size exceeded`;
   - `Too much recursion`;
   - `ReferenceError`;
   - `TypeError`;
   - `Cannot access before initialization`.

**Stopcriterium:** wanneer de startup-smoketest faalt, geef direct **NO GO** en voer geen verdere functionele tests uit.

---

## 2. Gerichte recursieregressie

Activeer minimaal eenmaal iedere eerder risicovolle kernflow:

1. Open **Nieuwe sessie**.
2. Maak een sessie aan.
3. Open de sessie.
4. Klik op **Nieuwe hand**.
5. Doorloop de tafelstappen totdat de tafel zichtbaar is.
6. Voeg een villain toe.
7. Open een bestaande of concepthand opnieuw.
8. Open een controlescherm met straatsamenvatting.
9. Rond een hand af en open het report.

Controleer tijdens iedere stap dat geen stackoverflow of vastloper ontstaat.

---

## 3. Sessie- en tafelgroottes

Controleer bij cashgame en toernooi:

- 10-handed;
- 9-handed;
- 8-handed;
- 6-handed.

Verwacht:

- de sessiekeuze wordt als default overgenomen bij een nieuwe hand;
- de juiste fysieke seats en pokerposities worden opgebouwd;
- 10-handed past zonder afgekapt seatvak;
- de dealerweergave is verticaal leesbaar;
- `Mijn seat` staat niet meer als losse sessie-instelling wanneer Hero per hand wordt gekozen.

---

## 4. Conceptstatus

1. Start een nieuwe hand.
2. Vul minimaal configuratie, button, Hero-seat, holecards en startstack in.
3. Verlaat de registratie.
4. Open de sessie opnieuw.
5. Controleer dat de hand als **Concept** zichtbaar is.
6. Hervat de hand.

Verwacht:

- alle ingevoerde gegevens zijn behouden;
- de wizard opent op de laatst opgeslagen stap of de laatst geldige hervatstap;
- geen definitief report wordt aangemaakt voordat de hand is afgerond.

---

## 5. Big Blind Ante

Toernooi, bijvoorbeeld 500/1.000:

- schakel **Big Blind Ante actief** in;
- controleer dat Ante automatisch 1.000 wordt;
- wijzig BB naar 1.500;
- controleer dat Ante automatisch 1.500 wordt;
- schakel BBA uit en controleer dat handmatige ante-invoer weer mogelijk is.

---

## 6. Preflop en impliciete folds

Gebruik 9-handed:

- Hero BTN;
- eerste vrijwillige actor BTN;
- Hero raise naar 3 BB;
- SB fold;
- BB call.

Verwacht:

- UTG t/m CO worden als automatische folds vastgelegd;
- deze spelers komen niet alsnog als actor terug;
- de straat sluit na de call van BB;
- de pot is correct;
- de controlesamenvatting toont Hero als `Ik (BTN)`.

---

## 7. Postflopactoren

Ga met alleen BTN en BB actief naar flop, turn en river.

Verwacht per straat:

- alleen BB en BTN handelen;
- BB handelt als eerste en BTN als laatste;
- preflop gefolde spelers keren niet terug;
- all-in spelers krijgen geen nieuwe actie;
- de straat sluit wanneer alle vereiste acties zijn afgerond.

Test minimaal één check-checkstraat en één bet-callstraat.

---

## 8. Actiekaart en tafeloverlay

Controleer:

- `← Vorige actie` is uitgeschakeld voordat een vrijwillige actie bestaat;
- na één actie draait de knop precies die actie terug;
- betting state en actor worden correct hersteld;
- `👁 Toon tafel` opent een niet-interactieve overlay;
- Hero, villains, BTN, SB, BB, ante, folds en huidige actor zijn zichtbaar;
- sluiten brengt terug naar exact dezelfde actiekaart zonder invoerverlies.

---

## 9. Villainseat

- Voeg een villain toe.
- Kies een seat.
- Wijzig daarna de villain naar een andere vrije seat.

Verwacht:

- positie wordt opnieuw berekend;
- de oude seat komt vrij;
- Hero-seat en bezette villainseats zijn niet selecteerbaar;
- naam, stack en overige villaingegevens blijven behouden.

---

## 10. Straatcontrole en report

Controleer:

- straatnaam voluit in de interface;
- `PF` blijft toegestaan in het definitieve report;
- Hero wordt weergegeven als `Ik (positie)`;
- kaarten gebruiken tekstnotatie met gekleurde suits;
- `k`-notatie blijft bruikbaar bij chipbedragen;
- potbedrag verandert niet na een volledige checkronde;
- `Straat opnieuw invoeren` wist uitsluitend de betreffende straat en hervat bij de correcte eerste actor.

---

## 11. Potengine-regressie

Voer minimaal de eerder kritieke cashgamefixtures uit:

1. raise naar €6, 3-bet naar €20, fold → pot/inleg conform €13;
2. raise naar €6, call, 3-bet naar €20, folds → €19;
3. raise naar €6, 3-bet naar €20, 4-bet naar €50, fold → €41.

Voer equivalente toernooivarianten uit met en zonder BBA.

---

## Rapportage

Maak onderscheid tussen:

- statische analyse;
- browserruntime;
- geslaagde tests;
- afgekeurde tests;
- geblokkeerde/niet-uitgevoerde tests.

Classificeer bevindingen als Kritiek, Hoog, Middel of Laag en vermeld per bevinding:

- testcase;
- verwacht resultaat;
- werkelijk resultaat;
- reproduceerbaarheid;
- technisch of functioneel advies.

Sluit af met **GO**, **GO onder voorwaarden** of **NO GO**.
